//   引入创建的数据库连接文件
const mongoose = require('../until/db')


// 创建数据库的约束字段     在页面进行查看每一个input的name属性
const mySchema = new mongoose.Schema({
    companyName:{type:String,required:true},
    positionName:{type:String,required:true},
    city:{type:String,required:true},
    salary:{type:String,required:true}, 
    type:{type:String,required:true},
    experience:{type:String,required:true},
    degree:{type:String,required:true},
    description:{type:String,required:true},
    companyLogo:{type:String}
})


// 创建集合
const position = mongoose.model('positions',mySchema)    //  两个参数   第一个是 字段的名字   第二个是约束



// 添加职位  封装为一个函数           参数用来接收前端发送过来的表单数据
const save = (data)=>{
    return position.insertMany([data])       // 此时的返回对象是一个promise   可以使用then      异步，所以拿不到状态
                    .then(res=>{
                        return true
                    })
                    .catch(err=>{
                       return false
                    })
}

// 查找职位  更新的方法

const find = ()=>{
    return position.find()                  //  mondoose自带的  可以查看文档
}



// 修改的方法
//  通过传递过来的id在mongoo数据库查找符合的id信息
const findbyid = (id)=>{
    return  position.findById(id)
}



// 删除的方法
const deleteid = id=>{
    return position.deleteOne({_id:id})
}


// 更新的操作
// 通过id查找数据
// 对外暴露
// 第一个参数为数据库中的id   第二个参数是修改的内容
const updata = (id,data)=>{
    return position.findByIdAndUpdate(id,data)
                    .then(res=>true)
                    .catch(err=>false)
}




module.exports = {
    save,
    find,
    findbyid,
    updata,
    deleteid
}
