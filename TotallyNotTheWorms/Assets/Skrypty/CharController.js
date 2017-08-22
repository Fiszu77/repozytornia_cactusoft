#pragma strict
var top_left : Transform;
var bottom_right : Transform;

var legs : GameObject[];
var armTex : GameObject;
var arm : GameObject;
var crosshair : GameObject;
var pwr : GameObject;
var tekstura : GameObject;
var head : GameObject;

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
	//dostsowywanie elementów ciała nieświszczuka do kierunku ruchu
	 tekstura.GetComponent.<SpriteRenderer>().flipX=false;
	 legs[0].GetComponent.<SpriteRenderer>().flipX=false;
	 legs[1].GetComponent.<SpriteRenderer>().flipX=false;
	 head.GetComponent.<Transform>().localPosition.x=-0.65;
	 arm.GetComponent.<Transform>().localPosition.x=-1.4;
	 crosshair.GetComponent.<Transform>().localPosition.x=-1.4;
	 pwr.GetComponent.<RectTransform>().localPosition.x=-5;
	 legs[0].GetComponent.<Transform>().localPosition.x=-0.5;
	 legs[1].GetComponent.<Transform>().localPosition.x=-0.5;
	//fizyczny ruch
	 transform.Translate(-speedOfMove,0,0*Time.deltaTime);
	//animacje
	 tekstura.GetComponent.<Animation>().Play("legs");
	 if(!Shoot.isArmed) {
	  arm.GetComponent.<Animation>().Stop("jumpArmR");
	  arm.transform.eulerAngles.z=20;
	 }
	}

	if(Input.GetKey(KeyCode.D) && grounded &&backJumpT>0.9) {
	 tekstura.GetComponent.<SpriteRenderer>().flipX=true;
	 legs[0].GetComponent.<SpriteRenderer>().flipX=true;
	 legs[1].GetComponent.<SpriteRenderer>().flipX=true;
	 head.GetComponent.<Transform>().localPosition.x=0.65;
	 arm.GetComponent.<Transform>().localPosition.x=1.4;
	 crosshair.GetComponent.<Transform>().localPosition.x=1.4;
	 pwr.GetComponent.<RectTransform>().localPosition.x=5;
	 legs[0].GetComponent.<Transform>().localPosition.x=0.5;
	 legs[1].GetComponent.<Transform>().localPosition.x=0.5;
	 transform.Translate(speedOfMove,0,0*Time.deltaTime);
	 tekstura.GetComponent.<Animation>().Play("legs");
	 if(!Shoot.isArmed) {
	  arm.GetComponent.<Animation>().Stop("jumpArm");
	  arm.transform.eulerAngles.z=20;
	 }
	}
	if(Input.anyKey==false) {
	 tekstura.GetComponent.<Animation>().Stop("legs");
	 if(Shoot.isArmed==false) {
	  if(cantJumpTimer>=1 && tekstura.GetComponent.<SpriteRenderer>().flipX==false){
	   tekstura.GetComponent.<Animation>().Play("idleL");
	  }
	  if(cantJumpTimer>=1 && tekstura.GetComponent.<SpriteRenderer>().flipX==true){
	   tekstura.GetComponent.<Animation>().Play("idleR");
	  }
	 }
	}
//skok
	if(Input.GetKeyDown(KeyCode.Space) && grounded && cantJumpTimer>=1){
	 jump=true;
	 cantJumpTimer=0;
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*jumpForceUp);

	 if(!tekstura.GetComponent.<SpriteRenderer>().flipX) { //jeśli jest odwrócony w lewo to skacz w lewo
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.left*jumpForceSide);
	  arm.GetComponent.<Animation>().Play("jumpArm");
	 }
	 else { //jeśli nie to w prawo
	  GetComponent.<Rigidbody2D>().AddForce(Vector2.right*jumpForceSide);
	  arm.GetComponent.<Animation>().Play("jumpArmR");
	 }
	}
//skok do tyłu
	if(Input.GetKeyDown(KeyCode.LeftAlt) && grounded && cantJumpTimer>=1) {
	 jump=true;
	 cantJumpTimer=0;
	 isJump2=true;
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*jumpForceUp2);//najpierw w górę
	 if(!tekstura.GetComponent.<SpriteRenderer>().flipX) {
	  arm.GetComponent.<Animation>().Play("jumpArm");
	 }
	 else {
	  arm.GetComponent.<Animation>().Play("jumpArmR");
	 }
	}

	 if(jumpTimer>=0.8) {
	  if(!tekstura.GetComponent.<SpriteRenderer>().flipX) { //następnie jeśli jest odwrócony w lewo to skacz w prawo
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




