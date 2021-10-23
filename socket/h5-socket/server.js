// 下载ws模块   并且引入
const WebSocket = require("ws").Server;

// 创建一个服务器
const ws = new WebSocket({
    port:9000
})

let clientMap = {}
let i = 0

//监听客户端连接
ws.on("connection",client=>{
    client.name = ++i
    clientMap[client.name] = client
    //接受客户端发送来的消息，然后进行广播，服务端推送消息给所有的客户端对象
    client.on("message",data=>{
        broadCast(client,data)
    })  
    client.on("error",()=>{
        console.log(client.name+"下线了...")
    })
})

//可以让服务端做一个广播的效果，将具体client发送的message传送给所有的客户端对象
function broadCast(client,data){
    for(let key in clientMap){
        clientMap[key].send(client.name+"说的："+data)      //   h5这边用的是send    因为api的不同
    }
}