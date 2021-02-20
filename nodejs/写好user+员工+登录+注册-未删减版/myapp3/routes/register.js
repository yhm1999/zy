const express = require('express')

var router = express.Router()

// 要引入, user的数据库架构完成的状态
const reUser = require('../sql/user')



router.get('/',function(req,res,next){
    console.log('此时进入了注册的/里面了')

    //去找views/register.ejs  ,渲染到页面
    res.render("register")
})



router.post('/in',function(req,res,next){
    console.log('此时进入了注册的in里面了')
    //用户注册输入的数据，是以post方式传递过来，用body转换
    let obj = req.body
    console.log(obj)

    //在云数据库里面查找：用户名是否有重的
    reUser.findOne({username:obj.username},(err,data)=>{
        if(err){
            console.log('err')
        }
        // 有重的，
        if(data) {
            // 重新返回到这个register.ejs注册页面
            res.redirect('/register')
            
        }else {
            // 没有重的：
            // 将数据，增加到云数据库里面
            reUser.insertMany(obj,(err,data)=>{
                if(err){
                    console.log(err)
                }
                console.log(data)
                // 并且成功进入login.ejs登录页面
                res.redirect('/login')
            })
        }
    })

    
})




module.exports = router;