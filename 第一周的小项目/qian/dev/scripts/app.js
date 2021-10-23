/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scripts/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scripts/app.js":
/*!****************************!*\
  !*** ./src/scripts/app.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\r\nconst home = __webpack_require__(/*! ./views/home.html */ \"./src/scripts/views/home.html\")\r\nconst position = __webpack_require__(/*! ./views/position.html */ \"./src/scripts/views/position.html\")\r\nconst positionadd = __webpack_require__(/*! ./views/position.add.html */ \"./src/scripts/views/position.add.html\")\r\nconst positionupdata = __webpack_require__(/*! ./views/position.updata.html */ \"./src/scripts/views/position.updata.html\")\r\nconst userinfo = __webpack_require__(/*! ./views/userinfo.html */ \"./src/scripts/views/userinfo.html\")\r\n\r\n\r\n\r\n\r\n// 左侧导航的实现  切换效果 \r\n$(\".sidebar-menu li\").on(\"click\",function(){\r\n    $(this).addClass(\"active\").siblings().removeClass(\"active\")\r\n    let fromattr = $(this).attr('from')\r\n    switch(fromattr){\r\n        case \"home\":\r\n            $(\".content\").html(home);\r\n            break;\r\n        case 'position':\r\n            getposition()\r\n    } \r\n}) \r\n\r\n\r\n\r\n\r\n\r\n// 添加职位按钮     需要用到事件委托\r\n\r\n$('.content').on('click','#addbtn',function(){\r\n    $(\".content\").html(positionadd)\r\n})\r\n\r\n\r\n\r\n// 返回按钮    事件委托\r\n\r\n$('.content').on('click','#posback',function(){\r\n    getposition()\r\n})\r\n\r\n\r\n\r\n// 提交按钮     事件委托\r\n$('.content').on('click','#possubmit',function(){\r\n    //  在add页面和updata页面给提交按钮添加from属性便于区分 \r\n    let url = $(this).attr('from') === 'add' ? '/api/position/add' : '/api/position/updata '  ; //  在add页面和updata页面给提交按钮添加from属性便于区分\r\n    // 手机form表单的所有信息发送ajax给后端   $('form名字/id/class').serialize()\r\n    // let data = $('#possave').serialize();\r\n   \r\n   \r\n    /*\r\n     // ajax  请求    默认只支持utf-8的类型    通过引入插件需要换一种写法\r\n            $.ajax({\r\n                url,\r\n                method:'post',\r\n                data:data,\r\n                dataType:'json', //规定后端返回的数据类型就是json对象类型的\r\n                success:data =>{\r\n                    if(data.flag){\r\n                        getposition()\r\n                    }else{\r\n                        console.log(123); \r\n                    }\r\n                }\r\n            })\r\n    */ \r\n\r\n\r\n    // 利用query.form这个插件  可以上传文件的请求     用法为$(表单).ajax()\r\n    $('#possave').ajaxSubmit({\r\n        // 这里的url和method可以不写   默认走form表单的    如果写了 走ajax的\r\n        // 这里是没有给数据的   也就是说没有给后端传送数据    后端同时处理不了utf-8和文件两种类型的数据的\r\n        // 所以后端需要 用到一个multer模块   进行分类处理数据\r\n                url,\r\n                method:'post',\r\n                dataType:'json', //规定后端返回的数据类型就是json对象类型的\r\n                success:data =>{\r\n                    if(data.flag){\r\n                        getposition()\r\n                    }else{\r\n                        console.log(123); \r\n                    }\r\n                }\r\n            })\r\n}) \r\n\r\n\r\n\r\n// 查询职位\r\nfunction getposition(){\r\n    // $('.content').html(position)\r\n    // 查询操作\r\n    $.ajax({\r\n        url:'api/position/find',\r\n        dataType:'json',\r\n        success:data=>{    //  此时的data返回的是一个数组套对象\r\n            //   render 函数会返回一个拼接好的新的页面(给position页面传递一个arr数组)\r\n            // 第一个参数是要渲染哪个模板，  第二 个参数是要传递的数据\r\n            const html = template.render(position,{arr:data.data})\r\n            // console.log(html);\r\n            $('.content').html(html)\r\n        }\r\n    })\r\n}\r\n\r\n\r\n// 修改按钮的操作\r\n\r\n$('.content').on('click','.pos-edit',function(){\r\n    // 此时的按钮是数据库中的_id  可以通过这个id进行操作\r\n    let posid = $(this).attr('posid')\r\n\r\n\r\n    // 根据posid发送ajax进行信息的回填   \r\n    $.ajax({    \r\n        url:'/api/position/'+posid,      //  地址可以使用动态参数的写法 \r\n        dataType:'json',\r\n        success:data=>{\r\n            console.log(data);\r\n            // 将得到的模板进行上树 更新到positionupdata这个页面上\r\n            const html = template.render(positionupdata,{data:data.data})      //  此时返回的data数据是一个对象   不是数组了  \r\n            // 跳转页面  跳转到positionupdata页面\r\n            $('.content').html(html) \r\n        }\r\n    })  \r\n})\r\n\r\n\r\n\r\n\r\n//   删除的按钮\r\n$('.content').on('click','.pos-remove',function(){\r\n    // 获取当前数据库给模板的id\r\n    let posid = $(this).attr('posid')\r\n    // 根据id将数据删除并将数据库也删除\r\n    $.ajax({\r\n        url:'/api/position/'+posid,\r\n        data:posid,\r\n        type:'post',\r\n        dataType:'json',\r\n        success:data=>{\r\n            // console.log(data);\r\n            // 将得到的模板进行上树 更新到positionupdata这个页面上\r\n            const html = template.render(position,{arr:data.data})      //  此时返回的data数据是一个对象   不是数组了  \r\n            // 跳转页面  跳转到positionupdata页面\r\n            $('.content').html(html) \r\n        }\r\n    })\r\n\r\n})\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n// 用户注册\r\n//   使用userinfo模板  需要传递两个变量    进行控制内容的显示   isSignin表示状态        greeting  表示登录时的显示\r\nlet isSignin = false;\r\nlet greeting = '你好！'\r\n\r\nrendertmp(isSignin,greeting)\r\n\r\n    \r\nfunction rendertmp(isSignin,greeting){\r\n    // 进行渲染页面\r\n    const html = template.render(userinfo,{\r\n        isSignin,\r\n        greeting\r\n    })\r\n    $('.user-menu').html(html)\r\n}\r\n\r\n\r\n\r\n// 点击登录注册按钮的事件     使用事件委托\r\n$('.navbar-nav').on('click','.user-menu span',function(){\r\n    if($(this).attr('id') === 'btn-signup'){    //  注册的按钮\r\n        $('#user-submit').off().on('click',async function(){\r\n            let username = $('#username').val();\r\n            let password = $('#password').val();\r\n            // 发送给后端\r\n            let result = await sign('signup',{username,password});\r\n            console.log(result);\r\n            alert(result.data.message)\r\n        })\r\n    }else{\r\n        // 现在点击的是登录\r\n        $('#user-submit').off().on('click',async function(){\r\n            let username = $('#username').val();\r\n            let password = $('#password').val();\r\n            // 发送给后端\r\n            let result = await sign('signin',{username,password});\r\n            console.log(result);\r\n            // alert(result.data.message)\r\n            if(result.flag){\r\n                // 需要将后端生成好的token存入本地存储  localStorage中\r\n            localStorage.setItem('token',result.data.token)\r\n            rendertmp(true,'恭喜您'+username)\r\n            }\r\n        })\r\n    }\r\n})\r\n\r\n\r\n\r\n// 发送ajax的函数      被调用后  这是一个异步请求   得到结果需要用到await\r\nfunction sign(uri,data){\r\n    return $.ajax({\r\n        url:'api/user/'+uri,\r\n        data,\r\n        method:'post',\r\n        dataType:'json',\r\n        success:data=>{\r\n            return data\r\n        }\r\n    })\r\n    \r\n}\r\n\r\n\r\n\r\n// 刷新时需要将token放在请求头上发送给后端    发送一个ajax请求\r\n\r\nfunction yanzheng(){\r\n    $.ajax({\r\n        url:'api/user/issignin',\r\n        type:'post',\r\n        dataType:'json',\r\n        headers:{\r\n            token:localStorage.getItem('token')\r\n        },\r\n        success:data =>{\r\n            if(data.flag){\r\n                console.log(111);\r\n                rendertmp(true,'恭喜您'+data.data.username)\r\n            }\r\n        }\r\n    })\r\n}\r\nyanzheng()\r\n\r\n\r\n\r\n\r\n// 退出的按钮   事件委托\r\n$('.user-menu').on('click','#user-signout',function(){\r\n    localStorage.removeItem('token')\r\n    location.href = '/'\r\n})\r\n\r\n\n\n//# sourceURL=webpack:///./src/scripts/app.js?");

/***/ }),

/***/ "./src/scripts/views/home.html":
/*!*************************************!*\
  !*** ./src/scripts/views/home.html ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div>    <h1>home.html....</h1></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/home.html?");

/***/ }),

/***/ "./src/scripts/views/position.add.html":
/*!*********************************************!*\
  !*** ./src/scripts/views/position.add.html ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">  <div class=\\\"box-header with-border\\\">    <h3 class=\\\"box-title\\\">职位添加</h3>  </div>  <!-- /.box-header -->  <!-- form start -->  <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">    <div class=\\\"box-body\\\">      <div class=\\\"form-group\\\">        <label for=\\\"companyLogo\\\" class=\\\"col-sm-2 control-label\\\">公司Logo</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"file\\\" class=\\\"form-control\\\" name=\\\"companyLogo\\\" id=\\\"companyLogo\\\" placeholder=\\\"请选择公司logo图片\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"companyName\\\" class=\\\"col-sm-2 control-label\\\">公司名称</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"companyName\\\" id=\\\"companyName\\\" placeholder=\\\"请输入公司名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"city\\\" class=\\\"col-sm-2 control-label\\\">工作地点</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"city\\\" id=\\\"city\\\" placeholder=\\\"请输入工作地点\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"salary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"salary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"type\\\" class=\\\"col-sm-2 control-label\\\">工作性质</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"type\\\" id=\\\"type\\\" placeholder=\\\"请输入工作性质\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"experience\\\" class=\\\"col-sm-2 control-label\\\">工作经验</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"experience\\\" id=\\\"experience\\\" placeholder=\\\"请输入工作经验\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"degree\\\" class=\\\"col-sm-2 control-label\\\">学历要求</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"degree\\\" id=\\\"degree\\\" placeholder=\\\"请输入学历要求\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"description\\\" class=\\\"col-sm-2 control-label\\\">职位描述</label>        <div class=\\\"col-sm-10\\\">          <textarea rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"description\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入职位描述\\\"></textarea>        </div>      </div>    </div>    <!-- /.box-body -->    <div class=\\\"box-footer\\\">      <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>      <button from=\\\"add\\\" type=\\\"button\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>    </div>    <!-- /.box-footer -->  </form></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.add.html?");

/***/ }),

/***/ "./src/scripts/views/position.html":
/*!*****************************************!*\
  !*** ./src/scripts/views/position.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box\\\">    <div class=\\\"box-header with-border\\\">        <h3 class=\\\"box-title\\\">            <button id=\\\"addbtn\\\" class=\\\"btn btn-block btn-success\\\"><span class=\\\"fa fa-plus\\\"></span> 添加</button>        </h3>        <div class=\\\"box-tools\\\">            <div class=\\\"input-group input-group-sm\\\" style=\\\"width: 150px;\\\">                <input type=\\\"text\\\" value=\\\"\\\" name=\\\"pos_search\\\" class=\\\"form-control pull-right\\\" placeholder=\\\"搜索\\\">                <div class=\\\"input-group-btn\\\">                    <button type=\\\"button\\\" id=\\\"possearch\\\" class=\\\"btn btn-default\\\"><i class=\\\"fa fa-search\\\"></i></button>                </div>            </div>        </div>    </div>    <!-- /.box-header -->    <div class=\\\"box-body\\\">        <table class=\\\"table table-bordered\\\">            <tr>                <th style=\\\"width: 10px\\\">#</th>                <th>公司Logo</th>                <th>公司名称</th>                <th>职位名称</th>                <th>工作地点</th>                <th>发布时间</th>                <th>岗位薪资</th>                <th style=\\\"width: 140px\\\">操作</th>            </tr>            <!-- 遍历传递过来的arr数组     $value代表数组中的每一项,默认的$index是从0开始的   -->            {{each arr }}            <tr>                <td>{{$index+1}}</td>                <!-- 如果不上传公司logo的话就不需要进行渲染img    利用模板进行判断 -->                {{if $value.companyLogo}}                <td><img width=\\\"50\\\" height=\\\"50\\\"                        src=\\\"http://localhost:3000/upload/{{$value.companyLogo}}\\\" alt=\\\"\\\">                </td>                {{else}}                <td>暂无图片....</td>                {{/if}}                <td>{{$value.companyName}}</td>                <td>{{$value.positionName}}</td>                <td>{{$value.city}}</td>                <td>今天20:22</td>                <td>{{$value.salary}}</td>                <td>                    <button class=\\\"btn btn-sm btn-primary pos-edit\\\" posid=\\\"{{$value._id}}\\\"><span                            class=\\\"fa fa-edit\\\"></span> 修改</button>                    <button class=\\\"btn btn-sm btn-danger pos-remove\\\" posid=\\\"{{$value._id}}\\\"                        filename=\\\"{{$value.companyLogo}}\\\"><span class=\\\"fa fa-remove\\\"></span> 删除</button>                </td>            </tr>            {{/each}}                         <!-- <tr>          <td colspan=\\\"8\\\">暂无记录。</td>        </tr> -->        </table>    </div></div><!-- /.box -->\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.html?");

/***/ }),

/***/ "./src/scripts/views/position.updata.html":
/*!************************************************!*\
  !*** ./src/scripts/views/position.updata.html ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<div class=\\\"box box-info\\\">  <div class=\\\"box-header with-border\\\">    <h3 class=\\\"box-title\\\">职位修改</h3>  </div>  <!-- /.box-header -->  <!-- form start -->  <form class=\\\"form-horizontal\\\" id=\\\"possave\\\" action=\\\"/api/position\\\" method=\\\"post\\\" enctype=\\\"multipart/form-data\\\">    <div class=\\\"box-body\\\">      <div class=\\\"form-group\\\">        <label for=\\\"companyLogo\\\" class=\\\"col-sm-2 control-label\\\">公司Logo</label>        <div class=\\\"col-sm-10\\\">          <input type=\\\"file\\\" class=\\\"form-control\\\" name=\\\"companyLogo\\\" id=\\\"companyLogo\\\" placeholder=\\\"请选择公司logo图片\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"companyName\\\" class=\\\"col-sm-2 control-label\\\">公司名称</label>          <!-- 因为之前是数组的形式  要进行模板的each循环    这次是一个对象   所以不需要each   直接data. -->        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.companyName}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"companyName\\\" id=\\\"companyName\\\" placeholder=\\\"请输入公司名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"positionName\\\" class=\\\"col-sm-2 control-label\\\">职位名称</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.positionName}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"positionName\\\" id=\\\"positionName\\\" placeholder=\\\"请输入职位名称\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"city\\\" class=\\\"col-sm-2 control-label\\\">工作地点</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.city}}\\\"           type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"city\\\" id=\\\"city\\\" placeholder=\\\"请输入工作地点\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"salary\\\" class=\\\"col-sm-2 control-label\\\">岗位薪资</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.salary}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"salary\\\" id=\\\"salary\\\" placeholder=\\\"请输入岗位薪资\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"type\\\" class=\\\"col-sm-2 control-label\\\">工作性质</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.type}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"type\\\" id=\\\"type\\\" placeholder=\\\"请输入工作性质\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"experience\\\" class=\\\"col-sm-2 control-label\\\">工作经验</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.experience}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"experience\\\" id=\\\"experience\\\" placeholder=\\\"请输入工作经验\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"degree\\\" class=\\\"col-sm-2 control-label\\\">学历要求</label>        <div class=\\\"col-sm-10\\\">          <input value=\\\"{{data.degree}}\\\" type=\\\"text\\\" class=\\\"form-control\\\" name=\\\"degree\\\" id=\\\"degree\\\" placeholder=\\\"请输入学历要求\\\">        </div>      </div>      <div class=\\\"form-group\\\">        <label for=\\\"description\\\" class=\\\"col-sm-2 control-label\\\">职位描述</label>        <div class=\\\"col-sm-10\\\">          <textarea rows=\\\"8\\\" cols=\\\"80\\\" name=\\\"description\\\" class=\\\"form-control\\\" id=\\\"description\\\" placeholder=\\\"请输入职位描述\\\">{{data.description}}</textarea>        </div>      </div>    </div>    <!-- /.box-body -->    <div class=\\\"box-footer\\\">      <button type=\\\"button\\\" id=\\\"posback\\\" class=\\\"btn btn-default\\\">返回</button>      <button from=\\\"updata\\\" type=\\\"button\\\" id=\\\"possubmit\\\" class=\\\"btn btn-info pull-right\\\">提交</button>    </div>    <!-- /.box-footer -->    <!-- h5有一个hidden的隐藏域 -->    <input type=\\\"hidden\\\" name=\\\"id\\\" value=\\\"{{data._id}}\\\">      <!-- 创建一个改变职位时图片文件的隐藏域 -->    <input type=\\\"hidden\\\" name=\\\"prevLogo\\\" value=\\\"{{data.companyLogo}}\\\">  </form></div>\"\n\n//# sourceURL=webpack:///./src/scripts/views/position.updata.html?");

/***/ }),

/***/ "./src/scripts/views/userinfo.html":
/*!*****************************************!*\
  !*** ./src/scripts/views/userinfo.html ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"<!-- User Account Menu -->    <!-- Menu Toggle Button -->    <a href=\\\"#\\\" class=\\\"dropdown-toggle\\\" data-toggle=\\\"dropdown\\\">        <!-- The user image in the navbar-->        {{if isSignin}}        <img src=\\\"/static/images/user2-160x160.jpg\\\" class=\\\"user-image\\\" alt=\\\"User Image\\\">        <!-- hidden-xs hides the username on small devices so only the image appears. -->        <span class=\\\"hidden-xs\\\">{{greeting}}</span>        {{else}}        <div id=\\\"click-btn\\\">            <span id=\\\"btn-signin\\\">登录</span>            <span id=\\\"btn-signup\\\">注册</span>        </div>        {{/if}}    </a>    <ul class=\\\"dropdown-menu\\\">        <!-- The user image in the menu -->        {{if !isSignin}}        <li class=\\\"user-header\\\" id=\\\"user-header\\\">            <form role=\\\"form\\\">                <div class=\\\"box-body\\\">                    <div class=\\\"form-group user\\\">                        <label for=\\\"exampleInputEmail1\\\">用户名：</label>                        <input type=\\\"text\\\" class=\\\"form-control\\\" id=\\\"username\\\" placeholder=\\\"请输入用户名\\\">                    </div>                    <div class=\\\"form-group\\\">                        <label for=\\\"exampleInputPassword1\\\">密码：</label>                        <input type=\\\"password\\\" class=\\\"form-control\\\" id=\\\"password\\\" placeholder=\\\"请输入密码\\\">                    </div>                </div>            </form>        </li>        {{else}}        <li class=\\\"user-header\\\">            <img src=\\\"/static/images/user2-160x160.jpg\\\" class=\\\"img-circle\\\" alt=\\\"User Image\\\">        </li>        {{/if}}        <!-- Menu Footer-->        <li class=\\\"user-footer\\\">            <div class=\\\"pull-left\\\">                <a href=\\\"javascript:void(0)\\\" class=\\\"btn btn-default btn-flat\\\">关闭</a>            </div>            {{if !isSignin}}            <div class=\\\"pull-right\\\">                <a href=\\\"javascript:void(0)\\\" id=\\\"user-submit\\\" class=\\\"btn btn-default btn-flat\\\">提交</a>            </div>            {{else}}            <div class=\\\"pull-right\\\">                <a href=\\\"javascript:void(0)\\\" id=\\\"user-signout\\\" class=\\\"btn btn-default btn-flat\\\">退出</a>            </div>            {{/if}}        </li>    </ul>\"\n\n//# sourceURL=webpack:///./src/scripts/views/userinfo.html?");

/***/ })

/******/ });