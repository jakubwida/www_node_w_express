



function s() {console.log('summin');}

var CurrentGame={};

//temp unfinished
function generate_game()
	{
	var selectedText = $("#game_preset").find("option:selected").text();
		if(selectedText=="9x9, 16 min")
			{
			CurrentGame =new Game(9,9,16,selectedText);
			console.log(CurrentGame);
			}
		if(selectedText=="16x16, 64 min")
			{
			CurrentGame =new Game(16,16,64,selectedText);
			}
		if(selectedText=="16x32, 128 min")
			{
			CurrentGame =new Game(16,32,128,selectedText);
			}
	
	}


function result_buton_press()
	{
	CurrentGame.result();
	}

function Game(size_x,size_y,mine_num,preset)
	{
	
	//to musi zostac poprawione
	var target = document.getElementById("game_area");
	target.backgroun
	var button=document.createElement("BUTTON");
	var text = document.createTextNode("result");
	button.appendChild(text);
	button.className='btn';
	button.setAttribute("type","button");
	button.setAttribute("onclick","result_buton_press()");
	

//"<button type='button', class='btn' onclick=CurrentGame.result()> send me</button>"
	$('#game_area').append(button);


	this.preset=preset
	this.size_x=size_x;
	this.size_y=size_y;
	this.mine_num=mine_num;
	var self=this;
	this.result = function()
		{
		var out ={};
		out.time='00:02:15';
		out.preset=self.preset;
		send_result(out);
		};
	

	}


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
			},
		error: function (xhr, status, error) 
			{
			console.log('Error: ' + error.message);
			$('#lblResponse').html('Error connecting to the server.');
			}
		});
	}

