const db = require("./db");

const adminSchema = new db.mongoose.Schema({
    "username":{type:String},
    "age":{type:String},
    "sex":{type:String},
    "salary":{type:Number},
    "entryyear":{type:Number},
   
})

module.exports = db.mongoose.model("admin", adminSchema);
