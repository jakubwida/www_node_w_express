var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

app.use(express.static(__dirname + '/views'));
//ustawia powyzsze jako jakis glowny folder i dzieki temu htmle znaja swojego cssa
app.set('view engine', 'jade');

router.use(function (req,res,next) 
	{
	console.log("/" + req.method);
	next();
	});

router.get("/",function(req,res)
	{
	//res.sendFile(path + "index.html");
	res.render('index',{title:'index'});
	});


router.get("/game",function(req,res)
	{
	//res.sendFile(path + "index.html");
	res.render('game',{title:'game',is_logged:true});
	});

router.get("/login",function(req,res)
	{
	//res.sendFile(path + "index.html");
	res.render('login',{title:'login'});
	});

router.get("/register",function(req,res)
	{
	//res.sendFile(path + "index.html");
	res.render('register',{title:'register'});
	});

router.get("/results",function(req,res)
	{
	//res.sendFile(path + "index.html");
	res.render('results',{title:'results'});
	});




app.use("/",router);

app.use("*",function(req,res)
	{
	//res.sendFile(path + "404.html");
	res.render('404',{title:'404'});
	});

app.listen(3000,function()
	{
	console.log("Live at Port 3000");
	});
