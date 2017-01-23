#pragma strict

var inv:GameObject;
var aiming:GameObject[];

function Update () {
	if(Input.GetKeyDown(KeyCode.Tab)) {
	 if(inv.active==false) {
	  inv.SetActive(true);
	 }
	 else {
	  inv.SetActive(false);
	 }
	}
}

function W0 () {
	Shoot.weapon=0;
	Armed();
}

function W1 () {
	Shoot.weapon=1;
	Armed();
}

function Armed () {
	Shoot.isArmed=true;
	aiming[0].SetActive(true);
	aiming[1].SetActive(true);
	inv.SetActive(false);
}