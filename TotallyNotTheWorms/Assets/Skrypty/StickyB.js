#pragma strict
var timer:float;
var atomsCollided:Collider2D[];
var expl:GameObject;
var radius:int;

function Update () {
	timer+=Time.deltaTime;
	if(timer>=3) {
	 Boom();
	 timer=0;
	}
}

function Boom () {
	atomsCollided=Physics2D.OverlapCircleAll(transform.position,radius);
	for(var i=0;i<atomsCollided.length;i++) {
	 if(atomsCollided[i].CompareTag("atom")) {
	  atomsCollided[i].gameObject.SetActive(false);
	 }
	 if(atomsCollided[i].CompareTag("Player")) {
	  var distance=Vector2.Distance(transform.position,atomsCollided[i].transform.position);
	  var damage:float;
	  var knockback:float;
	  damage=distance*-10+180;
	  atomsCollided[i].gameObject.GetComponent.<Character>().hp-=damage;
	  knockback=distance*radius*0.1+75;
	  atomsCollided[i].gameObject.GetComponent.<Rigidbody2D>().AddForce(gameObject.transform.position-atomsCollided[i].gameObject.transform.position*knockback);
	 }
	}
	Instantiate(expl,transform.position,Quaternion.identity);
	Destroy(gameObject);
}

function OnCollisionEnter2D(coll: Collision2D) {
	GetComponent.<Rigidbody2D>().constraints = RigidbodyConstraints2D.FreezeAll; 
}