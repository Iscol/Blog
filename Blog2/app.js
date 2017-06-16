/**
 * Created by Administrator on 2017-06-06.
 */
var express= require('express'); //加载模块
var swig=require('swig');//加载模板处理模块
var mongoose=require('mongoose');//加载数据库模块
var bodyParser=require('body-parser');//加载,用于处理post提交过来的数据.
var app=express();//创建app应用 等同于node.js http.createServer();
var Cookies=require('cookies');//加载缓存模块
var User=require('./models/User');//
app.use('/public',express.static( __dirname+'/public'));   //设置静态文件托管
//如果用户调用的url文件是/public开头,则调用后面的方法去处理.返回其文件

app.engine('html',swig.renderFile);//定义当前应用所使用的模板引擎
//第一个参数:模板引擎的名称,同事也是模板文件的后缀
//第二个参数,用于解析处理模板内容的方法

app.set('views','./views');
//第一个参数必须是views .第二个参数是目录

app.set('view engine','html');
//第一个参数必须是 view engine,第二个参数和app,engine方法中定义的模板引擎名称(第一个参数)必须相同!

swig.setDefaults({cache:false});

//设置cookie
app.use(function(req,res,next){
      req.cookies=new Cookies(req,res);
    //解析用户登录cookies信息
      req.userInfo={};
      if(req.cookies.get('userInfo')){
          try{
             req.userInfo=JSON.parse(req.cookies.get('userInfo'));
             //获取当前用户登录的类型
              User.findById(req.userInfo._id).then(function(userInfo){
                  req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
                  next();
              })
          }catch (e){
              next();
          }

      }else{
          next();
      }

})

// /body-Parser设置
app.use(bodyParser.urlencoded({extended:true}));

app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));
 //根据不同的功能进s行划分模块

/*app.get('/',function(req,res,next){
   // res.send('<h1>欢迎光临我的博客</h1>')
    //读取views目录下的指定文件,并解析返回给客户端
    res.render('index');
    //第一个参数:表示模板的文件,相当于views目录下的文件index.html.(可以自定义新建这个页面)
    //第二个参数:传递给模板使用的数据.
})
*/
mongoose.Promise = global.Promise; //  mongoose 内部不维护和promise相关的代码，需要你在新建mongodb的连接池之后手动注入一个第三方的promise实现；
mongoose.connect('mongodb://192.168.10.101:27018/blog',function(err){
    if (err){
        console.log("fail");
    }else{
        console.log("pass");
        app.listen(8081);//监听http请求
    }
});

