var teams = [
	"Switzerland",
	"Poland",
	"Croatia",
	"Portugal",
	"Wales",
	"Northern Ireland",
	"Hungary",
	"Belgium",
	"Germany",
	"Slovakia",
	"Italy",
	"Spain",
	"France",
	"Republic of Ireland",
	"England",
	"Iceland"
];

function possibility(){
	var array_p=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
	if (arguments.length == 1){
		var i;
		for (i = 0; i < 16; i++)
			if (arguments[0]==teams[i]) array_p[i]=1;
		return array_p;
	}
	if (arguments.length == 3){
		var array_p1=arguments[0];
		var array_p2=arguments[1];
		var i;
		var j;
		for (i = 0; i < 16; i++)
			for (j = 0; j < 16 ; j++)
				if (i!=j){
					array_p[i]=array_p[i]+array_p1[i]*array_p2[j]*arguments[2][teams[i]]/(arguments[2][teams[i]]+arguments[2][teams[j]]);
					array_p[j]=array_p[j]+array_p1[i]*array_p2[j]*arguments[2][teams[j]]/(arguments[2][teams[i]]+arguments[2][teams[j]]);
				};
		return array_p;
	}
}

function forecast(data , support_team){
	var i;
	for (i = 0; i < 16; i++)
		if (teams[i]==support_team) 
			{
				return possibility(
					possibility( 
						possibility( possibility(possibility("Switzerland"),possibility("Poland"),data),
							 	 	 possibility(possibility("Croatia"),possibility("Portugal"),data) ,data),
						possibility( possibility(possibility("Wales"),possibility("Northern Ireland"),data),
							 	 	 possibility(possibility("Hungary"),possibility("Belgium"),data) ,data) ,data),
					possibility(
						possibility( possibility(possibility("Germany"),possibility("Slovakia"),data),
							 	 	 possibility(possibility("Italy"),possibility("Spain"),data) ,data),
						possibility( possibility(possibility("France"),possibility("Republic of Ireland"),data),
						     	 	 possibility(possibility("England"),possibility("Iceland"),data) ,data) ,data), data)[i];
			}
}


/*var power = {
	"Switzerland":50,
	"Poland":50,
	"Croatia":50,
	"Portugal":50,
	"Wales":50,
	"Northern Ireland":50,
	"Hungary":50,
	"Belgium":50,
	"Germany":500000,
	"Slovakia":50,
	"Italy":50,
	"Spain":50,
	"France":50,
	"Republic of Ireland":50,
	"England":50,
	"Iceland":50
};

alert(forecast(power,"Germany"));*/