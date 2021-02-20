var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //render页面渲染，去找views/index.ejs文件 ，并且携带参数index:0
  //=》找views/index.ejs
  res.render('index', {
    index:0
  });
});

//导出
module.exports = router;
