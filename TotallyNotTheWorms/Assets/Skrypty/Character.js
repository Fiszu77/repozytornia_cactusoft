﻿#pragma strict

var inv:GameObject;
var menu:GameObject;
var aiming:GameObject[];
var kamera:GameObject;

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
	  kamera.GetComponent.<Camera>().orthographicSize--;
	 }
	 if(Input.GetAxis("Mouse ScrollWheel")<0) {
	  kamera.GetComponent.<Camera>().orthographicSize++;
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

function Resume () {
	Time.timeScale=1;
}