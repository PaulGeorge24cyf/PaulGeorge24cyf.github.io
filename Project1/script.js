
var i,j,k,l;
var dom = document.getElementById("div_content");

var game_status = 0;
var timer = 650;
var cleartime = 0;
var combo = 0;
var score = 0;
//0 unstarted 1 running 2 paused 3 over
var nodes_type = new Array();
var start_node_id = 0;
var end_node_id = 0;
var deletearray = new Array();


var btn_score = document.getElementById("div_score").children[0];
var btn_start = document.getElementById("div_button_0");
var btn_pause = document.getElementById("div_button_1");
var btn_hint = document.getElementById("div_button_2");
var timebar = document.getElementById("div_timebar");
var bigtext = document.getElementById("div_big_text");

btn_start.onclick = function(){
	if ((game_status == 3)||(game_status == 0)) {
		for (k = 0 ; k < 100 ; k++ ) $("#"+k.toString()).remove();
		var Reset = new reset(0,650);
	}
	//if (game_status == 0) var Reset = new reset();
	game_status = 1;
}

btn_pause.onclick = function(){
	if ((game_status == 3)||(game_status == 0)) return;
	if (game_status == 1){
		btn_pause.children[0].innerHTML = "Resume";
		game_status = 2;
		return;
	}
	else{
		btn_pause.children[0].innerHTML = "Pause";
		game_status = 1;
		return;
	}
}

var interval_timebar = setInterval(function(){
	if (game_status != 3) btn_score.innerHTML = score.toString();
	//if (game_status == 3) clearInterval(interval_timebar);
	if (game_status == 1){
		timer = timer - 1;
		if (timer <= 0){
			if (game_status!=3) {
				bigtext.children[0].innerHTML = "Game Over";
				bigtext.style = "display:block";
				cleartime = 50;
				game_status = 3;
				timer = 650;
			};
			return;
		}
		if (timer <= 650 )timebar.style.width = timer
			else timer.style.width = 650;
	}
},20);

var interval_cleartime = setInterval(function(){
	cleartime = cleartime - 1;
	if (cleartime <= 0 ) bigtext.style = "display:none";
},20);


function calcposition(x,y){
	return parseInt(parseInt((x-50)/65)+parseInt((y-50)/65)*10);
}

var x1,x2,y1,y2;
var div_1,div_2;
var changing_flag = false;
var dropping_flag = 0;
var x,y,t;
var y_b,y_t,x_l,x_r,t,x,y;

function exchange(start_node_id,end_node_id,anim){
	if (anim == 0) return;
	if (anim >= 1){
		var diretion;//上下左右
		if (start_node_id - end_node_id == 1) diretion = 3;
		if (start_node_id - end_node_id == -1) diretion = 4;
		if (start_node_id - end_node_id == 10) diretion = 1;
		if (start_node_id - end_node_id == -10) diretion = 2;
		div_1 = document.getElementById(start_node_id.toString());
		div_2 = document.getElementById(end_node_id.toString());
		x1 = parseInt(div_1.style.left);
		y1 = parseInt(div_1.style.top);
		x2 = parseInt(div_2.style.left);
		y2 = parseInt(div_2.style.top);
		var interval_change = setInterval(function(){
			changing_flag = true;
			if (diretion == 1) {
				y1 = y1 - 1;
				y2 = y2 + 1;
				div_1.style.top = y1;
				div_2.style.top = y2;
				if (y2-y1 == 65) {
					changing_flag = false;
					clearInterval(interval_change);
				}
			}
			if (diretion == 2) {
				y1 = y1 + 1;
				y2 = y2 - 1;
				div_1.style.top = y1;
				div_2.style.top = y2;
				if (y1-y2 == 65) {
					changing_flag = false;
					clearInterval(interval_change);
				}
			}
			if (diretion == 3) {
				x1 = x1 - 1;
				x2 = x2 + 1;
				div_1.style.left = x1;
				div_2.style.left = x2;
				if (x2-x1 == 65) {
					changing_flag = false;
					clearInterval(interval_change);
				}
			}
			if (diretion == 4) {
				x1 = x1 + 1;
				x2 = x2 - 1;
				div_1.style.left = x1;
				div_2.style.left = x2;
				if (x1-x2 == 65) {
					changing_flag = false;
					clearInterval(interval_change);
				}
			}
		},5);
		div_1.setAttribute("id",end_node_id.toString());
		div_2.setAttribute("id",start_node_id.toString());
		i = nodes_type[start_node_id]; 
		nodes_type[start_node_id] = nodes_type[end_node_id];
		nodes_type[end_node_id] = i;	
	}
}

function judge(start_node_id,end_node_id){
	if (start_node_id == end_node_id) return 0;
	if ((start_node_id - end_node_id != 10)&&(start_node_id - end_node_id != -10)&&(start_node_id - end_node_id != 1)&&(start_node_id - end_node_id != -1)) return 0;
	return 2;
}//0:none 1:exchange 2:exchangeagain

function deletenode(){
	for (i = 0 ; i < 100 ; i++) deletearray[i] = 0;
	var d_num = 0;
	if ((nodes_type[start_node_id] == 0)&&(combo == 0)){
		for (k = 0 ; k < 100 ; k++){
			if (nodes_type[k] % 7 == nodes_type[end_node_id] % 7)
				deletearray[k] = 1;
		}
		deletearray[start_node_id] = 1;
	}
	else if ((nodes_type[end_node_id] == 0)&&(combo == 0)){
		for (k = 0 ; k < 100 ; k++){
			if (nodes_type[k] % 7 == nodes_type[start_node_id] % 7)
				deletearray[k] = 1;
		}
		deletearray[end_node_id] = 1;
	}//某颜色全清
	for (k = 0 ; k < 100 ; k++){
		y = y_b = y_t = parseInt(k/10);
		x = x_l = x_r = k % 10;
		t = nodes_type[k];
		while ((y_b <= 9)&&((nodes_type[y_b * 10 + x] - t)%7==0)) y_b++;
		y_b--;
		while ((y_t >= 0)&&((nodes_type[y_t * 10 + x] - t)%7==0)) y_t--;
		y_t++;
		while ((x_l >= 0)&&((nodes_type[y * 10 + x_l] - t)%7==0)) x_l--;
		x_l++;
		while ((x_r <= 9)&&((nodes_type[y * 10 + x_r] - t)%7==0)) x_r++;
		x_r--;
		if (y_b - y_t >= 2){
			for (i = y_t ; i <= y_b ; i++)
			{
				deletearray[i*10+x] = 1;
				d_num++;
			}
		}
		if (x_r - x_l >= 2){
			for (i = x_l ; i <= x_r ; i++)
			{
				deletearray[y*10+i] = 1;
				d_num++;
			}
		}	
		if (y_b - y_t >= 3){
			if (combo == 0 )
				for (i = y_t ; i <= y_b ; i++)
				{
					if ((i*10+x == start_node_id)||(i*10+x == end_node_id)){
						var node = new setnode(i*10+x,0,0,y_b-y_t-2,t);
						deletearray[i*10+x] = 0;
						break;
					}
				}
			else{
				var node = new setnode((y_t+2)*10+x,0,0,y_b-y_t-2,t);
				deletearray[(y_t+2)*10+x] = 0;
			}
		}
		if (x_r - x_l >= 3){
			if (combo == 0 )
				for (i = x_l ; i <= x_r ; i++)
				{
					if ((y*10+i == start_node_id)||(y*10+i == end_node_id)){
						var node = new setnode(y*10+i,0,0,x_r-x_l-2,t);
						deletearray[y*10+i] = 0;
						break;
					}
				}
			else {
				var node = new setnode(y*10+x_l+2,0,0,x_r-x_l-2,t);
				deletearray[y*10+x_l+2] = 0;
			}
		}	
		for (l = 0 ; l < 100 ; l++){
			if ((nodes_type[l] > 7)&&(deletearray[l]==1)){
				y_b = y_t = parseInt(l/10);
				x_l = x_r= l % 10;
				if (y_b < 9) y_b++;
				if (x_r < 9) x_r++;
				if (y_t > 0) y_t--;
				if (x_l > 0) x_l--;
				console.log(x_l,x_r,y_t,y_b);
				for (i = x_l ; i <= x_r ; i++)
					for (j = y_t ; j <= y_b ; j++)
						deletearray[i+10*j] = 1;
			}
		}//能量爆炸*/
	}

	var dis = new Array();
	var sum = 0;
	for (k = 0; k < 100 ; k++){
		sum = sum + deletearray[k];
		dis[k] = 0;
		y = parseInt(k / 10); 
		x = k % 10;
		if (deletearray[k] == 0 ){
			for (i = y ; i <= 9 ; i++) if (deletearray[i*10+x]==1) dis[k]++;
			//console.log(dis,k);
			if (dis[k]>0) drop(dis[k],k);
		}
		else {			
			$("#"+k.toString()).remove();
			/*dis = 0;
			var node = new setnode(k,50+x*65,-15,0,0);
			for (i = y ; i >= 0 ; i--) if (deletearray[i*10+x]==1) dis++;
			drop(dis,k);*/
		}
	}//drop*/
	for (k = 99; k >= 0 ; k--) {
		div = document.getElementById(k.toString());
		var newid = k + dis[k]*10;
		if (div != null){
			t = nodes_type[k]; nodes_type[k] = nodes_type[newid]; nodes_type[newid] = t;
			div.setAttribute("id",newid.toString());
		}
	};
	for (k = 99; k >= 0 ; k--) {
		div = document.getElementById(k.toString());
		var newid = k + dis[k]*10;
		if (div == null){
			var new_div = document.createElement("div");
			new_div.setAttribute("id",k.toString());
			dom.appendChild(new_div);
			j = k%10;
			i = parseInt(k/10);
			var node = new setnode(k,50+j*65,50+i*65,0,0);
			appear(k);
		}
	};
	return sum;
	//drop(1,0);
	//drop(1,10);
}

function appear(id){
	var div = document.getElementById(id.toString()).children[0];
	div.style = "opacity:0";
	var opa = 0;
	var interval_appear = setInterval(function(){
		opa = opa + 1;
		div.style.opacity = opa / 100;
		if (opa == 100) clearInterval(interval_appear);
	},5);
}

function drop(dis,id){
	var div_1 = document.getElementById(id.toString());
	var y_1,y_2;
	y_1 = y_2 = parseInt(div_1.style.top);
	//console.log("drop");
	dropping_flag++;
	var interval_drop = setInterval(function(){
		y_1 = y_1 + dis;
		div_1.style.top = y_1;
		if (y_1 - y_2 == dis * 65) {
			dropping_flag--;
			clearInterval(interval_drop);
		}
	},5);
}

function gameboard(){
	/*var sum;
	sum = deletenode();
	while (sum > 0) {
		sum = deletenode();
	}*/
	/*var node = new setnode(99,0,0,2,0);
	var node = new setnode(15,0,0,1,1);
	var node = new setnode(16,0,0,1,1);*/
	var delay_first = setInterval(function(){
		if ((changing_flag)||(dropping_flag>0)) return;
		sum = deletenode();
		if (sum > 0) combo++;
		if (sum == 0) clearInterval(delay_first);
	},5);
	document.onmousedown = function(event){
		//console.log("down");
		var pos_X = event.pageX;
		var pos_Y = event.pageY;
		start_node_id = calcposition(pos_X,pos_Y);
		console.log(start_node_id);
		console.log(nodes_type[start_node_id]);
	}
	document.onmouseup = function(event){
		//console.log("down");
		var pos_X = event.pageX;
		var pos_Y = event.pageY;
		var sum = 1;
		combo = 0;
		end_node_id = calcposition(pos_X,pos_Y);
		if (judge(start_node_id,end_node_id)>=1){
			var ex = new exchange(start_node_id, end_node_id,judge(start_node_id,end_node_id));
			var delay = setInterval(function(){
				if ((changing_flag)||(dropping_flag>0)) return;
				sum = deletenode();
				if (sum > 0) combo++;
				if (combo >= 2){
					bigtext.children[0].innerHTML = "Combo:" + combo.toString();
					bigtext.style = "display:block";
					cleartime = 50;
				}
				score = score + combo * sum;
				timer = timer + combo * sum * 20;
				if ((sum == 0)&&(combo == 0)) var ex = new exchange(start_node_id, end_node_id,judge(start_node_id,end_node_id));
				if (sum == 0) clearInterval(delay);
			},5);
		}
	}
}

btn_hint.onclick = function(){
	if (score < 50) return;
	score = score - 50;
	for (k = 0 ; k < 100 ; k++ ) $("#"+k.toString()).remove();
	var Reset = new reset(score,timer);
}

function setnode(id,left,top,power,type){
	if ((power == 0)&&(type == 0)){
		var random_type = parseInt(7 * Math.random()) + 1;
		var target_div = document.getElementById(id.toString());
		target_div.style = "position:fixed";
		//target_div.style = "background:none";
		target_div.style.left = 50 + j*65;
		target_div.style.top = 50 + i*65;
		target_div.style.width = 65;
		target_div.style.height = 65;
		if (random_type == 7) {
			/*target_div.style = "background:url('./resources/7.png')";
			target_div.style = "background-size:100%";*/
			target_div.innerHTML = "7";
			target_div.innerHTML = "<img src = './resources/7.png' width=100% height=100% ondragstart='return false;'>"
		}
		if (random_type == 1) {
			target_div.innerHTML = "1";
			target_div.innerHTML = "<img src = './resources/1.png' width=100% height=100% ondragstart='return false;'>"
		}
		if (random_type == 2) {
			target_div.innerHTML = "2";
			target_div.innerHTML = "<img src = './resources/2.png' width=100% height=100% ondragstart='return false;'>"

		}
		if (random_type == 3) {
			target_div.innerHTML = "3";
			target_div.innerHTML = "<img src = './resources/3.png' width=100% height=100% ondragstart='return false;'>"

		}
		if (random_type == 4) {
			target_div.innerHTML = "4";
			target_div.innerHTML = "<img src = './resources/4.png' width=100% height=100% ondragstart='return false;'>"

		}
		if (random_type == 5) {
			target_div.innerHTML = "5";
			target_div.innerHTML = "<img src = './resources/5.png' width=100% height=100% ondragstart='return false;'>"

		}
		if (random_type == 6) {
			target_div.innerHTML = "6";
			target_div.innerHTML = "<img src = './resources/6.png' width=100% height=100% ondragstart='return false;'>"
		}
		nodes_type[id] = random_type;
	}//初始化一个新的普通node
	if (power == 1){
		var target_div = document.getElementById(id.toString());
		if (type == 1) target_div.innerHTML = "<img src = './resources/8.jpg' width=100% height=100% ondragstart='return false;'>";
		if (type == 2) target_div.innerHTML = "<img src = './resources/9.jpg' width=100% height=100% ondragstart='return false;'>";
		if (type == 3) target_div.innerHTML = "<img src = './resources/10.jpg' width=100% height=100% ondragstart='return false;'>";
		if (type == 4) target_div.innerHTML = "<img src = './resources/11.jpg' width=100% height=100% ondragstart='return false;'>";
		if (type == 5) target_div.innerHTML = "<img src = './resources/12.jpg' width=100% height=100% ondragstart='return false;'>";
		if (type == 6) target_div.innerHTML = "<img src = './resources/13.jpg' width=100% height=100% ondragstart='return false;'>";
		if (type == 7) target_div.innerHTML = "<img src = './resources/14.jpg' width=100% height=100% ondragstart='return false;'>";
		nodes_type[id] = 7 + type;
	}
	if (power == 2){
		var target_div = document.getElementById(id.toString());
		target_div.innerHTML = "<img src = './resources/0.png' width=100% height=100% ondragstart='return false;'>"
		nodes_type[id] = 0;
	}
}

function reset(s,t){
	score = s;
	combo = 0;
	game_status = 0;
	timer = t;
	var num = 0;
	for (i = 0 ; i < 10 ; i++)
		for (j = 0 ; j < 10 ; j++)
		{
			num = i*10+j;
			nodes_type[num] = 0;
			var new_div = document.createElement("div");
			new_div.setAttribute("id",num.toString());
			dom.appendChild(new_div);
			/*new_div.style = "position:fixed";
			new_div.style.left = 50 + j*65;
			new_div.style.top = 50 + i*65;
			new_div.style.width = 65;
			new_div.style.height = 65;
			new_div.innerHTML = "就打德";*/
			var node = new setnode(num,50+j*65,50+i*65,0,0);
		}
	var gb = new gameboard();
}