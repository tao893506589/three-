//   引入创建的数据库连接文件
const mongoose = require('../until/db')


// 创建数据库的约束字段     在页面进行查看每一个input的name属性
const mySchema = new mongoose.Schema({
   username:{type:String,required:true},
   password:{type:String,required:true},
    
})


// 创建集合
const user = mongoose.model('users',mySchema)    //  两个参数   第一个是 字段的名字   第二个是约束



const save = (data)=>{
    return user.insertMany([data])       
                    .then(res=>{
                        return true
                    })
                    .catch(err=>{
                       return false
                    })
}



const findOne = data =>{
    return user.findOne(data)
}





module.exports = {
    save,
    findOne
}
