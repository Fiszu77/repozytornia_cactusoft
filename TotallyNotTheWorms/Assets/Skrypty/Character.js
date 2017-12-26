#pragma strict

var inv:GameObject;
var menu:GameObject;
var aiming:GameObject[];
var kamera:GameObject;
var hat:GameObject;
var tekstura:GameObject;
var head:GameObject;
var charName:UnityEngine.UI.Text;
private var clone:GameObject;

var hats:Sprite[];
var teamColors:Color32[];
var names:String[];

var hp:float=100;
var c:int;
var team:int;
var player:int;

var myTurn:boolean;

var hpSlider:UnityEngine.UI.Slider;
var hpColor:UnityEngine.UI.Image;

var mowa:AudioClip[];

var str:float;

function Start() {
str=Time.time;
//losowanie kapelusza
	var h=Random.Range(0,3);
	hat.GetComponent.<SpriteRenderer>().sprite=hats[h];
//losowanie imienia
	charName.color=teamColors[team];
	h=Random.Range(0,10);
	charName.text=names[h];
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
	  kamera.GetComponent.<Camera>().orthographicSize-=5;
	 }
	 if(Input.GetAxis("Mouse ScrollWheel")<0) {
	  kamera.GetComponent.<Camera>().orthographicSize+=5;
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
	if(hp<=0) {
	 hp=0;
	}
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
//śmierć
	if(hp<=0) {
	 clone=Instantiate(head, transform.position, Quaternion.identity);
	 clone.GetComponent.<Rigidbody2D>().isKinematic=false;
	 clone.GetComponent.<CircleCollider2D>().enabled=true;
	 clone.GetComponent.<Bomb>().enabled=true;
	 gameObject.SetActive(false);
	}
}
//wybór broni
function W0 () {
	tekstura.GetComponent.<Shoot>().weapon=0;
	Armed();
}

function W1 () {
	tekstura.GetComponent.<Shoot>().weapon=1;
	Armed();
}

function W2 () {
	tekstura.GetComponent.<Shoot>().weapon=2;
	Armed();
}

function W3 () {
	tekstura.GetComponent.<Shoot>().weapon=3;
	Armed();
}
function W4 () {
	tekstura.GetComponent.<Shoot>().weapon=4;
	Armed();
}
function W5 () {
	tekstura.GetComponent.<Shoot>().weapon=5;
	Armed();
}
//uzbrojony (broń została wybrana)
function Armed () {
	if(myTurn) {
	 tekstura.GetComponent.<Shoot>().isArmed=true;
	 tekstura.GetComponent.<Shoot>().head.transform.localRotation=Quaternion.Euler(0,0,30);
	 aiming[0].SetActive(true);
	 aiming[1].SetActive(true);
	 inv.SetActive(false);
	 tekstura.GetComponent.<Animation>().Stop("idleL");
	 tekstura.GetComponent.<Animation>().Stop("idleR");
	 var a:int=Random.Range(0,1);
	 gameObject.GetComponent.<AudioSource>().clip=mowa[a];
	 gameObject.GetComponent.<AudioSource>().Play();
	}
}