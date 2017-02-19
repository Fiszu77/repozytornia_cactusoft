#pragma strict

var timer:float;
var distance:float;
var character : GameObject;
function Start () {
character = GameObject.Find("Character");
}

function Update () {
	timer+=Time.deltaTime;
}

function OnTriggerStay2D (other:Collider2D) {
	if(timer>=5) {
	 if(other.CompareTag("atom")) {
	  other.gameObject.SetActive (false);
	  print("coll");
	 }
	 distance = Vector2.Distance(transform.position, character.transform.position);
	 print(distance);
	 Destroy(gameObject);
	}
}

function OnTriggerEnter2D (other:Collider2D) {
	if(timer>=5) {
	 if(other.CompareTag("atom")) {
	  other.gameObject.SetActive (false);
	  print("coll");
	 }
	 Destroy(gameObject);
	}
}