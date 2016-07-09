#pragma strict
var instantiatepos : Transform;
var bomb : Rigidbody2D;
function Start () {

}

function Update () {
if(Input.GetKeyDown(KeyCode.E)){

Instantiate(bomb,instantiatepos.position, Quaternion.identity);

}
}
