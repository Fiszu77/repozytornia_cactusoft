#pragma strict

static var characters:GameObject[];

var turnTimer:float;
var lengthOfTurn:int;
var teams:int;
var teamTurn:int=1;
var playerTurn:int=1;
var t1Hp:float;
var t2Hp:float;

var t1HpSlider:UnityEngine.UI.Slider;
var t2HpSlider:UnityEngine.UI.Slider;

function Start () {
	characters=GameObject.FindGameObjectsWithTag("Player");
}

function Update () {
	turnTimer+=Time.deltaTime;
//przydzielanie hp pojedyńczych nieświszczuków do hp drużyny
	for(var i=0;i<characters.length;i++) {
	 switch(characters[i].GetComponent.<Character>().team) {
	  case 1:
	   t1Hp=characters[i].GetComponent.<Character>().hp;
	  break;
	  case 2:
	   t2Hp=characters[i].GetComponent.<Character>().hp;
	  break;
	 }
	}
//ustalanie punktów życia drużyny
	Mathf.RoundToInt(t1Hp);
	t1HpSlider.value=t1Hp/400;
	Mathf.RoundToInt(t2Hp);
	t2HpSlider.value=t2Hp/400;
//kiedy skończy się czas tury
	if(turnTimer>=lengthOfTurn) {
	 var x:int;
	 x++;
	 for(var n=0;n<characters.length;n++) {//oddaj turę innemu nieświszukowi
	  if(characters[n].GetComponent.<Character>().team==teamTurn) {
	   if(characters[n].GetComponent.<Character>().player==playerTurn) {
	    characters[n].BroadcastMessage("Reset");
	    characters[n].GetComponent.<Character>().myTurn=false;
	   }
	  }
	  if(teamTurn+1==teams+1) {
	   if(characters[n].GetComponent.<Character>().team==1) {
	    if(characters[n].GetComponent.<Character>().player==playerTurn) {
	     characters[n].GetComponent.<Character>().myTurn=true;
	    }
	   }
	  }
	  else {
	   if(characters[n].GetComponent.<Character>().team==teamTurn+1) {
	    if(characters[n].GetComponent.<Character>().player==playerTurn) {
	     characters[n].GetComponent.<Character>().myTurn=true;
	    }
	   }
	  }
	 }
	 teamTurn++;
	 if(teamTurn==teams+1) {
	  teamTurn=1;
	 }
	 turnTimer=0;
	}

	if(x==4) {
	 playerTurn++;
	 x=0;
	}

}