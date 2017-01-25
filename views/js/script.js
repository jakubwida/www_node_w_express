



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


//minesweeper



/*
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
*/



/*
var grid =[];
var grid_x_size=0;
var grid_y_size=0;
var mines_count=0;
var mines_flagged=0;
var flags=0;
var is_over=true;
function cell()
	{
	this.mine=false;
	this.uncovered=false;
	this.number=0;
	}

function push_neighbor(list,x,y)
	{
	
	if(x> 0 && x<grid_x_size && y>0 && y< grid_y_size)
		{
		list.push(grid[x][y]);
		}
	}

function get_valid_neighbors(x,y)
	{
	var neighbors =[]
	for(i=x-1;i<x+1;i++)
		{
		for(j=y-1;j<y+1;j++)
			{
			push_neighbor(neighbors,i,j);

			}
		}
	return neighbors;
	}



function set_up_grid(x,y,mines)
	{
	grid_x_size=x;
	grid_y_size=y;
	mines_count=mines;
	for (var i = 0; i < x; i++) 
		{
		grid.push([]);
		for (var j = 0; j < y; j++) 
			{
			grid[i].push(new cell());
			}
		}
	var mine =mines
	while(mines>0)
		{
		xpos=Math.floor((Math.random() * x) ); 
		ypos=Math.floor((Math.random() * y) ); 
		if(!(grid[xpos][ypos].mine))
			grid[xpos][ypos].mine=true;
			mines=mines-1;
		}
		var neighbors = []
	for (var i = 0; i < x; i++) 
		{
		for (var j = 0; j < y; j++) 
			{
			neighbors = get_valid_neighbors(i,j)
			var minum =0;
			for(var k=0;k<neighbors.length;k++)
				{
				minum=minum+1;
				}
			grid[i][j].number=minum;
			}
		}

	}

function uncover(x,y)
	{
	
	if(grid[x][y].mine)
		{
		is_over=true;
		}
	else
		{
		n =get_valid_neighbors(x,y)
		len = n.length;
		for(var k=0;k<len;k++)
				{
				if(!n.mine)
					{n.uncovered=true;}
				}
		grid[x][y].uncovered=true;
		visualise_grid();
		}
	}



function visualise_grid()
	{
	for (var i = 0; i < grid_x_size; i++) 
		{
		for (var j = 0; j < grid_y_size; j++) 
			{
			if(grid[i][j].uncovered)
				{
				//btn = get_button_by_id('{x:'+i+',y:'+j+'}');
				btn = get_button_by_pos(i,j)
				btn.textContent=grid[i][j].number;
				}
			}
		}
	}
	

function get_button_by_pos(x,y)
	{
	return get_button_by_id('{"x":'+x+',"y":'+y+'}');
	}

function get_button_by_id(id)
	{
	return document.getElementById(id);
	}


function button_react_left(id)
	{
	var button_data=JSON.parse(id);
	console.log("button was left pressed:"+button_data);
	console.log(button_data.x,button_data.y);
	var button_json = JSON.parse(id);

	uncover(button_json.x,button_json.y);
	visualise_grid()
	//get_button_by_id(id).style.color='red';
	}

function button_react_right(id)
	{
	var button_data=JSON.parse(id);
	console.log("button was right pressed:"+button_data);
	console.log(button_data.x,button_data.y,grid[button_data.x][button_data.y].uncovered);
	
	}

function make_button_grid(x,y)
	{
	var tbl = document.createElement('table');
	var tbdy = document.createElement('tbody');
	for (var i = 0; i < x; i++) 
		{
        var tr = document.createElement('tr');
        for (var j = 0; j < y; j++) 
			{
			var td = document.createElement('td');
			var btn = document.createElement('button');
			var text = document.createTextNode("-");
			
			
			btn.setAttribute("type","button");
			btn.id='{"x":'+i+',"y":'+j+'}';
			btn.className='btn btn-default';
			btn.setAttribute("onclick","button_react_left(this.id)");
			btn.setAttribute("oncontextmenu","button_react_right(this.id)");
			btn.appendChild(text);
			td.appendChild(btn)
			tr.appendChild(td)
            
        	}
        tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
	$('#game_area').append(tbl)
	}

*/

function Game(size_x,size_y,mine_num,preset)
	{
	
var board = document.getElementById("board");
while (board.firstChild) 
	{
    board.removeChild(board.firstChild);
	}
var tbody = document.createElement('tbody');
board.appendChild(tbody);
	


	//to musi zostac poprawione
	//var target = document.getElementById("game_area");
	//make_button_grid(4,4);
	//set_up_grid(4,4,3);
	//visualise_grid();
	$(function () { minesweeper(size_x,size_y,mine_num); });
	

/*
	var button=document.createElement("BUTTON");
	var text = document.createTextNode("result");
	button.appendChild(text);
	button.className='btn';
	button.setAttribute("type","button");
	button.setAttribute("onclick","result_buton_press()");
	*/

//"<button type='button', class='btn' onclick=CurrentGame.result()> send me</button>"
	//$('#game_area').append(button);


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

