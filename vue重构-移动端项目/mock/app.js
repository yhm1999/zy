//导入json-server包
const jsonServer = require('json-server');
//导入mockjs包，模拟生成数据
const Mock = require('mockjs');
//导入 db.js文件（动态数据，需要识别的接口名)
const db = require('./sql/db.js');
//导入path 自带的模块
const path = require('path');

//没有这个拿不到非地址栏携带的参数的  post
//手动搭建的的express服务器，要获取非地址栏数据,需要安装 中间件body-parser
// const bodyPrase=require('body-prase')


//定义根路由的别名称
let mock = '/mock';

//创建jsonServer服务器
const server = jsonServer.create();


//中间件-- 配置

//配置静态资源：
server.use(jsonServer.defaults({
  static: path.join(__dirname, '/public'),//静态资源托管

}));
//抓取body数据：
server.use(jsonServer.bodyParser);
// app.use(bodyPrase({opts}))  //手动搭建的的express服务器，要获取非地址栏数据,需要安装 中间件body-parser



 // 登录过后产生token ，此时在访问别的详情页面 ，token放在req.headers请求头、req.query地址栏请求、req.body非地址栏请求，需要在响应数据的地方校验对比一下 ，是否是与登录时产生的token值一样 ，一样给访问不一样不给访问

//响应
// 没有响应地址  默认是'/' 是所有的
server.use((req, res, next) => {//可选 统一修改请求方式
  console.log(1)
  // req.method = 'GET';
  let token=req.headers.token || req.query.token || req.body.token ;
  console.log(token);
  if(req.url.includes('login') || req.url.includes('reg')) {
    next();
  }else{
  // 对比校验 很粗糙的对比一下个数 这个后端该干的
  if(token && token.length === 16) {
    next()
  }else{
    res.jsonp({
      err:2,
      msg:'token 不对or过期 你是间谍！！'

    })
  }
  }

 
});



/*****登录 注册校验****提交姿势不一样** */
//登录校验： 拿到信息
//提取mock的随机对象：
let mr = Mock.Random;
//用get请求  mock+'/login'=》相当于/mock/login
server.get(mock + '/login', (req, res) => {
  // console.log(req.query, req.body);//抓取提交过来的query和body
  //将请求的username和password 赋给变量username和password
  let username = req.query.username;
  let password = req.query.password;
  // 判断：三元运算符
  (username === 'yhm' && password === '0120') ?
    //   正确：
    res.jsonp({//好比 res.send({}) 渲染到页面上
      "err": 0,
      "msg": "登录成功",
      //以上包一层描述信息
      "data": {
        "follow": mr.integer(1, 5),
        "fans": mr.integer(1, 5),
        "nikename": mr.cname(),
        "icon": mr.image('20x20', mr.color(), mr.cword(1)),
        "time": mr.integer(13, 13)
      },
      // 模拟性的演示一下token凭证
      //"token": 4427298098850063 是数字 想要是字符串 拼接一下
      // "token":mr.integer(10)
      //  "token": "2998628609873331"
      "token":''+mr.integer(16)


    }) :
    // 失败
    res.jsonp({
      "err": 1,
      "msg": "登录失败",
    })

});



// 注册校验： 添加一条信息
//用post请求  mock+'/reg'=》相当于/mock/reg
server.post(mock + '/reg', (req, res) => {
  //将请求的username  赋给变量username
  let username = req.body.username;
  //判断：三元运算符
  (username !== 'aa') ?
    res.jsonp({
      "err": 0,
      "msg": "注册成功",
      "data": {
        "follow": mr.integer(0, 0),
        "fans": mr.integer(0, 0),
        "nikename": mr.cname(),
        "icon": mr.image('20x20', mr.color(), mr.cword(1)),
        "time": mr.integer(13, 13)
      }
    }) :
    res.jsonp({
      "err": 1,
      "msg": "注册失败",
    })

});



//******把外面的db.js或者db.json中的接口挂载进来* ***/
//响应外部的 json|js 数据接口
//db =》就是./sql/db.js
const router = jsonServer.router(db);//创建路由对象 db为mock接口路由配置  db==object

// 数据响应回来的时候 需要包装一下
router.render = (req, res) => {//自定义返回结构

  //判断数据是不是空数组和空对象：
  // Object.keys 原生js的方法
  let len = Object.keys(res.locals.data).length;
  // 为空数组or对象 则len=0
  // console.log(len);


  //模拟服务器延时：
  setTimeout(() => {
    res.jsonp({ //res.send()
      // len = 0 err:1 msg:失败
      err: len !== 0 ? 0 : 1,
      msg: len !== 0 ? '成功' : '失败',
      // 将实际返回来的数据 赋给data
      data: res.locals.data
    })
  }, 1000)

  // res.jsonp(res.locals.data)

};






//**路由自定义别名：****/
//把自定义路由 拿过来
server.use(jsonServer.rewriter({
  // mock='/mock' +"/*" 拼接 => /mock/所以路由
  //"/api/*": "/$1"相当于 下面写法 并且 对象的属性名是变量 要加[]
  [mock + "/*"]: "/$1", 
  "/course/check\\?id=:id": "/course/:id",
  "/course/add": "/course",
  "/course/del?id=:id": "/course/:id"

  // "/product\\?dataName=:dataName": "/:dataName",
  // "/banner\\?dataName=:dataName": "/:dataName",
  // "/detail\\?dataName=:dataName&id=:id": "/:dataName/:id",

  // "/product/del\\?dataName=:dataName&id=:id": "/:dataName/:id",
  // "/product/add\\?dataName=:dataName": "/:dataName",
  // "/product/check\\?dataName=:dataName&id=:id": "/:dataName/:id"
}));


// 使用一下router 【响应外部的 json|js 数据接口】
server.use(router);//路由响应



//开启jsonserver服务
// 端口号：3333
server.listen(3322, () => {
  console.log('mock跑起来了....')
});