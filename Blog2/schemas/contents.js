/**
 * Created by Administrator on 2017-06-13.
 */
/**
 * Created by Administrator on 2017-06-06.
 */
var mongoose=require('mongoose'); //定义数据库表的类型结构
//定义内容表结构
var Schema=mongoose.Schema;
module.exports=new mongoose.Schema({
   //关联字段
   category:{
      type:mongoose.Schema.Types.ObjectId, //类型
       ref:'Category'                                           //引用
   },
   title:String,
    description:{
       type:String,
       default:''
   },
    user:{
        type:mongoose.Schema.Types.ObjectId, //类型
        ref:'User'                                           //引用
    },
    addTime:{
          type:Date,
           default:new Date()
    },
    views:{
        type:Number,
        default:0
    },
    content:{
        type:String,
        default:''
    },
    comments:{
        type:Array,
        default:[]
    }

});/**
 * Created by Administrator on 2017-06-14.
 */
