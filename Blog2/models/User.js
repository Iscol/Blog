/**
 * Created by Administrator on 2017-06-06.
 */
var mongoose=require('mongoose');
var usersSchema=require('../schemas/users');

module.exports= mongoose.model('User',usersSchema);