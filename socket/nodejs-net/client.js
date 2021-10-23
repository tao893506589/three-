//   引入原生模块   net
const net = require("net")
// 黑窗口的模块
const readline = require('readline')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })


// 创建客户端实例
const client = new net.Socket()

// 连接服务器
client.connect(9000,'localhost',()=>{       
    //  这里的回调函数可以给服务器端发送消息
    client.write("hello")
})



// 客户端接收服务端发送的消息
client.on("data",(message)=>{
    console.log(message.toString());   //  buffer转字符串的方法
    // 利用黑窗口的模块继续写内容给服务器端   say()方法
    say()

})




// 监听服务器关闭导致的报错
client.on("error",()=>{
    console.log("服务出错了....");
})


function say(){
    rl.question('请输入内容...', (answer) => {
        client.write(answer)
    })
}