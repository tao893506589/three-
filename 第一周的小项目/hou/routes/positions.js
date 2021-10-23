var express = require('express');
var router = express.Router();
var yewu = require("../controller/position-router")

var path = require('path')
var multer = require('multer')    //  这个只能处理 multipart/form-data类型的数据
//   指明上传文件的路径    上传到public下的upload文件夹下
const upload = multer({dest:path.resolve(__dirname,'../public/upload')})

/* POST api/position/add */
// 目的？ 获取前端传递来的表单数据，往数据库插入，返回状态给前端。
// mvc分层理念？ m:model数据模型层 v:view视图层  c:controller业务处理层   router路由
// 路由只负责分配路径   具体的操作可以放在业务处理的文件中    然后通过引入进行使用    这样可以更加清晰的处理数据
// 添加的路由
router.post('/add',upload.single('companyLogo'),yewu.add);      //  可以在路由写入上传文件的方式   upload.single(文件名)此时是在数据库中的一个字段

// 查找的路由
router.get('/find',yewu.find)
 
// 修改职位的路由
router.get('/:id',yewu.findbyid)

// 删除职位的路由
router.post('/:id',yewu.deleteid)

// 更新的post请求
router.post('/updata',upload.single('companyLogo'),yewu.updata)
// 例如
// 更新的路由
// router.post('/update',yewu.update)

// 删除的路由
// router.post('/remove',yewu.remove)
 
module.exports = router;
