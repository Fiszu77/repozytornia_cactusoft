#pragma strict

var timer:float;

function Start () {

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