#pragma strict
var top_left : Transform;
var bottom_right : Transform;

var legs : GameObject[];

var ground_layers :LayerMask;

var cantJumpTimer : float;
var jump2Timer : float;
var speedOfMove : float;
var DblClckTimer:float=0;

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
	if(grounded) {
	 cantJumpTimer+=Time.deltaTime;
	}
	else {
	 cantJumpTimer=0;
	}
//licznik do drugiej części skoku do tyłu
	if(isJump2) {
	 jump2Timer+=Time.deltaTime;
	}
//ruch w lewo i prawo
	if(Input.GetKey(KeyCode.A) && grounded) {
	 GetComponent.<SpriteRenderer>().flipX=false;
	 legs[0].GetComponent.<SpriteRenderer>().flipX=false;
	 legs[1].GetComponent.<SpriteRenderer>().flipX=false;
	 transform.Translate(-speedOfMove,0,0*Time.deltaTime);
	 GetComponent.<Animation>().Play("legs");
	}
	if(Input.GetKey(KeyCode.D) && grounded) {
	 GetComponent.<SpriteRenderer>().flipX=true;
	 legs[0].GetComponent.<SpriteRenderer>().flipX=true;
	 legs[1].GetComponent.<SpriteRenderer>().flipX=true;
	 transform.Translate(speedOfMove,0,0*Time.deltaTime);
	 GetComponent.<Animation>().Play("legs");
	}
	if(Input.anyKey==false) {
	 GetComponent.<Animation>().Stop("legs");
	}
//skok
	if(Input.GetKeyDown(KeyCode.Space) && grounded && cantJumpTimer>=1){
	 DblClckTimer=0;
	 jump=true;
	 cantJumpTimer=0;
	 isJump2=false;
	 jump2Timer=0;
	}
	if(DblClckTimer>0.2) {
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*jumpForceUp);
	 if(!GetComponent.<SpriteRenderer>().flipX) { //jeśli jest odwrócony w lewo to skacz w lewo
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.left*jumpForceSide);
	 }
	 else { //jeśli nie to w prawo
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.right*jumpForceSide);
	 }
	 jump=false;
	 DblClckTimer=0;
	}
	if(Input.GetKeyDown(KeyCode.Space) && DblClckTimer<=0.2 && DblClckTimer>0 && jump==true) {
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*jumpForceUp2);
	 jump=false;
	 DblClckTimer=0;
	 isJump2=true;
	 jump2Timer=0;
	}
	if(!GetComponent.<SpriteRenderer>().flipX) {
	 if(jump2Timer>=0.4 && !grounded) {
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.right *jumpForceSide2);
	  isJump2=false;
	  jump2Timer=0;
	 }
	}
	else {
	 if(jump2Timer>=0.4 && !grounded) {
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.left *jumpForceSide2);
	  isJump2=false;
	  jump2Timer=0;
	 }
	}
	if(jump) {
	 DblClckTimer+=Time.deltaTime;
	}
}


