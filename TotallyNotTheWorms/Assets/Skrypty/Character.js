#pragma strict

var inv:GameObject;
var menu:GameObject;
var aiming:GameObject[];
var kamera:GameObject;

var hp:float=100;

var hpSlider:UnityEngine.UI.Slider;

function Update () {
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
//ustalanie punktów życia
	Mathf.RoundToInt(hp);
	hpSlider.value=hp/100;
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
//uzbrojony (broń została wybrana)
function Armed () {
	Shoot.isArmed=true;
	aiming[0].SetActive(true);
	aiming[1].SetActive(true);
	inv.SetActive(false);
}