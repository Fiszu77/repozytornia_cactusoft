#pragma strict

var inv:GameObject;
var menu:GameObject;
var aiming:GameObject[];
var kamera:GameObject;

var hp:float=100;

var hpSlider:UnityEngine.UI.Slider;

function Update () {

	if(Input.GetKeyDown(KeyCode.Tab)) {
	 if(inv.activeInHierarchy==false) {
	  inv.SetActive(true);
	 }
	 else {
	  inv.SetActive(false);
	 }
	}
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

	if(kamera.GetComponent.<Camera>().orthographicSize>=25 && kamera.GetComponent.<Camera>().orthographicSize<=55) {
	 if(Input.GetAxis("Mouse ScrollWheel")>0) {
	  kamera.GetComponent.<Camera>().orthographicSize-=2;
	 }
	 if(Input.GetAxis("Mouse ScrollWheel")<0) {
	  kamera.GetComponent.<Camera>().orthographicSize+=2;
	 }
	}
	if(kamera.GetComponent.<Camera>().orthographicSize<25) {
	 kamera.GetComponent.<Camera>().orthographicSize=25;
	}
	if(kamera.GetComponent.<Camera>().orthographicSize>55) {
	 kamera.GetComponent.<Camera>().orthographicSize=55;
	}

	Mathf.RoundToInt(hp);
	hpSlider.value=hp/100;
}

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


function Armed () {
	Shoot.isArmed=true;
	aiming[0].SetActive(true);
	aiming[1].SetActive(true);
	inv.SetActive(false);
}

function Resume () {
	Time.timeScale=1;
}