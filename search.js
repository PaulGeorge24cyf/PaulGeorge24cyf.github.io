function search(){
	var array = [];
	var array_flag = [];
	if (typeof arguments[1] == "number") {
		var flag = false;
		var i;
		var num;
		num = 0;
		for (i = 0 ; i < arguments[0].length ; i++)
			if (arguments[0][i].age == arguments[1])
			{
				flag = true;
				array[num] = arguments[0][i];
				num++;
			};
		if (flag) return array;
			else return flag;
	};
	if (typeof arguments[1] == "string") {
		var flag = false;
		var i;
		var num;
		num = 0;
		for (i = 0 ; i < arguments[0].length ; i++)
			if (arguments[0][i].name == arguments[1])
			{
				flag = true;
				return arguments[0][i];
			};
		return flag;
	};
	if (typeof arguments[1] == "object") {
		var i;
		for (i = 0 ; i < arguments[0].length ; i++)
			array_flag[i] = true;
		if (typeof arguments[1].name != "undefined"){
			for (i = 0 ; i < arguments[0].length ; i++)
				if ((arguments[0][i].name != arguments[1].name)&&(array_flag[i]))
					array_flag[i] = false;
		}
		if (typeof arguments[1].age != "undefined"){
			for (i = 0 ; i < arguments[0].length ; i++)
				if ((arguments[0][i].age != arguments[1].age)&&(array_flag[i]))
					array_flag[i] = false;
		}
		if (typeof arguments[1].hometown != "undefined"){
			for (i = 0 ; i < arguments[0].length ; i++)
				if ((arguments[0][i].hometown != arguments[1].hometown)&&(array_flag[i]))
					array_flag[i] = false;
		}
		var flag = false;
		var num;
		num = 0;
		for (i = 0 ; i < arguments[0].length ; i++)
			if (array_flag[i]){
				flag = true;
				array[num] = arguments[0][i];
				num++;
			}
		if (flag) return array;
			else return flag;
	};
}

/*var info = [
{
	name:"Aslan",
	age:21,
	hometown:"Zhejiang"	
},
{
	name:"123",
	age:21,
	hometown:"Mars"
},
{
	name:"456",
	age:20,
	hometown:"Sun"
}
]

var ex = {
	age:21
}*/

//alert(search(info,21));
//console.log(search(info,ex));