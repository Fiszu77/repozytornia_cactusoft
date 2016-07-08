#pragma strict
var top_left : Transform;
var bottom_right : Transform;
var grounded : boolean;
var ground_layers :LayerMask;

function Start () {

}

function FixedUpdate () {
grounded = Physics2D.OverlapArea(top_left.position, bottom_right.position, ground_layers);


	//GetComponent.<Rigidbody2D>().AddForce(Vector2.down*10);
	if(Input.GetKey("a")) {
	 //GetComponent.<Rigidbody2D>().AddForce(Vector2.left*10);
	  if (grounded)
	 transform.Translate(-0.1,0,0*Time.deltaTime);
	 else
	 transform.Translate(-0.25,0,0*Time.deltaTime);

	 GetComponent.<SpriteRenderer>().flipX=false;
	}
	if(Input.GetKey("d")) {
	 //GetComponent.<Rigidbody2D>().AddForce(Vector2.right*10);
	 if (grounded)
	 transform.Translate(0.1,0,0*Time.deltaTime);
	 else
	 transform.Translate(0.25,0,0*Time.deltaTime);

	 GetComponent.<SpriteRenderer>().flipX=true;
	}
	if(Input.GetKeyDown("space") && grounded == true){
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*1100);
	 	/*if(Input.GetKey("d")) 
	 	GetComponent.<Rigidbody2D>().AddForce(Vector2.right*500);
	 	if(Input.GetKey("a")) 
	 	GetComponent.<Rigidbody2D>().AddForce(Vector2.left*500);*/
	}
}
