//    在原本的express的基础上使用路由    更加简洁直观



// 搭建一个服务器
const express = require('express')
const bodyp = require('body-parser')

const app = express()   //创建一个web服务器实例
const port = 8088      //知名端口号
app.listen(port)


app.use(bodyp.urlencoded({extended:true}))

// 创建路由
const userrouter = express.Router()
const adminrouter = express.Router()

// 安装路由
app.use('/api/user',userrouter)
app.use('/api/admin',adminrouter)

// 使用路由
userrouter.get('/login',(req,res)=>{
    res.send('/api/user/login')
})
userrouter.get('/res',(req,res)=>{
    res.send('/api/user/res')
})


adminrouter.post('/login',(req,res)=>{
    res.send('/api/admin/login')
})
