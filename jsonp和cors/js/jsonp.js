// 搭建服务器
const http = require('http')
const url = require('url')

const server = http.createServer((req,res)=>{
    let path = url.parse(req,res).pathname    // 获取/api/data
    let urlobj = url.parse(req.url,true)
    switch(path){
        case '/api/data':
            res.write(`${urlobj.query.cb}('hello')`)  //  回调函数执行
            break;
        default:
            res.write('error....')
    }
    res.end()
})


// 服务器监听端口
server.listen(8080)