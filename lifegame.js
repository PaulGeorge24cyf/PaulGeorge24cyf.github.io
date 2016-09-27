var width,height,speed,scale;


width = 100;
height = 100;
scale = width/10;
speed = 1;
var i,j;

var chessboard = new Array(width*height);
var canvas = document.getElementById("lifegame_canvas");


function init(w,h){
	var i,j,len;
	var chessboard = new Array(width*height);
	for (i = 0; i < w; i++) 
		for (j = 0; j < h; j++) 
			chessboard[i*h+j] = parseInt(2*Math.random());
	return chessboard;
};

function calc(i,j,w,h,chessboard){
	var sum = 0;
	if (chessboard[i*h + (j+1)%w] == 1) sum++;
	if (chessboard[i*h + (j-1+w)%w] == 1) sum++;
	if (chessboard[((i+1)%h)*h + (j-1+w)%w] == 1) sum++;
	if (chessboard[((i-1+h)%h)*h + (j-1+w)%w] == 1) sum++;
	if (chessboard[((i+1)%h)*h + (j+1)%w] == 1) sum++;
	if (chessboard[((i-1+h)%h)*h + (j+1)%w] == 1) sum++;
	if (chessboard[((i+1)%h)*h + j] == 1) sum++;
	if (chessboard[((i-1+h)%h)*h + j] == 1) sum++;

	if (sum == 2) return chessboard[i*h+j];
	if (sum == 3) return 1;
	return 0;
};


function fresh(w,h,chessboard){
	var n_chessboard = new Array(width*height);
	for (i = 0; i < w; i++) 
		for (j = 0; j < h; j++)
			n_chessboard[i*h+j] = calc(i,j,w,h,chessboard);
	return n_chessboard;
};


function draw(w,h,chessboard){
	var cxt=canvas.getContext("2d");
	for (i = 0; i < w; i++) 
		for (j = 0; j < h; j++){
			if (chessboard[i*h+j]==1){
				cxt.fillStyle="#FF0000";
				cxt.fillRect(i*20/scale,j*10/scale,20/scale,10/scale); 
			}
			else{
				cxt.fillStyle="#000000";
				cxt.fillRect(i*20/scale,j*10/scale,20/scale,10/scale); 
			}
		}	
}

var btn_start = document.getElementById('div_button_3');
var btn_end = document.getElementById('div_button_0');
var btn_width = document.getElementById('div_button_1');
var btn_speed = document.getElementById('div_button_2');
var clearflag = false;
btn_end.onclick = function(){
	clearflag = true;
	//chessboard = init(width,height);
}
btn_start.onclick = function(){
	clearflag = false;
	chessboard = init(width,height);
	var interval = setInterval(function(){
		chessboard = fresh(width,height,chessboard);
		draw(width,height,chessboard);
		console.log(clearflag);
		if (clearflag) clearInterval(interval);
	},1000/speed);
}
btn_width.onclick = function(){
	width = document.getElementById('Width').value;
	height = document.getElementById('Width').value;
	scale = width/10;
	clearflag = true;
	//chessboard = init(width,height);
}
btn_speed.onclick = function(){
	speed = document.getElementById('Speed').value;
	clearflag = true;
	//chessboard = init(width,height);
}
