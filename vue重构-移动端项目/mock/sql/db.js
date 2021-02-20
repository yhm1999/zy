// 用mockjs模拟生成数据
var Mock = require('mockjs');


//Mock.Random 是一个工具类，用于生成各种随机数据:
var rm = Mock.Random;


// 封装函数1:home\follow\column 结构都是类似的可以放一起
// 主要是解决：图片是 随机一次 复制n次 的问题
let mapData = function (n) {
  let data = [];
  for (var i = 0; i <= n; i++) {
    data.push({
      'id': 1000 + i,
      "_id": 1000 + new Array(20).fill('0').join(''),
      title: '@ctitle(9,13)',
      des: "@csentence(15,18)",
      time: '@integer(1511210911613,1611210911613) ',
      //  详情：
      detail: {
        // 头像：  cword文字
        auth_icon: rm.image('50x50', rm.color(), rm.cword(1)),
        auth: "@cname",
        content: function () {
          let result = '';
          //(Math.random()+1)*10 随机数 放大10倍
          for (var i = 0; i < (Math.random() + 1) * 10; i++) {
            result += '<p>' + Mock.Random.cparagraph(3, 5) + '</p>'
          }
          return result;
        }

      }

    })
  }

  return data;

}
//封装函数2:
let bannerData = function (n) {
  let data = [];
  for (var i = 0; i <= n; i++) {
    data.push({
      'id|+1': 1000,
      // 一定要写个_id ，万一后台用的是monogdb呢
      "_id|+1": 1000 + '',
      title: '@ctitle(5,10)',
      description: '@csentence(15,18)',
      time: '@integer(1511210911613,1611210911613) ',
      banner: rm.image('1680x745', rm.color(), rm.cword(4, 9)),
      //  详情：
      detail: {
        // 头像：  cword文字
        auth_icon: rm.image('50x50', rm.color(), rm.cword(1)),
        auth: "@cname",
        content: function () {
          let result = '';
          //(Math.random()+1)*10 随机数 放大10倍
          for (var i = 0; i < (Math.random() + 1) * 10; i++) {
            result += '<p>' + Mock.Random.cparagraph(3, 5) + '</p>'
          }
          return result;
        }

      }

    })
  }

  return data;

}


/***编程型(app.js) 需要的是一个对象* */
module.exports = Mock.mock({
  // 调用函数 传次数 就可以了
  'banner': bannerData(10),
  'home': mapData(50),
  'follow': mapData(60),
  'column': mapData(30),
  "user":{
    "_id":1000 + new Array(20).fill('0').join(''),
    auth_icon:rm.image('50x50',rm.color(),rm.cword(1)),
    nikename:'@cname',
    fans:'@integer(100,10000)',
    follow:'@integer(100,10000)'
  }
})
