#pragma strict

var timer:float;

function Start () {

}

function Update () {
	timer+=Time.deltaTime;
}

function OnTriggerStay2D (other:Collider2D) {
	if(other.CompareTag("atom")) {
	 if(timer>=5) {
	  other.gameObject.SetActive (false);
	  Destroy(gameObject);
	  print("coll");
	 }
	}
}