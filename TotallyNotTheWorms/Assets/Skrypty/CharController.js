#pragma strict
var top_left : Transform;
var bottom_right : Transform;

var legs : GameObject[];
var tekstura : GameObject;

var ground_layers :LayerMask;

var cantJumpTimer : float;
var speedOfMove : float;
var jumpTimer : float;
var backJumpT : float;

var jumpForceUp : int;
var jumpForceSide : int;
var jumpForceUp2 : int;
var jumpForceSide2 : int;

var grounded : boolean;
var isJump2 : boolean;
var jump : boolean=false;

var pointsArray:Vector2[];

function Start () {
	GetComponent.<EdgeCollider2D>().points=pointsArray;
}

function FixedUpdate () {
//co oznacza "grounded"
	grounded = Physics2D.OverlapArea(top_left.position, bottom_right.position, ground_layers);
//niemożność skakania przez 1 sekundę
	backJumpT+=Time.deltaTime;
	if(grounded) {
	 cantJumpTimer+=Time.deltaTime;
	}
	else {
	 cantJumpTimer=0;
	}
//licznik skoku do tyłu
	if(isJump2==true) {
	 jumpTimer+=Time.deltaTime;
	}
//ruch w lewo i prawo
	if(Input.GetKey(KeyCode.A) && grounded &&backJumpT>0.9) {
	 tekstura.GetComponent.<SpriteRenderer>().flipX=false;
	 legs[0].GetComponent.<SpriteRenderer>().flipX=false;
	 legs[1].GetComponent.<SpriteRenderer>().flipX=false;
	 transform.Translate(-speedOfMove,0,0*Time.deltaTime);
	 tekstura.GetComponent.<Animation>().Play("legs");
	}
	if(Input.GetKey(KeyCode.D) && grounded &&backJumpT>0.9) {
	 tekstura.GetComponent.<SpriteRenderer>().flipX=true;
	 legs[0].GetComponent.<SpriteRenderer>().flipX=true;
	 legs[1].GetComponent.<SpriteRenderer>().flipX=true;
	 transform.Translate(speedOfMove,0,0*Time.deltaTime);
	 tekstura.GetComponent.<Animation>().Play("legs");
	}
	if(Input.anyKey==false) {
	 tekstura.GetComponent.<Animation>().Stop("legs");
	}
//skok
	if(Input.GetKeyDown(KeyCode.Space) && grounded && cantJumpTimer>=1){
	 jump=true;
	 cantJumpTimer=0;
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*jumpForceUp);
	 if(!tekstura.GetComponent.<SpriteRenderer>().flipX) { //jeśli jest odwrócony w lewo to skacz w lewo
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.left*jumpForceSide);
	 }
	 else { //jeśli nie to w prawo
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.right*jumpForceSide);
	 }
	}
	if(Input.GetKeyDown(KeyCode.LeftAlt) && grounded && cantJumpTimer>=1) {
	 jump=true;
	 cantJumpTimer=0;
	 isJump2=true;
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*jumpForceUp2);
	}
	 if(jumpTimer>=0.8) {
	  if(!tekstura.GetComponent.<SpriteRenderer>().flipX) { //jeśli jest odwrócony w lewo to skacz w prawo
	   GetComponent.<Rigidbody2D>().AddForce(Vector2.right*jumpForceSide2);
	   jumpTimer=0;
	   isJump2=false;
	   tekstura.GetComponent.<Animation>().Play("jumpr");
	   backJumpT=0;
	  }
	  else { //jeśli nie to w lewo
	   GetComponent.<Rigidbody2D>().AddForce(Vector2.left*jumpForceSide2);
	   jumpTimer=0;
	   isJump2=false;
	   tekstura.GetComponent.<Animation>().Play("jumpl");
	   backJumpT=0;
	  }
	}
}

//wygrzebywanie się z ziemi
function OnTriggerStay2D (other:Collider2D) {
	if(other.CompareTag("atom")) {
	 GetComponent.<Transform>().position.y+=1;
	}
}


