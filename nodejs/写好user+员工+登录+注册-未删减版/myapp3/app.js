/*************导入模块：***/
// 错误处理的包  createError 
var createError = require('http-errors');
var express = require('express');
//path内置模块
var path = require('path');
//日志的一个引入包    
var logger = require('morgan');
// 导入cookie-parser包
var cookieParser = require('cookie-parser')
//导入：express-session
var session = require('express-session')




/**************导入路由表***/
var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var proRouter = require('./routes/pro');
var userRouter = require('./routes/user');
//员工
var adminRouter = require('./routes/admin');
//登录+注册
var loginRouter = require('./routes/login') 
var registerRouter = require("./routes/register");
// var cartRouter = require('./routes/cart');
// var bannerRouter = require('./routes/banner');


/**************创建服务器****/
var app = express();



// *****************view engine setup  模板引擎配置***********/

//1、模板引擎是要用ejs 
app.set('view engine', 'ejs');
//2、设置ejs文件的路径  
//参数： 就去找个文件夹找   完整的路径
app.set('views', path.join(__dirname, 'views'));



/*********中间件********** */
// dev的时候会处理logger日志   next() 会在底层内部执行  肉眼看不见
app.use(logger('dev')); 
// 使用express的json模块 ，可以接收和处理现在最常用方便的JSON数据 ，脚手架已经配好
app.use(express.json());
//xtended: false：表示使用系统模块querystring来处理，也是官方推荐的  
app.use(express.urlencoded({ extended: false }));


/*********配置静态资源：***/
//配置 ejs ，里面寻找的静态文件的一个路径  
app.use(express.static(path.join(__dirname, 'public')));
//D:\2012-三阶段js\day4\课上\下午\myapp3\public
//console.log(path.join(__dirname, 'public'))


/*******cookie看门狗****** */
//中间件
// 内部给了next（）了，在node_modules里面可以找到
// app.use(cookieParser())
// cookie路由守卫 
// all是特殊的中间件

//现实意思：用户在登陆页面，输入云数据库存在的名字和密码，说明之前注册过，现在登进去，给浏览器留个记录就是cookies值，之后进入别的子页面都是ok了
// app.all('*',(req,res,next)=>{
//   //运行一下：
//   console.log('进来all ，cookie是路由守卫');
//   //{ isLogin: '存好了' }
//   console.log(req.cookies,'请求的cookies值');
//   // 路径：如：/login
//   console.log(req.url,'请求的地址');


//   //3种情况：
//     // 1、第一次没有进行登录，就没有isLogin值，
//   // 2、进入的不是登录页面，或者不是/login/in页面
//   // 此外用户在地址栏进入其他页面，都不让他进，直接跳到/login登录页面
//   if(req.cookies.isLogin === '存好了' || req.url==='/login' || req.url==='/login/in'){
//   //  console.log('...');
//     next();
//   }
//   else{
//     console.log('没有进入登录页面，是其他页面');
//     res.redirect('/login')
//   }
// })



/*******session看门狗****** */
//中间件
// 内部给了next（）了，在node_modules里面可以找到
// app.use(cookieParser());

//secret：
app.use(
  session({
    // 加密的算法， 生成一堆乱七八糟的字符串 ，但可以反向解密
    secret: 'adfd',
    //强制保存 推荐false 
    resave: false,
    //初始化session存储 默认true 
    saveUninitialized: true,
    // 设置过期时间 1000=1s *60=1分钟*10=10分钟
    // cookie:{maxAge:1000*10*60}
    cookie:{maxAge:2000*10*600}

  })
)
//session 守卫
// 在浏览器进入任何子页面，在cmd都可以打印出
app.all('*',(req,res,next)=>{
  // console.log('进入session看门狗...');
  // console.log(req.session);

  if(req.session.isLogin === 'ok' || req.url ==='/login' || req.url ==='/login/in') {
    // console.log('req.session.isLogin === ok 或者 /login 或者 /login/in')
    next()
  }
  else{
    //输入其他页面时候
    // console.log('其他子页面..')
    //重新跳转到/login页面
    res.redirect('/login')

  }
})





 
/*******使用路由表****** */
//以下是路由表的use 
//必须先命中第一个路由表 ，才能进入后面的不同的路由表。注意！
//'/'=>找./routes/index.js
app.use('/', indexRouter);
//'/pro'=>找./routes/pro.js
app.use('/pro', proRouter);
//'/user'=>找./routes/user.js
app.use('/user', userRouter);
// 员工：
//  /admin =》找/routes/admin.js
app.use('/admin', adminRouter);
//注册+登录
app.use("/register", registerRouter);
 app.use('/login',loginRouter)
//  app.use('/cart', cartRouter);
//  app.use('/banner', bannerRouter);

/*********报错处理***** */
//以下两个是处理错误的 中间件！！！
//一个是 状态码错误处理 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


//一个是全局错误处理
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //页面渲染 
  //去找views/error.ejs文件
  res.render('error');
});


//导出：
module.exports = app;
