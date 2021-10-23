
const home = require('./views/home.html')
const position = require("./views/position.html")
const positionadd = require("./views/position.add.html")
const positionupdata = require('./views/position.updata.html')
const userinfo = require('./views/userinfo.html')




// 左侧导航的实现  切换效果 
$(".sidebar-menu li").on("click",function(){
    $(this).addClass("active").siblings().removeClass("active")
    let fromattr = $(this).attr('from')
    switch(fromattr){
        case "home":
            $(".content").html(home);
            break;
        case 'position':
            getposition()
    } 
}) 





// 添加职位按钮     需要用到事件委托

$('.content').on('click','#addbtn',function(){
    $(".content").html(positionadd)
})



// 返回按钮    事件委托

$('.content').on('click','#posback',function(){
    getposition()
})



// 提交按钮     事件委托
$('.content').on('click','#possubmit',function(){
    //  在add页面和updata页面给提交按钮添加from属性便于区分 
    let url = $(this).attr('from') === 'add' ? '/api/position/add' : '/api/position/updata '  ; //  在add页面和updata页面给提交按钮添加from属性便于区分
    // 手机form表单的所有信息发送ajax给后端   $('form名字/id/class').serialize()
    // let data = $('#possave').serialize();
   
   
    /*
     // ajax  请求    默认只支持utf-8的类型    通过引入插件需要换一种写法
            $.ajax({
                url,
                method:'post',
                data:data,
                dataType:'json', //规定后端返回的数据类型就是json对象类型的
                success:data =>{
                    if(data.flag){
                        getposition()
                    }else{
                        console.log(123); 
                    }
                }
            })
    */ 


    // 利用query.form这个插件  可以上传文件的请求     用法为$(表单).ajax()
    $('#possave').ajaxSubmit({
        // 这里的url和method可以不写   默认走form表单的    如果写了 走ajax的
        // 这里是没有给数据的   也就是说没有给后端传送数据    后端同时处理不了utf-8和文件两种类型的数据的
        // 所以后端需要 用到一个multer模块   进行分类处理数据
                url,
                method:'post',
                dataType:'json', //规定后端返回的数据类型就是json对象类型的
                success:data =>{
                    if(data.flag){
                        getposition()
                    }else{
                        console.log(123); 
                    }
                }
            })
}) 



// 查询职位
function getposition(){
    // $('.content').html(position)
    // 查询操作
    $.ajax({
        url:'api/position/find',
        dataType:'json',
        success:data=>{    //  此时的data返回的是一个数组套对象
            //   render 函数会返回一个拼接好的新的页面(给position页面传递一个arr数组)
            // 第一个参数是要渲染哪个模板，  第二 个参数是要传递的数据
            const html = template.render(position,{arr:data.data})
            // console.log(html);
            $('.content').html(html)
        }
    })
}


// 修改按钮的操作

$('.content').on('click','.pos-edit',function(){
    // 此时的按钮是数据库中的_id  可以通过这个id进行操作
    let posid = $(this).attr('posid')


    // 根据posid发送ajax进行信息的回填   
    $.ajax({    
        url:'/api/position/'+posid,      //  地址可以使用动态参数的写法 
        dataType:'json',
        success:data=>{
            console.log(data);
            // 将得到的模板进行上树 更新到positionupdata这个页面上
            const html = template.render(positionupdata,{data:data.data})      //  此时返回的data数据是一个对象   不是数组了  
            // 跳转页面  跳转到positionupdata页面
            $('.content').html(html) 
        }
    })  
})




//   删除的按钮
$('.content').on('click','.pos-remove',function(){
    // 获取当前数据库给模板的id
    let posid = $(this).attr('posid')
    // 根据id将数据删除并将数据库也删除
    $.ajax({
        url:'/api/position/'+posid,
        data:posid,
        type:'post',
        dataType:'json',
        success:data=>{
            // console.log(data);
            // 将得到的模板进行上树 更新到positionupdata这个页面上
            const html = template.render(position,{arr:data.data})      //  此时返回的data数据是一个对象   不是数组了  
            // 跳转页面  跳转到positionupdata页面
            $('.content').html(html) 
        }
    })

})







// 用户注册
//   使用userinfo模板  需要传递两个变量    进行控制内容的显示   isSignin表示状态        greeting  表示登录时的显示
let isSignin = false;
let greeting = '你好！'

rendertmp(isSignin,greeting)

    
function rendertmp(isSignin,greeting){
    // 进行渲染页面
    const html = template.render(userinfo,{
        isSignin,
        greeting
    })
    $('.user-menu').html(html)
}



// 点击登录注册按钮的事件     使用事件委托
$('.navbar-nav').on('click','.user-menu span',function(){
    if($(this).attr('id') === 'btn-signup'){    //  注册的按钮
        $('#user-submit').off().on('click',async function(){
            let username = $('#username').val();
            let password = $('#password').val();
            // 发送给后端
            let result = await sign('signup',{username,password});
            console.log(result);
            alert(result.data.message)
        })
    }else{
        // 现在点击的是登录
        $('#user-submit').off().on('click',async function(){
            let username = $('#username').val();
            let password = $('#password').val();
            // 发送给后端
            let result = await sign('signin',{username,password});
            console.log(result);
            // alert(result.data.message)
            if(result.flag){
                // 需要将后端生成好的token存入本地存储  localStorage中
            localStorage.setItem('token',result.data.token)
            rendertmp(true,'恭喜您'+username)
            }
        })
    }
})



// 发送ajax的函数      被调用后  这是一个异步请求   得到结果需要用到await
function sign(uri,data){
    return $.ajax({
        url:'api/user/'+uri,
        data,
        method:'post',
        dataType:'json',
        success:data=>{
            return data
        }
    })
    
}



// 刷新时需要将token放在请求头上发送给后端    发送一个ajax请求

function yanzheng(){
    $.ajax({
        url:'api/user/issignin',
        type:'post',
        dataType:'json',
        headers:{
            token:localStorage.getItem('token')
        },
        success:data =>{
            if(data.flag){
                console.log(111);
                rendertmp(true,'恭喜您'+data.data.username)
            }
        }
    })
}
yanzheng()




// 退出的按钮   事件委托
$('.user-menu').on('click','#user-signout',function(){
    localStorage.removeItem('token')
    location.href = '/'
})

