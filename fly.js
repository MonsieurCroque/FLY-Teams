var nbTotal = 0;

function add(){
	nbTotal += 1;
	nb = $("#inputNb").val();
	newGroup= $("#newGroup").clone();
	newGroup.css('display', "");
	newGroup.prop("id", "group"+nbTotal);
	for (i=0; i < nb; i++){
		$( "<div><input class='Group" + nbTotal + "'></input></div>").appendTo(newGroup);
	}
	$( "<div><a class='btn btn-primary' role='button' href='javascript:deleteElem("+nbTotal+")'>Delete</a></div>").appendTo(newGroup);
	newGroup.appendTo("#GroupeInp");
}

function deleteElem(i){
	$("#group"+i).css('display', "None");
	$("#group"+i).html("")
}

function newTeams(){
	$("#Result").css('display', "");
	$("#legende").html("");
	var Groups = []
	var TotalPart = 0
	var TotalVect = []
	var TeamCount = [0,0,0,0,0]
	var Team = [[],[],[],[],[]]
	Infos = [["D266","12:45"],["Lecture Hall 3","13:00"],["Lecture Hall 3", "13:15"],["Lecture Hall 6", "13:30"],["D008", "13:45"]]
	Count = 0
	for (i=1; i<=nbTotal; i++){
		if ($(".Group" + i) != null){
			TotalVect[Count] = 0
			Groups[Count] = []
			$(".Group" + i).each(function (){
				if ($(this).val() == "Simon Revel" || $(this).val() == "Simon R"){
					TeamCount[0] = 1
					Team[0].push($(this).val())
					TotalPart += 1
				}
				else{
					Groups[Count].push($(this).val());
					TotalVect[Count] += 1
					TotalPart += 1
				}
			})
			Count += 1
		}
	}

	for(i=0; i<Count; i++){
		team = Math.floor(Math.random() * Math.min(5, Math.ceil(TotalPart/3)));
		while(TeamCount[team]+ TotalVect[i] > 3){
			team = Math.floor(Math.random() * 5);
		}
		TeamCount[team] += TotalVect[i]
		for (j=0; j<TotalVect[i]; j++){
			Team[team].push(Groups[i][j])
		}
	}
	console.log(Team)
	for(i=0; i<5; i++){
		if (Team[i].length >0){
			count = i+1
			acc = ""
			acc += "<tr><td>Team "+count+"</td><td>"
			for (j = 0; j < TeamCount[i];j++){
				acc += Team[i][j] + "<br/>"
			}
			acc += "</td><td>"+Infos[i][0]+"</td><td>"+Infos[i][1]+"</td></tr>"
			$(acc).appendTo($("#legende"));
		}
	}
}