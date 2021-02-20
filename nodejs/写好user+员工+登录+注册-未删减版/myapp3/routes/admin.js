var express = require('express');
var router = express.Router();
////导入：模拟的宇宙唯一id
var uuid = require("node-uuid");

//导入：sql/admin.js
//成功将代码导入到云数据库
const admin = require('../sql/admin')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('order', {
//     index:3
//   });
// });
router.get('/', function(req, res, next) {
  admin.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)

     //页面渲染，找views/admin.ejs
    res.render('admin', {
      index:3,
      data:data
    });
  })
  
});


/*****添加********* */
 //点击添加商品，跳转的页面
 router.get("/add", function (req, res, next) {
  //找views/adminAdd.ejs 渲染页面
  res.render("adminAdd", {
    index: 3,
  });
});

// <!--     "username":{type:String},
// "age":{type:String}, 
// "entryyear":{type:Number},
// "sex":{type:String},
// "salary":{type:Number},
// -->
console.log(111);
//在adminAdd.ejs填入数据后，给post传参过来
router.post("/addAction", function (req, res, next) {

  console.log('进入/addAction里面了')
  let obj = req.body;
   /*******不转换都是字符串****/
  //调用方法转数字
  obj.entryyear = Number(obj.entryyear);
  //隐形转换
  obj.salary = obj.salary - 0;
 
  console.log(obj);

  admin.insertMany(obj,(err,data)=>{
       if(err) {
         console.log(err)
       } 
       console.log(data)
       res.redirect("/admin");
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
  admin.deleteOne({'_id':req.query._id},(err,data)=>{
     if(err){
       console.log(err)
     }
     console.log(data)
     
    // 页面渲染，找views/admin.ejs，渲染到页面
     res.redirect("/admin");
  })
  

});


/*******修改*****/
//点击修改操作，跳转的页面
router.get("/update", function (req, res, next) {
  //get来的数据在req.query.id    拿到宇宙唯一id
  console.log(req.query)

  const _id = req.query._id;
  console.log("_id", _id);


  admin.findById({"_id":_id},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log('我现在到了/update修改数据路由')
    console.log(data)
    console.log(data._id)
    //render 渲染页面 views/adminUpdate.ejs
    res.render('adminUpdate',{
      index:3,
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
   /*******不转换都是字符串****/
  //调用方法转数字
  obj.entryyear = Number(obj.entryyear);
  //隐形转换
  obj.salary = obj.salary - 0;

  console.log('obj_id',obj)
  admin.findByIdAndUpdate( obj._id,obj,(err,data)=>{
      if(err) {
        console.log(err)
      }
      console.log(data)
      res.redirect("/admin");

  })

  
});

//商品搜索
router.get("/search", (req, res, next) => {
  console.log("商品搜索路由 搜索数据")
  const obj = req.query;
 
  let reg = new RegExp(obj.search);
  admin.find({username:reg},(err,data)=>{
    if(err){
      console.log(err)
    }
    console.log(data)
       res.render("admin", {
       index: 3,
       data,
    });
  })

 
});


//导出：
module.exports = router;
