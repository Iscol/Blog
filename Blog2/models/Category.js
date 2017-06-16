/**
 * Created by Administrator on 2017-06-06.
 */
var mongoose=require('mongoose');
var categoriesSchema=require('../schemas/categories');

module.exports= mongoose.model('Category',categoriesSchema);