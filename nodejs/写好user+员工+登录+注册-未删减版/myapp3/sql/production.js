//test是一个测试文件 不要在项目中使用  

/*****模块化开发文档***/
  
//导入：db.js
const db = require('./db.js')
 
// 类似于lol 中的六神装 不能七神装的数据管理 fdsfsdfsdfsdf
const productionSchema = new db.mongoose.Schema ({
    "proName":{type:String},
    "column":{type:String},
    "brand":{type:String},
    "logo":{type:String},
    "price":{type:String},
    "proImg":{type:String},
    "introduce":{type:String},
    "stock":{type:Number},
    "discount":{type:Number},
    "score":{type:Number}
})

 
////在yhm-ejs 数据库 下，指定集合 User ，会自动变成users ,将初始化定义好的数据模型（文档），给装进users集合里面，最后 导出
module.exports = db.mongoose.model("ejs",productionSchema)
