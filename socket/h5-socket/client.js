//创建客户端实例并且知名端口号    这里的WebSocket是支持h5的浏览器就自带的构造方法
const ws = new WebSocket("ws://localhost:9000")   //   协议:端口

//客户端向服务端发送消息
ws.onopen = ()=>{
    ws.send("大家好！")
}

//客户端接受服务端发送消息
ws.onmessage = data =>{ //  将服务器广播回来的数据进行上树   添加到html页面的指定位置
    document.querySelector("#content").innerHTML += data.data+"<br/>"
}

//客户端可以监听服务端关闭，触发此方法
ws.onclose = ()=>{
    console.log("服务器关闭了...") 
}