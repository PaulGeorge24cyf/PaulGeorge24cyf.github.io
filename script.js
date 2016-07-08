var text = document.getElementsByClassName("p_content");
var message_set = document.getElementsByClassName("message_set");
var c1 = document.getElementById("message_1");
var c2 = document.getElementById("message_2");
var c3 = document.getElementById("message_3");
c1.setAttribute("style","position: fixed;left: 100px;top: 200px;height: 70px;width: 800px; opacity:100%");
c2.setAttribute("style","position: fixed;left: 100px;top: 350px;height: 70px;width: 800px; opacity:100%");
c3.setAttribute("style","position: fixed;left: 100px;top: 500px;height: 70px;width: 800px; opacity:100%");


var moving_flag = false;

$.get("https://wall.cgcgbcbc.com/api/messages?num=3",function(data){
	c1.children[0].children[0].src = data[0].headimgurl;
	c1.children[0].children[1].innerHTML = data[0].nickname;
	if (data[0].content.length>20) c1.children[1].children[0].innerHTML = "<marquee>"+data[0].content+"</marquee>";
		else c1.children[1].children[0].innerHTML = data[0].content;
	c1.children[1].style = "border:none";
	c2.children[0].children[0].src = data[1].headimgurl;
	c2.children[0].children[1].innerHTML = data[1].nickname;
	if (data[1].content.length>20) c2.children[1].children[0].innerHTML = "<marquee>"+data[1].content+"</marquee>";
		else c2.children[1].children[0].innerHTML = data[1].content;
	c2.children[1].style = "border:none";
	c3.children[0].children[0].src = data[2].headimgurl;
	c3.children[0].children[1].innerHTML = data[2].nickname;
	if (data[2].content.length>20) c3.children[1].children[0].innerHTML = "<marquee>"+data[2].content+"</marquee>";
		else c3.children[1].children[0].innerHTML = data[2].content;
	c3.children[1].style = "border:none";
})

function get_message(){
	var socket = io.connect("https://wall.cgcgbcbc.com");
	socket.on("new message",function(data){
		if (!moving_flag)
			var up = update(data);
	});
	socket.on("admin",function(data){
		if (!moving_flag)
			var ad = admin(data);
	});
}


var flag_update = false;

var x1,x2,x3,y1,y2,y3;
var flag_new_admin = false;
var flag_admin = false;
var timer = 0;

function update(data){
	flag_update = true;
	c1 = document.getElementById("message_1");
	c2 = document.getElementById("message_2");
	c3 = document.getElementById("message_3");
	x1 = parseInt(c1.style.left);
	y1 = parseInt(c1.style.top);
	x2 = parseInt(c2.style.left);
	y2 = parseInt(c2.style.top);
	x3 = parseInt(c3.style.left);
	y3 = parseInt(c3.style.top);
	c3.children[0].children[0].src = data.headimgurl;
	c3.children[0].children[1].innerHTML = data.nickname;
	if (data.content.length>20) c3.children[1].children[0].innerHTML = "<marquee>"+data.content+"</marquee>";
		else c3.children[1].children[0].innerHTML = data.content;
	c3.children[1].style = "border:none";
}

function admin(data){
	console.log("admin");
	flag_new_admin = true;
	flag_update = true;
	c1 = document.getElementById("message_1");
	c2 = document.getElementById("message_2");
	c3 = document.getElementById("message_3");
	x1 = parseInt(c1.style.left);
	y1 = parseInt(c1.style.top);
	x2 = parseInt(c2.style.left);
	y2 = parseInt(c2.style.top);
	x3 = parseInt(c3.style.left);
	y3 = parseInt(c3.style.top);
	c3.children[0].children[0].src = "./icon_admin.jpg";
	c3.children[0].children[1].innerHTML = data.nickname;
	if (data.content.length>20) c3.children[1].children[0].innerHTML = "<marquee>"+data.content+"</marquee>";
		else c3.children[1].children[0].innerHTML = data.content;
	c3.children[1].style = "border:2px solid red";
}

//flag_admin:当前置顶状态


var interval = setInterval(function(){
	if (flag_admin) timer = timer + 1;
		else timer = 0;
	if (timer == 2000) flag_admin = false;
	if ((flag_update)&&((!flag_admin)||(flag_new_admin))){
		moving_flag = true;
		y3 = y3 - 2;
		c3.style.top = y3;
		c3.style.opacity = (y1-y3)/3*2/100;
		y1 = y1 + 1;
		c1.style.top = y1;
		y2 = y2 + 1;
		c2.style.top = y2;
		if (y3 == 200) {
			flag_update = false;
			moving_flag = false;
			if (flag_new_admin) {
				flag_admin = true;
				timer = 0;
				flag_new_admin = false;
			}
			c1.setAttribute("id","message_2");
			c2.setAttribute("id","message_3");
			c3.setAttribute("id","message_1");
			return;
		}
	}
	else if ((flag_admin)&&(flag_update)){
		moving_flag = true;
		y3 = y3 - 1;
		c3.style.top = y3;
		c3.style.opacity = (y2-y3)/3*2/100;
		y2 = y2 + 1;
		c2.style.top = y2;
		if (y3 == 350) {
			moving_flag = false;
			flag_update = false;
			c2.setAttribute("id","message_3");
			c3.setAttribute("id","message_2");
			return;
		}
	}
},5);//滚消息动画

/*console.log(c1.children[1].children[0].style);

var interval2 = setInterval(function(){
	console.log(c1.children[1].children[0].style.marginLeft);
	c1.children[1].children[0].style.marginLeft = c1.children[1].children[0].style.marginLeft - 10;
},10);//滚字动画*/


var g = new get_message();
