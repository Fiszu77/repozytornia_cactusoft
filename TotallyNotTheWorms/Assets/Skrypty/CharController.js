#pragma strict


function Start () {

}

function Update () {
	//GetComponent.<Rigidbody2D>().AddForce(Vector2.down*10);
	if(Input.GetKey("a")) {
	 //GetComponent.<Rigidbody2D>().AddForce(Vector2.left*10);
	 transform.Translate(-0.1,0,0*Time.deltaTime);
	 GetComponent.<SpriteRenderer>().flipX=false;
	}
	if(Input.GetKey("d")) {
	 //GetComponent.<Rigidbody2D>().AddForce(Vector2.right*10);
	 transform.Translate(0.1,0,0*Time.deltaTime);
	 GetComponent.<SpriteRenderer>().flipX=true;
	}
	if(Input.GetKeyDown("space")) {
	 GetComponent.<Rigidbody2D>().AddForce(Vector2.up*10000);
	}
}