
/*****代码导入云数据库**** */

// 引入mongoose 模块
const mongoose = require('mongoose')
// 连接mongodb并选择指定数据库 dbName
//useNewUrlParser由于围绕连接URI 安全问题 mongodb 做了一些更改
//当前服务器监视引擎已经启用 请把选项useUnifiedTopology: true  传递给mongoClient
mongoose.connect('mongodb+srv://yhm1999:yhm19990120@cluster0.xjwlk.mongodb.net/yhm-ejs?retryWrites=true&w=majority',{ useNewUrlParser: true , useUnifiedTopology: true })
// 连接成功
mongoose.connection.on('connected',()=>{
     
    console.log('connected yhm-ejs 云数据库已经架构完成')
})
// 连接断开
mongoose.connection.on('disconnected',()=>{
    console.log('disconnected')
})
// 连接错误
mongoose.connection.on('error',()=>{
    console.log('error')
})

// 连接成功之后 将模块暴露出来
module.exports.mongoose =mongoose