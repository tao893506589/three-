const mongoose = require('mongoose');
// 创建连接   数据库的名字可以自己起
mongoose.connect('mongodb://localhost/tao');


//   定义一个约束  用来约束集合的
const Schema = mongoose.Schema;
// 配置集合里的字段
const mySchema = new Schema({
    username:String,
    age:Number 
});

//   创建集合    集合的名字使用复数的形式
const MyModel = mongoose.model('users', mySchema);


// 需要往集合插入数据
// MyModel.insertMany([{username:'张三',age:18},{username:'李四',age:20}],(err)=>{
//     if(!err){
//         console.log('插入成功了....')
//     } 
// })


// 更新数据
// MyModel.updateMany({username:'张三'},{$set:{username:'张三丰'}},err=>{
//     if(!err){
//         console.log('修改成功....')
//     }
// })


//  查询数据
// MyModel.find({username:'张三丰'},{username:1,_id:0},(err,data)=>{
//     if(!err){
//         console.log(data)
//     } 
// })




// 删除数据
// MyModel.deleteOne({username:'张三丰'},err=>{
//     if(!err){
//         console.log('删除成功....')
//     }
// })
// MyModel.deleteOne({username:'李四'},err=>{ 
//     if(!err){
//         console.log('删除成功....')
//     }
// })