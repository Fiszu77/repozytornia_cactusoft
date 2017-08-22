﻿#pragma strict

static var characters:GameObject[];
var teamTxts:GameObject[];
var endScreen:GameObject;

var turnTimer:float;//zegar tury
var lengthOfTurn:int;//długość tury
var teams:int;//ilość drużyn
var teamTurn:int=1;//tura obecnej drużyny
var playerTurn:int=1;//tura obecnego gracza obecnej tury
var t1Hp:float;//ilość życia drużyny 1
var t2Hp:float;
static var won:int;//która drużyna wygrała

var tColors:Color32[];//color paska życia drużyny

var tHpSliders:UnityEngine.UI.Slider[];//paski życia drużyn
var turnTimerTxt:UnityEngine.UI.Text;//tekst zegara tury

function Start () {
	characters=GameObject.FindGameObjectsWithTag("Player");
	turnTimer=lengthOfTurn;
//wyłączanie niepotrzebnych hp sliderów drużyn
	for(var x=teams;x<4;x++) {
	 teamTxts[x].SetActive(false);
	}
}

function Update () {
	turnTimer-=Time.deltaTime;
	turnTimerTxt.text=""+Mathf.RoundToInt(turnTimer);

	if(turnTimer<=5) {
	 turnTimerTxt.color=tColors[0];
	}
	else {
	 turnTimerTxt.color=tColors[teamTurn];
	}
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
	tHpSliders[0].value=t1Hp/400;
	Mathf.RoundToInt(t2Hp);
	tHpSliders[1].value=t2Hp/400;
//kiedy skończy się czas tury
	if(turnTimer<=0) {
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
	 turnTimer=lengthOfTurn;
	}

	if(x==4) {
	 playerTurn++;
	 x=0;
	}

	if(t1Hp>=1) {
	 if(t2Hp<=0) {
	  won=1;
	  endScreen.SetActive(true);
	  Time.timeScale=0.5;
	 }
	}
	if(t2Hp>=1) {
	 if(t1Hp<=0) {
	  won=2;
	  endScreen.SetActive(true);
	  Time.timeScale=0.5;
	 }
	}

}

function Shot() {
	turnTimer=5;
}