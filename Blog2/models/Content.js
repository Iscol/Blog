/**
 * Created by Administrator on 2017-06-14.
 */

var mongoose=require('mongoose');
var contentsSchema=require('../schemas/contents');

module.exports= mongoose.model('Content',contentsSchema);