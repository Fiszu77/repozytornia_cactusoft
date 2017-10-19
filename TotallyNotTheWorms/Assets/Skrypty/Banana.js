
#pragma strict

var timer:float;
var atomsCollided:Collider2D[];
var expl:GameObject;
var radius:int;
var bombType:int;
var smallban : Rigidbody2D; // małe banany
var force : float;

function Update () {
	timer+=Time.deltaTime;
	if(timer>=5) {
	 Boom();
	 timer=0;
	}
}

function Boom () {
	atomsCollided=Physics2D.OverlapCircleAll(transform.position,radius);
	var clone : Rigidbody2D;
	clone = Instantiate(smallban, transform.position, Quaternion.identity);
	clone.AddForce(Vector2(1.5,1.8)*force);
	clone = Instantiate(smallban, transform.position, Quaternion.identity);
	clone.AddForce(Vector2(1,1)*force);
	clone = Instantiate(smallban, transform.position, Quaternion.identity);
	clone.AddForce(Vector2(0,1.5)*force);
	clone = Instantiate(smallban, transform.position, Quaternion.identity);
	clone.AddForce(Vector2(-1,1)*force);
	clone = Instantiate(smallban, transform.position, Quaternion.identity);
	clone.AddForce(Vector2(-1.5,1.8)*force);


	for(var i=0;i<atomsCollided.length;i++) {
	 if(atomsCollided[i].CompareTag("atom")) {
	  atomsCollided[i].gameObject.SetActive(false);
	 }
	 if(atomsCollided[i].CompareTag("Player")) {
	  var distance=Vector2.Distance(transform.position,atomsCollided[i].transform.position);
	  var damage:float;
	  var knockback:float;
	  switch(bombType) {
	   case 0://zwykła
	    damage=distance*-11.42+179.88;
	    atomsCollided[i].gameObject.GetComponent.<Character>().hp-=damage;
	    knockback=distance*5+75;
	    atomsCollided[i].gameObject.GetComponent.<Rigidbody2D>().AddForce(gameObject.transform.position-atomsCollided[i].gameObject.transform.position*knockback);
	   break;
	   case 1://szojda
	    damage=distance*-5.17+164.76;
	    atomsCollided[i].gameObject.GetComponent.<Character>().hp-=damage;
	    knockback=distance*7+100;
	    atomsCollided[i].gameObject.GetComponent.<Rigidbody2D>().AddForce(gameObject.transform.position-atomsCollided[i].gameObject.transform.position*knockback);
	   break;
	  }
	 }
	}
	Instantiate(expl,transform.position,Quaternion.identity);
	Destroy(gameObject);
}


