#pragma strict

var atomPrefabLeft:GameObject;
var atomPrefabRight:GameObject;
var atomPrefabTop:GameObject;
var atomPrefabBottom:GameObject;

var atomRightTrans:Transform;
var atomLeftTrans:Transform;
var atomTopTrans:Transform;
var atomBottomTrans:Transform;
var groundTrans:Transform;

var x:int;
var i:int;
var h:int;
var n:int;
var dOrNoD:int;
var fOrFh:int;

function Start () {
	h=Random.Range(0,6);
	n=Random.Range(0,2);
	//(poziom -> h.n)
	for (i=0; i<20; i++) {

	for (x=0; x<2; x++) {
	 switch(h) {
	  case 0://Połowa atomu (poziom 0)
	   if(n==0) {//Lewa połowa atomu (poziom 0.0)
	    print("0.0");
	    GenAtomHlfLeft();
	    dOrNoD=Random.Range(0,2);
	    switch(dOrNoD) {//Lecimy w dół czy nie?
	     case 0://Lecimy w dół
	      GenUnder();
	      Down();
	      fOrFh=Random.Range(0,2);
	      switch(fOrFh) {//Następnie 5 czy 4.1?
	       case 0:
		    h=5;
	       break;
	       case 1:
	        h=4;
	        n=0;
	       break;
	      }
	     break;
	     case 1://Nie lecimy w dół
	      GenUnder();
	      Next();
	      h=0;
	      n=1;
	     break;
	    }
	   }
	   if(n==1) {//Prawa połowa atomu (poziom 0.1)
	    print("0.1");
	    GenAtomHlfRight();
	    GenUnder();
	    Next();
		h=Random.Range(0,2);
	    n=0;
	   }
	  break;
	  case 1://Cały 1 atom (poziom 1)
	   print("1");
	   GenAtom();
	   GenUnder();
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
	   if(n==0) {//Cały 1 atom i lewa połowa (poziom 2.0)
	    print("2.0");
	    GenAtom();
	    GenNxtAtomHlfLeft();
	    GenUnder();
	    Next();
	    h=Random.Range(0,3);
	    if(h==0) {
	     n=0;
	    }
	    if(h==2) {
	     n=1;
	    }
	   }
	   if(n==1) {//Cały 1 atom i prawa połowa (poziom 2.1)
	    print("2.1");
	    GenAtom();
	    GenNxtAtomHlfRight();
	    GenUnder();
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
	  case 3://Całe 2 atomy
	   print("3");
	   GenAtom();
	   GenNxtAtom();
	   GenUnder();
	   Next();
	   h=Random.Range(2,5);
	   if(h==2) {
	    n=0;
	   }
	   if(h==4) {
	    n=1;
	   }
	  break;
	  case 4://Całe 2 atomy i lewa połowa
	   if(n==0) {
	    print("4.0");
	    GenAtom();
	    GenNxtAtom();
	    GenNxtAtomHlfLeft();
	    GenUnder();
	    Next();
	    h=Random.Range(2,5);
	    if(h==2) {
	     n=0;
	    }
	    if(h==4) {
	     n=1;
	    }
	   }
	   if(n==1) {//Całe 2 atomy i prawa połowa
	    print("4.1");
	    GenAtom();
	    GenNxtAtom();
	    GenNxtAtomHlfRight();
	    GenUnder();
	    Next();
	    h=Random.Range(4,6);
	    if(h==4) {
	     n=0;
	    }
	   }
	  break;
	  case 5://Całe 3 atomy
	   print("5");
	   GenAtom();
	   GenNxtAtom();
	   GenNxtAtom();
	   GenUnder();
	   Next();
	   h=Random.Range(4,6);
	   if(h==4) {
	    n=0;
	   }
	  break;
	  }
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
	atomRightTrans.localPosition.y+=2.5;
	atomBottomTrans.localPosition.y+=2.5;
	atomLeftTrans.localPosition.y+=2.5;
	atomTopTrans.localPosition.y+=2.5;
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
	atomRightTrans.localPosition.y=0;
	atomLeftTrans.localPosition.y=0;
	atomTopTrans.localPosition.y=0;
	atomBottomTrans.localPosition.y=0;
	groundTrans.position.x+=2.5;
}

function Down () {
	atomRightTrans.localPosition.y=0;
	atomLeftTrans.localPosition.y=0;
	atomTopTrans.localPosition.y=0;
	atomBottomTrans.localPosition.y=0;
	groundTrans.position.y-=7.5;
	groundTrans.position.x+=2.5;
}
function GenUnder () {
	var m:int;
	groundTrans.position.y-=7.5;
	GenAtom();
	for(m=0; m<21; m++) {
	GenNxtAtom();
	}
	groundTrans.position.y+=7.5;
		
}