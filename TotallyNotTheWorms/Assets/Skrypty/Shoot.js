#pragma strict
var instantiatepos : Transform;
var bomb : Rigidbody2D;
var clone : Rigidbody2D;

var mouseposx : float;
var mouseposy : float;//pozycja myszki względem postaci
 
function Start () {

}

function Update () {
if(Input.GetKeyDown(KeyCode.E)){

clone= Instantiate(bomb,transform.position, Quaternion.identity);
if(GetComponent.<SpriteRenderer>().flipX) {
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*mouseposx*10);
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*mouseposy*-10);
clone.transform.Translate(3,0,0);
}
if(!GetComponent.<SpriteRenderer>().flipX){ 
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*mouseposx*10);
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*mouseposy*-10);
clone.transform.Translate(-3,0,0);
}
//clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*Shoot.mouseposx*100);
 //clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*Shoot.mouseposy*100);
}

mouseposx = (Screen.width*0.494-Input.mousePosition.x);
mouseposy = (Screen.height*0.6875-Input.mousePosition.y);
}
