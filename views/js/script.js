



function s() {console.log('summin');}

var CurrentGame={};

//temp unfinished
function generate_game()
	{
	var selectedText = $("#game_preset").find("option:selected").text();
		if(selectedText=="9x9, 5 min")
			{
			CurrentGame =new Game(9,9,5,selectedText);
			}
		if(selectedText=="9x9, 16 min")
			{
			CurrentGame =new Game(9,9,16,selectedText);
			}
		if(selectedText=="16x16, 64 min")
			{
			CurrentGame =new Game(16,16,64,selectedText);
			}
		if(selectedText=="20x20, 80 min")
			{
			CurrentGame =new Game(20,20,80,selectedText);
			}
	
	}


function result_buton_press()
	{
	CurrentGame.result();
	}




function Game(size_x,size_y,mine_num,preset)
	{
	
var board = document.getElementById("board");
while (board.firstChild) 
	{
    board.removeChild(board.firstChild);
	}
var tbody = document.createElement('tbody');
board.appendChild(tbody);
	
	$(function () { minesweeper(size_x,size_y,mine_num); });
	
	this.preset=preset
	this.size_x=size_x;
	this.size_y=size_y;
	this.mine_num=mine_num;
	var self=this;
	this.result = function(timestr)
		{
		var out ={};
		out.time=timestr;
		out.preset=self.preset;
		send_result(out);
		};
	

	}




//minesweeper end


function send_result(json_result)
	{
	$.ajax
		({
		type: 'POST',
		json: true,
		contentType: 'application/json', 
		url: '/send_db_result',
		data: JSON.stringify(json_result),

		success: function (data) 
			{
			var ret = jQuery.parseJSON(data);
			console.log(ret);
			$('#lblResponse').html(ret.msg);
			},
		error: function (xhr, status, error) 
			{
			console.log('Error: ' + error.message);
			$('#lblResponse').html('Error connecting to the server.');
			}
		});
	}



function send_post(elem_id)
	{
	var thing = {};
	thing.value= document.getElementById(elem_id).value;
	console.log("trying to send "+thing.value);
	var returned={}
	$.ajax
		({
		type: 'POST',
		json: true,
		contentType: 'application/json', 
		url: '/send_data',
		data: JSON.stringify(thing),

		success: function (data) 
			{
			var ret = jQuery.parseJSON(data);
			console.log(ret);
			$('#lblResponse').html(ret.msg);
			returned =ret
			},
		error: function (xhr, status, error) 
			{
			console.log('Error: ' + error.message);
			$('#lblResponse').html('Error connecting to the server.');
			}
		});
	}



function test_login(log_in,data)
	{
	var thing = {logged_in:log_in,data};
	console.log("trying to send ",thing.value,data);
	var returned={}
	$.ajax
		({
		type: 'POST',
		json: true,
		contentType: 'application/json', 
		url: '/login_url',
		data: JSON.stringify(thing),

		success: function (data) 
			{
			var ret = jQuery.parseJSON(data);
			console.log(ret);
			if(ret.value=="success")
				$("#msg").text("pomyslnie zalogowano");
			else if (ret.value=="failure")
				$("#msg").text("Zle dane logowania");
			//$('#lblResponse').html(ret.msg);
			//returned =ret
			},
		error: function (xhr, status, error) 
			{
			console.log('Error: ' + error.message);
			//$('#lblResponse').html('Error connecting to the server.');
			}
		});
	
	}	


function test_register(input)
	{

	var pass1=input.password;
	var pass2=input.password2;
	var uname =input.username;

	if(pass1!=pass2)
		{$("#msg").text("podaj poprawne powtorzenie hasla");}
	else if (pass1.length<8 || uname.length<3)
		{$("#msg").text("nazwa uzytkownika lub haslo jest zbyt krotkie");}
	else if (pass1.length>250 || uname.length>250)
		{$("#msg").text("nazwa uzytkownika lub haslo jest dlugie");}
	else if (pass1.indexOf(" ")>(-1) || uname.indexOf(" ")>(-1) )
		{$("#msg").text("nazwa uzytkownika lub haslo nie moga zawierac spacji");}
	else	
		{
		$.ajax
			({
			type: 'POST',
			json: true,
			contentType: 'application/json', 
			url: '/register_url',
			data: JSON.stringify(input),

			success: function (data) 
				{
				var ret = jQuery.parseJSON(data);
				console.log(ret);
				if(ret.value=="success")
					$("#msg").text("pomyslnie zarejestrowano");
				else if (ret.value=="failure")
					$("#msg").text("nazwa uzytkownika jest w uzyciu");
				},
			error: function (xhr, status, error) 
				{
				console.log('Error: ' + error.message);
				}
			});
		}

	
	
	}	







