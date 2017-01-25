var express = require("express");
var bodyParser = require('body-parser')
var app = express();
var router = express.Router();
var path = __dirname + '/views/';

 
var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : '172.30.24.12',
	user     : 'wida_1113470',
	password : '51928325',
	database : 'WIDA',
	//port: 3306
});

connection.connect();
/*
connection.query('SELECT * from test_table', function(err, rows, fields) {
  if (!err)
    console.log('The solution is: ', rows);
  else
    console.log('Error while performing Query.');
});
*/





app.use(express.static(__dirname + '/views'));
//ustawia powyzsze jako jakis glowny folder i dzieki temu htmle znaja swojego cssa
app.set('view engine', 'jade');



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
    console.log(req.body);
	res.end(JSON.stringify({response_text:"db_recieved"}));

	var inserted =
		{
		username:'anon',
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
	var list_of_results=[{username:'alef'},{username:'bet'},'gimmel'];


connection.query('SELECT * from results order by time_result desc limit 25', function(err, rows, fields) {
  if (!err)
    {console.log('The solution is: ', rows);
	list_of_results=JSON.parse(JSON.stringify(rows));
	console.log('The solution is???: ', list_of_results);
	res.render('results',{title:'results',results:list_of_results});
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
