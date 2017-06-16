/**
 * Created by Administrator on 2017-06-06.
 */
var mongoose=require('mongoose'); //定义数据库表的类型结构
//定义用户表结构
var Schema=mongoose.Schema;
module.exports=new mongoose.Schema({
    username:String,
    password:String,
    //是否是管理员
    isAdmin:{
        type:Boolean,
        default:false
    }
});