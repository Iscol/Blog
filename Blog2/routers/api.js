/**
 * Created by Administrator on 2017-06-06.
 */
var express=require('express');
var router=express.Router();//路由模块 ,监听app.js里以/admin开头的url.
var Content=require('../models/Content');
//统一返回格式  路由可是有中间件,添加http动态路由就像个程序
//router.user 适配任何路由规则请传递给这个路由器,中间可以进行一些逻辑操作,如初始化.
var User=require('../models/User');
var responseData;
router.use(function(req,res,next){
    responseData={
        code:0,
        message:''
    }
    next();//驱动中间件调用链的函数,让后面的中间件继续处理请求,就必须调用next方法.
})

 //用户注册  ,1用户名不能为空,密码不能为空,密码输入一致,.用户是否被注册(数据库查询)
router.post('/user/register',function(req,res,next){
    console.log(req.body);
  var username=req.body.username;
  var password=req.body.password;
  var repassword=req.body.repassword;
    if(username==''){
        responseData.code=1;
        responseData.message='用户名输入为空';
        res.json(responseData);
        return;
    }
    if(password==''){
        responseData.code=2;
        responseData.message='密码输入为空';
        res.json(responseData);
        return;
    }
    if(password !=repassword){
        responseData.code=3;
        responseData.message='密码输入不一致';
        res.json(responseData);
        return;
    }
     //验证用户名是否被注册,如果已经存在相同的数据,表示该用户名已经被注册了.
    User.findOne({
        username:username
    }).then(function(userInfo){
        console.log(userInfo);
        if(userInfo){
            // 数据库中有该记录
            responseData.code=4;
            responseData.message='用户名已经被注册了';
            res.json(responseData);
            return;
        }
        //保存用户信息到数据库中
var user=new User({
    username:username,
    password:password
});
        return user.save();//操作对象进行操作数据库.
    }).then(function(newUserInfo){
         console.log(newUserInfo) ;
        responseData.message='注册成功';
        res.json(responseData);
    })
});
//登录
router.post('/user/login',function(req,res) {
    var username = req.body.username;
    var password = req.body.password;
    if (username == "" || password == "") {
        responseData.code = 1;
        responseData.message = '用户名和密码不能为空';
        res.json(responseData);
        return;
    }

   //查询数据库中相同的用户名和密码是否存在
    User.findOne({
        username:username,
        password:password
    }).then(function(userInfo){

        if(!userInfo){
            responseData.code=2;
            responseData.message='用户名或密码错误';
            res.json(responseData);
            return;
        }
            responseData.message=("登录成功");
             responseData.userInfo={
                 _id:userInfo._id,
                 username:userInfo.username
             }
            req.cookies.set('userInfo',JSON.stringify({
                _id:userInfo._id,
                username:userInfo.username
            }));
            res.json(responseData);
            return;

})
});
router.get('/user/logout',function(req,res){
    req.cookies.set('userInfo',null);
    res.json(responseData);

}) ;
//评论提交
router.post('/comment/post',function(req,res){
    //内容的ID
         var contentId=req.body.contentid||'';
         var postData={
          username:req.userInfo.username,
          postTime:new Date(),
          content:req.body.content
         } ;
     Content.findOne({
         _id:contentId
     }).then(function(content){
         content.comments.push(postData);
         return content.save();
     }).then(function(newContent){
         responseData.message='评论成功';
         responseData.data=newContent;
         res.json(responseData);

     })
});
//获取指定文章的所有评论
router.get('/comment',function(req,res){
    var contentId=req.query.contentid||'';
    Content.findOne({
        _id:contentId
    }).then(function(content){
        responseData.data=content.comments;
        res.json(responseData);
    })

});
module.exports =router; //将路由对象返回出去

