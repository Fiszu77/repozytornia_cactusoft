#pragma strict

var bomb : Rigidbody2D;
var clone : Rigidbody2D;
var power : Transform;

var mouseposx : float;
var mouseposy : float;//pozycja myszki względem postaci
 
function Start () {

}

function Update () {
//if(GetComponent.<SpriteRenderer>().flipX) {
//if(!GetComponent.<SpriteRenderer>().flipX){ 
if(Input.GetKey(KeyCode.LeftShift)){
power.transform.Rotate(Vector3.forward * Time.deltaTime*15);
}
if(Input.GetKey(KeyCode.LeftControl)){
power.transform.Rotate(Vector3.back* Time.deltaTime*15);

}

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
}


}
