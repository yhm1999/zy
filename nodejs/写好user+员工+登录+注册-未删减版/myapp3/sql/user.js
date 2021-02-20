/*****模块化开发文档***/


//导入：db.js
const db = require('./db.js') 

const adminSchema = new db.mongoose.Schema({
    // "_id":{}
    "username":{type:String},
    "password":{type:String}
    
})


module.exports = db.mongoose.model("users",adminSchema)