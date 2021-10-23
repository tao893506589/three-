/*
    nodejs模块的分类
        内置模块        fs  url  http querystring path....
        第三方模块       npm i jqery/.....
        自定义模块      需要引入和暴漏的   require/ module.exports
*/ 


// 先引入模块   在使用暴露的内容
// const shou= require('./demo')   //  引入时需要加路径  至少 有./
// console.log(shou.a);
// console.log(shou.show());





/*
    第三方模块：
        npm init -y 创建一个package.json文件，记录包相关信息
        npm i jquery -S (--save)  安装到运行时依赖 （线上环境用到）
        npm i sass-loader -D (--save-dev) 安装到开发依赖（线上环境不需要用到）

        npm view jquery versions 查看jquery的所有版本号
        npm i jquery@2.1.1    安装jquery的指定版本号
        npm outdated          版本对比
        npm update          一步升级到wanted版本
*/


// cross-env    跨平台和使用环境变量的脚本      得到一些配置信息    
// window使用需要安装       npm install --save-dev cross-env


// console.log(process.env.NODE_ENV)

// console.log(process.env.npm_package_version)