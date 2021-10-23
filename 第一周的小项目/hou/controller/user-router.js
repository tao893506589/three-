const usermodel = require('../model/usermodel')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')


//   用户注册的方法
const signup = async function(req,res){
    
    // 进行判断是否多次添加或者未添加
    let username = req.body.username
    //  这里返回的是一个promise的实例   不加await是得到的过程   不是结果   需要等待最后的结果，拿到最后的结果进行判断 
    // 没有该用户未true     已经存在是null
    let flag = await usermodel.findOne({username})   //  这里参数传递 了一个对象   实际上是username:username
    if(flag){    //  数据库已经存在该用户，不能再次注册
        res.render('api.fail.ejs',{
            data:JSON.stringify({message:'已经有该用户了'})
        })
    }else{    // 数据库还没有注册的用户
        let flag = await usermodel.save(req.body)
        if(flag){
            res.render('api.succ.ejs',{
                data:JSON.stringify({message:'注册成功....'})
            })
        }else{
            res.render('api.fail.ejs',{  
                data:JSON.stringify({message:'注册失败.....'})
            })
        }
    }
}



    // 登录的方法
    const signin = async function(req,res){
        let flag = await usermodel.findOne(req.body)  //  将前端提交的用户名密码传递
        if(flag){    //   代表登录成功
            // 登录成功后  后端需要生成taken，并且返回给前端
            let token = genToken({username:req.body.username})
             res.render('api.succ.ejs',{
                 data:JSON.stringify({message:'登录成功...',token})
             })
        }else{
            res.render('api.fail.ejs',{
                data:JSON.stringify({message:'用户名或者密码错误...'})
            })
        }
    } 






   /*
    采用非对称加密算法？
        后端生成token的时候采用私钥进行加密传给前端
        后续前端拿到加密的token传递给后端，后端通过公钥解密token，确定哪一个用户。

    https://blog.csdn.net/qq_41875147/article/details/100315715

    打开gitbush here运行
    生成私钥   openssl genrsa -out rsa_private_key.pem 2048
    生成公钥   openssl rsa -in rsa_private_key.pem -pubout -out rsa_public_key.pem
*/

    // 生成token令牌的方法
    function genToken(payload){
        // 形成通过命令行形成的密钥   进行地址和文件的读取
        const private = fs.readFileSync(path.resolve(__dirname,"../keys/rsa_private_key.pem"))
        // 生成token   第一个参数  为哪个东西进行加密    第二个参数为密钥     第三个参数是加密算法
        var token = jwt.sign(payload,private,{algorithm:'RS256',expiresIn:60*2})
        return token
    }




    // 验证登录态的token的方法
    const issignin = async function(req,res){
        // 后端获取前端发送过来的 token
        const token = req.headers.token
        const cert = fs.readFileSync(path.resolve(__dirname,'../keys/rsa_public_key.pem'))
        //  通过公钥进行解密     
        //   第一个参数为前端发送过来的加密的token   第二个参数时解密用的公钥

        jwt.verify(token, cert, function(err, decoded) {
            if(!err){    //  没有报错的情况下
                res.render('api.succ.ejs',{
                    data:JSON.stringify({username:decoded.username})   //   通过decoded就可以拿到解密后的内容了
                })
            }else{
                res.render('api.fail.ejs',{
                    data:JSON.stringify('验证失败...')
                })
            }
        });


    }
    



module.exports = {
    signup,
    signin,
    issignin
}