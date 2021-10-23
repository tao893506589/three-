// 搭建一个服务器
const express = require('express')
const bodyp = require('body-parser')

const app = express()   //创建一个web服务器实例
const port = 8088      //指明端口号
app.listen(port)


// 处理静态资源
app.use(express.static('../www'))


// 使用body-parser中间件
// parse解析前端传递来的utf-8的表单数据 （application/x-www-form-urlencoded）
// app.use(bodyp.json()) // 解析前端传递来的json数据

app.use(bodyp.urlencoded({extended:true}))      //  用来处理post，put等请求的req.body的属性进行获取请求头的信息




// 处理get请求
app.get('/api/user',(req,res)=>{
    console.log(req.query);     // 可以获得get请求传递过来的参数    相当于url.parse(req.url,true).query
    res.send('你好...')
})


app.post('/api/user',(req,res)=>{
    console.log(req.body);      // express里面默认通过req.body属性是获取不到post传递来的数据
    res.send("post")
})
 