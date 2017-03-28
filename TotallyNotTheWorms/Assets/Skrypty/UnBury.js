#pragma strict

var chara:GameObject;

//wygrzebywanie się z ziemi
function OnTriggerStay2D (other:Collider2D) {
	if(other.CompareTag("atom")) {
	 chara.GetComponent.<Transform>().position.y+=1;
	}
}