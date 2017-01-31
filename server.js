var express = require("express");
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

 
var mysql      = require('mysql');

//###baza danych:
//blok do odpalenia z serwera
/*
var connection = mysql.createConnection({
	host     : '172.30.24.12',
	user     : 'wida_1113470',
	password : '51928325',
	database : 'WIDA',
	//port: 3306
});
*/
//koniec bloku


//blok do odpalenia z zdalnej maszyny po uprzednim:
//> screen
//> ssh -L 3306:127.0.0.1:3306 wida_1113470@149.156.43.65
 
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'wida_1113470',
	password : '51928325',
	database : 'WIDA',
	port: 3306
});
//koniec bloku
connection.connect();



//###login/logout
app.use(cookieParser())
app.use(session({secret: "secret",cookie:{}}));




app.use(express.static(__dirname + '/views'));
//ustawia powyzsze jako jakis glowny folder i dzieki temu htmle znaja swojego cssa
app.set('view engine', 'jade');




//###przesylanie danych do bazy
//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
 /*
app.post('/send_data', function(req, res) 
	{
    console.log(req.body);
	res.end(JSON.stringify({response_text:"recieved"}));
	});
*/
app.post('/send_db_result', function(req, res) 
	{
    //console.log(req.body);
	res.end(JSON.stringify({response_text:"db_recieved"}));
	var user = 'anon'
	if(req.session.username)
		user = req.session.username
	var inserted =
		{
		username:user,
		time_result:req.body.time,
		preset:req.body.preset,
		date_result: new Date()
		};
	connection.query('INSERT INTO results SET ?',inserted, function(err, rows, fields) 
		{
		if (!err)
			console.log('The solution is: ', rows);
		else
			console.log('Error while performing Query.');
		});
	});


function database_login_check(req,res,username,password)
	{
	var output =false;
	connection.query('SELECT * from users where username ="'+username+'" AND password ="'+password+'"', function(err, rows, fields) {
	  if (!err)
		{
		//console.log('login rows from database: ', rows);
		list_of_results=JSON.parse(JSON.stringify(rows));
		//console.log('login rows from database jsoned???: ', list_of_results);
		output=(list_of_results.length==1);
		//console.log("login check ",output);	
			if(output)
				{
				req.session.username=username;
				req.session.is_logged=true;
				req.session.save()
				res.end(JSON.stringify({value:"success"}));
				}
			else
				{
				delete req.session.username;
				delete req.session.is_logged;	
				req.session.save()
				res.end(JSON.stringify({value:"failure"}));
				}
		}
	  else
		{
		console.log('Error while performing login query.');
		}
	});	

			
	};


//###login cd
app.post('/login_url', function(req, res) 
	{
    //console.log(req.body);

	if(req.body.logged_in)
		{
		database_login_check(req,res,req.body.data.username,req.body.data.password)
		}
	else
		{
		delete req.session.username;
		delete req.session.is_logged;
		//console.log("username deleted")
		res.end(JSON.stringify({value:"logged_out"}));
		}
	
	//console.log(req.session);
	req.session.save()
	});

///###register
app.post('/register_url', function(req, res) 
	{
    //console.log(req.body);
	connection.query('SELECT * from users where username ="'+req.body.username+'"', function(err, rows, fields) {
	  if (!err)
		{
		list_of_results=JSON.parse(JSON.stringify(rows));
		//console.log('register rows from database jsoned???: ', list_of_results);
		output=(list_of_results.length==0);
			if(output)
				{
				res.end(JSON.stringify({value:"success"}));
				connection.query('insert into users values("'+req.body.username+'","'+req.body.password+'")', function(err, rows, fields){});
				}
			else
				{
				res.end(JSON.stringify({value:"failure"}));
				}
		}
	  else
		{
		console.log('Error while performing login query.');
		}
	});	

	});





router.use(function (req,res,next) 
	{
	console.log("/" + req.method);
	next();
	});

router.get("/",function(req,res)
	{
	//res.sendFile(path + "index.html");
		//console.log("is_logged>>>",req.session.is_logged);
		res.render('index',{title:'index',is_logged:req.session.is_logged, "username":req.session.username});	
	});


router.get("/game",function(req,res)
	{
	//res.sendFile(path + "index.html");
	res.render('game',{title:'game',is_logged:req.session.is_logged, "username":req.session.username});
	});

router.get("/login",function(req,res)
	{
	//res.sendFile(path + "index.html");
	res.render('login',{title:'login', is_logged:req.session.is_logged, "username":req.session.username});
	//console.log(req.session);
	});

router.get("/register",function(req,res)
	{
	//res.sendFile(path + "index.html");
	res.render('register',{title:'register',is_logged:req.session.is_logged, "username":req.session.username});
	});

router.get("/results",function(req,res)
	{
	//res.sendFile(path + "index.html");
	var list_of_results=[{username:'alef'},{username:'bet'},'gimmel'];


connection.query('SELECT * from results order by time_result limit 25', function(err, rows, fields) {
  if (!err)
    {//console.log('The solution is: ', rows);
	list_of_results=JSON.parse(JSON.stringify(rows));
	//console.log('The solution is???: ', list_of_results);
	res.render('results',{title:'results',results:list_of_results,is_logged:req.session.is_logged, "username":req.session.username});
	}
  else
	{
    console.log('Error while performing Query.');
	res.render('results',{title:'results',results:list_of_results});
	}
});



	
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
