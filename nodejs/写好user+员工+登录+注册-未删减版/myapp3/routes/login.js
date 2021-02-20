const express = require('express')

var router = express.Router()
// 要引入 user的数据库架构完成的状态
const loUser = require('../sql/user')



// 将login登录页面渲染上去
router.get('/',function(req,res,next){
    console.log('login  /')
    //去找views/login.ejs
    res.render('login')
})



// 点击登录页面的登录 ，跳到这里，来判断是非之前注册过
router.post('/in',function(req,res,next){
    console.log('我进入 login  in里面了')
     //用户注册输入的数据，是以post方式传递过来，用body转换
    let obj = req.body

    //在云数据库里面查找：用户名是否已经存在了，就是有一样的

    loUser.findOne(obj,(err,data)=>{
        console.log(data);

        if(err){
            console.log('err',err)
        }
         // 到了这一步，说明注册过，
        //  要在本地藏cookie
        if(data) {
            // 从服务器返回的，注入到本地    response 响应
            // cookie 在本地
            // res.cookie('isLogin ','ok')
            //session 在服务器 ，请求携带值isLogin = 'ok'去找  =》session加过密的  
            req.session.isLogin = 'ok'
            console.log('登录成功')
         /// 成功进到这个index.ejs 主页面
            res.redirect('/')
        }else {
            // 不存在，重新进入register.ejs 注册页面
            res.redirect('/register')
        }
    })

})









module.exports = router;