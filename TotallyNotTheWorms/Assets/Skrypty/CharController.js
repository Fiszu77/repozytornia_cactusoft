#pragma strict
var top_left : Transform;
var bottom_right : Transform;

var ground_layers :LayerMask;

var cantJumpTimer : float;
var jump2Timer : float;
var speedOfMove : float;

var jumpForceUp : int;
var jumpForceSide : int;
var jumpForceUp2 : int;
var jumpForceSide2 : int;

var grounded : boolean;
var isJump2 : boolean;

var pointsArray:Vector2[];

function Start () {
	GetComponent.<EdgeCollider2D>().points=pointsArray;
}

function FixedUpdate () {
	grounded = Physics2D.OverlapArea(top_left.position, bottom_right.position, ground_layers);
	if(grounded) {
	 cantJumpTimer+=Time.deltaTime;
	}
	else {
	 cantJumpTimer=0;
	}
	if(isJump2) {
	 jump2Timer+=Time.deltaTime;
	}
	if(Input.GetKey(KeyCode.A) && grounded) {
	 GetComponent.<SpriteRenderer>().flipX=false;
	 //GetComponent.<Rigidbody2D>().AddForce(Vector2.left*10);
	 transform.Translate(-speedOfMove,0,0*Time.deltaTime);
	}
	if(Input.GetKey(KeyCode.D) && grounded) {
	 GetComponent.<SpriteRenderer>().flipX=true;
	 //GetComponent.<Rigidbody2D>().AddForce(Vector2.right*10);
	 transform.Translate(speedOfMove,0,0*Time.deltaTime);
	}
	if(Input.GetKeyDown(KeyCode.Space) && grounded && cantJumpTimer>=1){
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*jumpForceUp);
	 cantJumpTimer=0;
	 isJump2=false;
	 jump2Timer=0;
	 if(!GetComponent.<SpriteRenderer>().flipX) {
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.left*jumpForceSide);
	 }
	 else {
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.right*jumpForceSide);
	 }
	}
	if(Input.GetKeyDown(KeyCode.LeftShift) && grounded && cantJumpTimer>=1) {
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*jumpForceUp2);
	 isJump2=true;
	 jump2Timer=0;
	}
	if(!GetComponent.<SpriteRenderer>().flipX) {
	 if(jump2Timer>=0.4 && !grounded) {
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.right *jumpForceSide2);
	  jump2Timer=0;
	 }
	}
	else {
	 if(jump2Timer>=0.4 && !grounded) {
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.left *jumpForceSide2);
	  jump2Timer=0;
	 }
	}
}


