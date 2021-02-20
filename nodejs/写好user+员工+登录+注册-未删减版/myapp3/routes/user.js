var express = require('express');
var router = express.Router();
////导入：模拟的宇宙唯一id
var uuid = require("node-uuid");

//导入：sql/user.js
//成功将代码导入到云数据库
const user = require('../sql/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  user.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)

     //页面渲染，找views/user.ejs
    res.render('user', {
      index:2,
      data:data
    });
  })
  
});


/*****添加********* */
 //点击添加商品，跳转的页面
 router.get("/add", function (req, res, next) {
  //找views/userAdd.ejs
  res.render("userAdd", {
    index: 2,
  });
});


router.post("/addAction", function (req, res, next) {

  console.log('进入/addAction里面了')
  let obj = req.body;
  //调用方法转数字
  // obj.price = Number(obj.price);
  //隐形转换
  // obj.discount = obj.discount - 0;
   //隐形转换
  // obj.score = obj.score * 1;
  console.log(obj);
  user.insertMany(obj,(err,data)=>{
       if(err) {
         console.log(err)
       } 
       console.log(data)
       res.redirect("/user");
  })
   
});


/***删除*** */
//点击删除操作，跳转的页面
router.get("/delete", function (req, res, next) {
  
  //get来的数据在req.query.id
  // const id = req.query.id;

  //在页面点击删除，在cmd查看
  console.log('我现在进入/delete里面了')
  // { _id: '5ff6ff4b9cc0fb1cf8e93651' }
  //query将get传参，转换成对象
  console.log(req.query)

  // production：将代码导入到云数据库了
  // 用id值，删除单条
  user.deleteOne({'_id':req.query._id},(err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
     //重新给了/pro路径，又去app.js文件找到pro.js,执行查找，页面渲染，找views/pro.ejs，渲染到页面
     res.redirect("/user");
  })
  

});




/*******修改*****/
//点击修改操作，跳转的页面
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id    拿到宇宙唯一id
  console.log(req.query)

  const _id = req.query._id;
  console.log("_id", _id);


  user.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    //render 渲染页面 views/userUpdate.ejs
    res.render('userUpdate',{
      index:2,
      data:data
    })
  })

 
});



// 修改操作 - 更新数据
router.post("/updateAction", function (req, res, next) {
  console.log('我在/updateAction里面')
  // 接收当前商品的数据
  const obj = req.body;

  // 处理数据类型，符合数据集合的字段类型
  // obj.price = Number(obj.price);
  // obj.stock = parseFloat(obj.stock);
  // obj.discount = obj.discount - 0;
  // obj.sales = obj.sales - 0;
  // obj.score = obj.score * 1;
  console.log('obj_id',obj)
  user.findByIdAndUpdate( obj._id,obj,(err,data)=>{
      if(err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/user");

  })

  
});



//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;
 
  let reg = new RegExp(obj.search);
  user.find({username:reg},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("user", {
       index: 2,
       data,
    });
  })

 
});

module.exports = router;
