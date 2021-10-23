const mongoose = require('mongoose')            //  引入模块
mongoose.connect('mongodb://localhost/lagou')   //  连接数据库
module.exports = mongoose                       //  对外暴露