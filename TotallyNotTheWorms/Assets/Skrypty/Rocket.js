#pragma strict
var atomsCollided:Collider2D[];
var radius:int;

function Boom () {
	atomsCollided=Physics2D.OverlapCircleAll(transform.position,radius);
	for(var i=0;i<atomsCollided.length;i++) {
<<<<<<< HEAD

=======
>>>>>>> 5226fc42a3ee1ae04a0c7227799bb1f74a3dd084
	 if(atomsCollided[i].CompareTag("atom")) {
	  atomsCollided[i].gameObject.SetActive(false);
	 }
	 if(atomsCollided[i].CompareTag("Player")) {
	  var distance=Vector2.Distance(transform.position,atomsCollided[i].transform.position);
	  var damage:float;
	  damage=distance*-10+180;
	  atomsCollided[i].gameObject.GetComponent.<Character>().hp-=damage;
	 }
	}
	Destroy(gameObject);
}

function OnCollisionEnter2D(coll: Collision2D) {
	Boom();

	}