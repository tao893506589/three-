
// 引入原生模块  利用nodejs创建一个 socket 全双工  实时聊天
const net = require("net") 


// 创建服务器
const server = net.createServer()



// 创建一个对象  存放客户端的信息
let clientmap = {}      // {1:client,2:client}
let i = 0



// 创建连接   等待服务器连接我
server.on('connection',(client)=>{      //   这里的参数相当于客户端
   client.name = ++i
   clientmap[client.name] = client

    // 服务器端接收客户端发送的消息
    client.on("data",message=>{
        console.log("客户端"+client.name+"的消息:"+message);
        

        //  客户端发送过来的信息   服务器可以做一个广播的效果
        // 将client发送过来的message信息发送给所有的client
            // 定义了一个广播的方法
        broadcast(client,message)


    })

    //  解决客户端下线的操作   解决错误  
    client.on("error",()=>{
        console.log(client.name+"下线了");
    })


})


// 广播的方法   第一个参数代表是哪个客户端    第二个参数是发送的消息
function broadcast(client,message){
    // 循环clientmap对象     对象循环用  for in
    for(var key in clientmap){
        clientmap[key].write("\n"+client.name+"说"+message)
    }
}


// 监听端口
server.listen(9000)