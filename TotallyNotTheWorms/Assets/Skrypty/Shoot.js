#pragma strict
var instantiatepos : Transform;
var bomb : Rigidbody2D;

var mouseposx : float;
var mouseposy : float;//pozycja myszki względem postaci
 
function Start () {

}

function Update () {
if(Input.GetKeyDown(KeyCode.E)){

Instantiate(bomb,instantiatepos.position, Quaternion.identity);

}

mouseposx = (Screen.width*0.494-Input.mousePosition.x);
mouseposy = (Screen.height*0.6875-Input.mousePosition.y);
}
