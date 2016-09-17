#pragma strict

var atomPrefabLeft:GameObject;
var atomPrefabRight:GameObject;
var atomPrefabTop:GameObject;
var atomPrefabBottom:GameObject;

var atomRightTrans:Transform;
var atomLeftTrans:Transform;
var atomTopTrans:Transform;
var atomBottomTrans:Transform;

var x:int;

function Start () {
	for(var y:int=0; y<=50; y++) {
	 for(x=0; x<=100; x++) {
	  Instantiate(atomPrefabLeft,atomRightTrans.position,atomRightTrans.rotation);
	  Instantiate(atomPrefabRight,atomLeftTrans.position,atomLeftTrans.rotation);
	  Instantiate(atomPrefabTop,atomTopTrans.position,atomTopTrans.rotation);
	  Instantiate(atomPrefabBottom,atomBottomTrans.position,atomBottomTrans.rotation);

	  atomRightTrans.position.x+=1.25;
	  atomLeftTrans.position.x+=1.25;
	  atomTopTrans.position.x+=1.25;
	  atomBottomTrans.position.x+=1.25;
	 }
	 atomRightTrans.position.y-=1.25;
	 atomLeftTrans.position.y-=1.25;
	 atomTopTrans.position.y-=1.25;
	 atomBottomTrans.position.y-=1.25;
	 atomRightTrans.position.x=0;
	 atomLeftTrans.position.x=0;
	 atomTopTrans.position.x=0;
	 atomBottomTrans.position.x=0;
	}
}

function Update () {
	
}