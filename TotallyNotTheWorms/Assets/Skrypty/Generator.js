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
var h:int;
var n:int;

function Start () {
	h=Random.Range(0,6);
	n=Random.Range(0,2);
	for (x=0; x<30; x++) {
	 switch(h) {
	  case 0://
	   if(n==0) {
	    print("0.0");
	    GenAtomHlfLeft();
	    Next();
		h=0;
	    n=1;
	   }
	   if(n==1) {
	    print("0.1");
	    GenAtomHlfRight();
	    Next();
		h=Random.Range(0,2);
	    n=0;
	   }
	  break;
	  case 1:
	   print("1");
	   GenAtom();
	   Next();
	   h=Random.Range(0,3);
	   if(h==0) {
	    n=0;
	   }
	   if(h==2) {
	    n=1;
	   }
	  break;
	  case 2:
	   if(n==0) {
	    print("2.0");
	    GenAtom();
	    GenNxtAtomHlfLeft();
	    Next();
	    h=Random.Range(0,3);
	    if(h==0) {
	     n=0;
	    }
	    if(h==2) {
	     n=1;
	    }
	   }
	   if(n==1) {
	    print("2.1");
	    GenAtom();
	    GenNxtAtomHlfRight();
	    Next();
	    h=Random.Range(2,5);
	    if(h==2) {
	     n=0;
	    }
	    if(h==4) {
	     n=1;
	    }
	   }
	  break;
	  case 3:
	   print("3");
	   GenAtom();
	   GenNxtAtom();
	   Next();
	   h=Random.Range(2,5);
	   if(h==2) {
	    n=0;
	   }
	   if(h==4) {
	    n=1;
	   }
	  break;
	  case 4:
	   if(n==0) {
	    print("4.0");
	    GenAtom();
	    GenNxtAtom();
	    GenNxtAtomHlfLeft();
	    Next();
	    h=Random.Range(2,5);
	    if(h==2) {
	     n=0;
	    }
	    if(h==4) {
	     n=1;
	    }
	   }
	   if(n==1) {
	    print("4.1");
	    GenAtom();
	    GenNxtAtom();
	    GenNxtAtomHlfRight();
	    Next();
	    h=Random.Range(4,6);
	    if(h==4) {
	     n=0;
	    }
	   }
	  break;
	  case 5:
	   print("5");
	   GenAtom();
	   GenNxtAtom();
	   GenNxtAtom();
	   Next();
	   h=Random.Range(4,6);
	   if(h==4) {
	    n=0;
	   }
	  break;
	 }
	}
}
//klasy
function GenAtom () {
	Instantiate(atomPrefabLeft,atomRightTrans.position,atomRightTrans.rotation);
    Instantiate(atomPrefabBottom,atomBottomTrans.position,atomBottomTrans.rotation);
	Instantiate(atomPrefabRight,atomLeftTrans.position,atomLeftTrans.rotation);
	Instantiate(atomPrefabTop,atomTopTrans.position,atomTopTrans.rotation);
}

function GenNxtAtom () {
	atomRightTrans.position.y+=2.5;
	atomBottomTrans.position.y+=2.5;
	atomLeftTrans.position.y+=2.5;
	atomTopTrans.position.y+=2.5;
	Instantiate(atomPrefabLeft,atomRightTrans.position,atomRightTrans.rotation);
	Instantiate(atomPrefabBottom,atomBottomTrans.position,atomBottomTrans.rotation);
	Instantiate(atomPrefabRight,atomLeftTrans.position,atomLeftTrans.rotation);
	Instantiate(atomPrefabTop,atomTopTrans.position,atomTopTrans.rotation);
}

function GenAtomHlfLeft () {
	Instantiate(atomPrefabRight,atomLeftTrans.position,atomLeftTrans.rotation);
	Instantiate(atomPrefabBottom,atomBottomTrans.position,atomBottomTrans.rotation);
}

function GenAtomHlfRight () {
	Instantiate(atomPrefabLeft,atomRightTrans.position,atomRightTrans.rotation);
	Instantiate(atomPrefabBottom,atomBottomTrans.position,atomBottomTrans.rotation);
}

function GenNxtAtomHlfLeft () {
	atomLeftTrans.position.y+=2.5;
	atomBottomTrans.position.y+=2.5;
	Instantiate(atomPrefabRight,atomLeftTrans.position,atomLeftTrans.rotation);
	Instantiate(atomPrefabBottom,atomBottomTrans.position,atomBottomTrans.rotation);
}

function GenNxtAtomHlfRight () {
	atomRightTrans.position.y+=2.5;
	atomBottomTrans.position.y+=2.5;
	Instantiate(atomPrefabLeft,atomRightTrans.position,atomRightTrans.rotation);
	Instantiate(atomPrefabBottom,atomBottomTrans.position,atomBottomTrans.rotation);
}

function Next () {
	atomRightTrans.position.x+=2.5;
	atomLeftTrans.position.x+=2.5;
	atomTopTrans.position.x+=2.5;
	atomBottomTrans.position.x+=2.5;
	atomRightTrans.position.y=0;
	atomLeftTrans.position.y=0;
	atomTopTrans.position.y=0;
	atomBottomTrans.position.y=0;
}