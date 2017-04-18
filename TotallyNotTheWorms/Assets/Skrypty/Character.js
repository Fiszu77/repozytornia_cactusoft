#pragma strict

var inv:GameObject;
var menu:GameObject;
var aiming:GameObject[];
var kamera:GameObject;
var hat:GameObject;
var tekstura:GameObject;

var hats:Sprite[];

var hp:float=100;
var c:int;
var team:int;
var player:int;

var myTurn:boolean;

var hpSlider:UnityEngine.UI.Slider;
var hpColor:UnityEngine.UI.Image;

function Start() {
//losowanie kapelusza
	var h=Random.Range(0,3);
	hat.GetComponent.<SpriteRenderer>().sprite=hats[h];
}

function Update () {
 if(myTurn) {
  gameObject.GetComponent.<CharController>().enabled=true;
  tekstura.GetComponent.<Shoot>().enabled=true;
  kamera.SetActive(true);
//wł/wył ekwipunku 
	if(Input.GetKeyDown(KeyCode.Tab)) {
	 if(inv.activeInHierarchy==false) {
	  inv.SetActive(true);
	 }
	 else {
	  inv.SetActive(false);
	 }
	}
//wł/wył menu
	if(Input.GetKeyDown(KeyCode.Escape)) {
	 if(menu.activeInHierarchy==false) {
	  menu.SetActive(true);
	  Time.timeScale=0;
	 }
	 else {
	  menu.SetActive(false);
	  Time.timeScale=1;
	 }
	}
//zoom
	if(kamera.GetComponent.<Camera>().orthographicSize>=10 && kamera.GetComponent.<Camera>().orthographicSize<=55) {
	 if(Input.GetAxis("Mouse ScrollWheel")>0) {
	  kamera.GetComponent.<Camera>().orthographicSize-=2;
	 }
	 if(Input.GetAxis("Mouse ScrollWheel")<0) {
	  kamera.GetComponent.<Camera>().orthographicSize+=2;
	 }
	}
	if(kamera.GetComponent.<Camera>().orthographicSize<10) {
	 kamera.GetComponent.<Camera>().orthographicSize=10;
	}
	if(kamera.GetComponent.<Camera>().orthographicSize>55) {
	 kamera.GetComponent.<Camera>().orthographicSize=55;
	}
 }
 else {
  gameObject.GetComponent.<CharController>().enabled=false;
  tekstura.GetComponent.<Shoot>().enabled=false;
  kamera.SetActive(false);
 }
//ustalanie punktów życia
	hpSlider.value=hp/100;
//ustalanie koloru życia
	if(hp>=50) {
	 c=-5.1*hp;
	 hpColor.color=new Color32(c,255,0,255);
	}
	else {
	 c=5.1*hp;
	 hpColor.color=new Color32(255,c,0,255);
	}
}
//wybór broni
function W0 () {
	Shoot.weapon=0;
	Armed();
}

function W1 () {
	Shoot.weapon=1;
	Armed();
}

function W2 () {
	Shoot.weapon=2;
	Armed();
}

function W3 () {
	Shoot.weapon=3;
	Armed();
}
function W4 () {
	Shoot.weapon=4;
	Armed();
}
//uzbrojony (broń została wybrana)
function Armed () {
	if(myTurn) {
	 Shoot.isArmed=true;
	 aiming[0].SetActive(true);
	 aiming[1].SetActive(true);
	 inv.SetActive(false);
	}
}