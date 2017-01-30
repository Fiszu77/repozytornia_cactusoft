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
function OnCollisionEnter2D(coll: Collision2D) {

GetComponent.<Rigidbody2D>().constraints = RigidbodyConstraints2D.FreezeAll; 
}