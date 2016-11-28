function OnTriggerStay2D (other:Collider2D) {
	 if(other.CompareTag("atom")) {
	  other.gameObject.SetActive (false);
	 }
	 Destroy(gameObject);
}