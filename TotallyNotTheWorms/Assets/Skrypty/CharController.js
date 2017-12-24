#pragma strict
var top_left : Transform;
var bottom_right : Transform;

var legs : GameObject[];
var armTex : GameObject;
var arm : GameObject;
var crosshair : GameObject;
var pwr : GameObject;
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

static var grounded : boolean;
var isJump2 : boolean;
var jump : boolean=false;

function FixedUpdate () {
//co oznacza "grounded"
	grounded = Physics2D.OverlapArea(top_left.position, bottom_right.position, ground_layers);
//niemożność skakania przez 1 sekundę
	backJumpT+=Time.deltaTime;
	if(grounded) {
	 cantJumpTimer+=Time.deltaTime;
	 tekstura.GetComponent.<Animation>().Stop("jumpl");
	 tekstura.GetComponent.<Animation>().Stop("jumpr");
	 tekstura.transform.eulerAngles.z=-360;
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
	 tekstura.GetComponent.<Transform>().eulerAngles.y=0;
	 crosshair.GetComponent.<Transform>().localPosition.x=-1.4;
	 pwr.GetComponent.<RectTransform>().localPosition.x=-5;
	//fizyczny ruch
	 transform.Translate(-speedOfMove,0,0*Time.deltaTime);
	//animacje
	 
	 tekstura.GetComponent.<Animation>().Play("legs");
	 if(!tekstura.GetComponent.<Shoot>().isArmed) {
	  arm.GetComponent.<Animation>().Stop("jumpArm");
	  arm.transform.eulerAngles.z=20;
	 }
	}

	if(Input.GetKey(KeyCode.D) && grounded &&backJumpT>0.9) {
	 tekstura.GetComponent.<Transform>().eulerAngles.y=180;
	 crosshair.GetComponent.<Transform>().localPosition.x=1.4;
	 pwr.GetComponent.<RectTransform>().localPosition.x=5;
	 transform.Translate(speedOfMove,0,0*Time.deltaTime);
	 tekstura.GetComponent.<Animation>().Play("legs");
	 if(!tekstura.GetComponent.<Shoot>().isArmed) {
	  arm.GetComponent.<Animation>().Stop("jumpArm");
	  arm.transform.eulerAngles.z=20;
	 }
	}
	if(!Input.GetKey(KeyCode.A) && !Input.GetKey(KeyCode.D) || !gameObject.GetComponent.<Character>().myTurn) {
	 tekstura.GetComponent.<Animation>().Stop("legs");
	 if(!tekstura.GetComponent.<Shoot>().isArmed) {
	  if(cantJumpTimer>=1 && tekstura.transform.rotation.eulerAngles.y==180){
	   tekstura.GetComponent.<Animation>().Play("idleL");
	  }
	  if(cantJumpTimer>=1 && tekstura.transform.rotation.eulerAngles.y==0){
	   tekstura.GetComponent.<Animation>().Play("idleL");
	  }
	 }
	}
//skok
	if(Input.GetKeyDown(KeyCode.Space) && grounded && cantJumpTimer>=1){
	 jump=true;
	 cantJumpTimer=0;
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*jumpForceUp);

	 if(tekstura.transform.rotation.eulerAngles.y==0) { //jeśli jest odwrócony w prawo to skacz w prawo
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.left*jumpForceSide);
	  arm.GetComponent.<Animation>().Play("jumpArm");
	 }
	 if(tekstura.transform.rotation.eulerAngles.y==180) { //jeśli nie to w lewo
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.right*jumpForceSide);
	  arm.GetComponent.<Animation>().Play("jumpArm");
	 }
	}
//skok do tyłu
	if(Input.GetKeyDown(KeyCode.LeftAlt) && grounded && cantJumpTimer>=1) {
	 jump=true;
	 cantJumpTimer=0;
	 isJump2=true;
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*jumpForceUp2);//najpierw w górę
	 arm.GetComponent.<Animation>().Play("jumpArm");
	}

	 if(jumpTimer>=0.8) {
	  if(tekstura.transform.rotation.eulerAngles.y==0) { //następnie jeśli jest odwrócony w lewo to skacz w prawo
	   GetComponent.<Rigidbody2D>().AddForce(Vector2.right*jumpForceSide2);
	   jumpTimer=0;
	   isJump2=false;
	   tekstura.GetComponent.<Animation>().Play("jumpl");
	   backJumpT=0;
	  }
	  if(tekstura.transform.rotation.eulerAngles.y==180) { //jeśli nie to w lewo
	   GetComponent.<Rigidbody2D>().AddForce(Vector2.left*jumpForceSide2);
	   jumpTimer=0;
	   isJump2=false;
	   tekstura.GetComponent.<Animation>().Play("jumpr");
	   backJumpT=0;
	  }
	}
}




