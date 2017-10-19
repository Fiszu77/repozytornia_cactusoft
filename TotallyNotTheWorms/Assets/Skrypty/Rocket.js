#pragma strict
var atomsCollided:Collider2D[];
var radius:int;
   
function Update () {

var angle : float = Mathf.Atan2(GetComponent.<Rigidbody2D>().velocity.y, GetComponent.<Rigidbody2D>().velocity.x) * Mathf.Rad2Deg;
print(angle);
transform.eulerAngles.z= (angle+180);
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
	  knockback=distance*5+75;
	  atomsCollided[i].gameObject.GetComponent.<Rigidbody2D>().AddForce(gameObject.transform.position-atomsCollided[i].gameObject.transform.position*knockback);
	 }
	}
	Destroy(gameObject);
}

function OnCollisionEnter2D(coll: Collision2D) {
	Boom();

	}