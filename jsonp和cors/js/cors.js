//  搭建一个服务器
//   nodejs的内置模块
const http = require('http')
const url = require('url')
// 创建一个服务
const server = http.createServer((req,res)=>{
    let path = url.parse(req.url).pathname     //  获取传递过来的？前的地址
    switch(path){
        case '/api/data':
            res.writeHead(200,{
                'content-type':'application/json;charset=utf-8',          //  编码方式
                'Access-Control-Allow-Origin':['http://127.0.0.1:5500']  //'*'就代表所有的域名都可以访问此接口了， 也可以将允许访问的域名放在数组中
            })
            res.write(`{"res":true,"data":"hello haha"}`)
            break;
        default:
            res.write("error.....")
    }
    res.end()
})


// 服务监听接口
server.listen(8080)
