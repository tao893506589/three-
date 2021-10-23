/*

// 添加的操作
const add = function(req, res, next) {
    res.send('/api/position/add接口....');
  }

// 更新的操作
const update = function(req,res,next){
    res.send('/api/position/update');
    console.log(111);
}


// 删除的操作
const remove = function(req,res,next){
    res.send('/api/position/remove');
    console.log(222);
}



  module.exports = {
      add,
      update,
      remove
  }

*/   



// 引入positionmodel模板模块
const positionmodel = require('../model/positionmodel')
const fs = require('fs')



/*
    promise三种状态？ resolve reject  pending
    获取到了一个处于pending状态的promise实例
    如何获取一个promise对象的resolve或者reject结果呢？
        使用es6中的async   await      相当于把异步代码变成同步代码
*/






//  添加的操作
const add = async function(req,res,next){
    // console.log(req.body,req.file);     //  文件的查看方式为req.file

    
    uploadLogo(req)


    // 解决跨域的问题
    // res.header('Access-Control-Allow-Origin','http://localhost:8080')
    let flag = await positionmodel.save(req.body)        // 获取post请求
    console.log(flag);
    if(flag){
        res.render('api.succ.ejs',{   // 利用.ejs，模板的使用统一接口规范
            data:JSON.stringify({message:'success'})
        })
    }else{
        res.render('api.fail.ejs',{
            data:JSON.stringify({message:'fail'})
        })
    }
}



// 查找更新的操作
const find = async function(req,res){
    const data = await positionmodel.find()   
    res.render('api.succ.ejs',{
        data:JSON.stringify(data)
    })
}   
 


// 通过id进行修改的操作
const findbyid = async function(req,res){
    // 获取动态id的id号   req.params.id
    // 将获取到的id通过monngoose的findByid方法查找这个id的信息传给前端
    const data = await positionmodel.findbyid(req.params.id)        // 此时这里是一个promise的实例   要通过await得到它的最后结果     不加await得到的是promise的过程
    // 此时的data可以通过传递参数获得模板中的方法的数据
    res.render('api.succ.ejs',{
        data:JSON.stringify(data)
    })
}

// 根据id进行删除的操作
const deleteid = async function(req,res){
    // 获取动态id    req.body.id
    const data = await positionmodel.deleteid(req.params.id)
    const date = await positionmodel.find();
    console.log(date);
    res.render('api.succ.ejs',{
        data:JSON.stringify(date)
    })
}




// 更新的updata   进行修改操作
//数据库要知道修改id为哪个的信息    还要知道修改的内容req.body    传递过来的是修改后的内容  但是缺少id  需要前端传递
const updata = async function(req,res){     

    uploadLogo(req)
   
    let flag = await positionmodel.updata(req.body.id,req.body)     //  这里的两个参数  一个是在h5隐藏提交的id   一个是修改的内容
    if(flag){
        res.render('api.succ.ejs',{   // 利用已.ejs为后缀的模板，使用统一接口规范
            data:JSON.stringify({message:'success'})
        })
    }else{
        res.render('api.fail.ejs',{
            data:JSON.stringify({message:'fail'})
        })
    }
}





// 创建一个方法  封装logo图片的方法
const uploadLogo = req=>{
    if(req.file){   //  如果改变了logo的文件    在执行
        // 给上传文件的图片添加后缀名
        let dot = req.file.originalname.lastIndexOf('.');   // 找到原文件名的.的位置
        let fileSuffix = req.file.originalname.substr(dot)      //  拿到.后面的内容
        let prevFilePath = req.file.path        //  获得之前的文件的位置
        let nextFilePath = req.file.path + fileSuffix      //  这是得到拼接好的有后缀名的字符串地址
        fs.renameSync(prevFilePath,nextFilePath)        //  利用fs模块    同步改名

        // 在req.body  添加companyLogo字段
        req.body.companyLogo = req.file.filename + fileSuffix
    }else{
        // 如果在修改职位时没有修改logo   那么就用之前前端传递过来的logo
        req.body.companyLogo = req.body.prevLogo 
    }
}





// 对外暴露
module.exports = {
    add,
    find,
    findbyid,
    updata,
    deleteid
}
 