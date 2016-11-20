#pragma strict

var bomb : Rigidbody2D;
var clone : Rigidbody2D;
var power : Transform;

var mouseposx : float;
var mouseposy : float;//pozycja myszki względem postaci
//var rotationVector = power.transform.rotation.eulerAngles;
function Start () {

}

function Update () {
if(GetComponent.<SpriteRenderer>().flipX) {
  // rotationVector.y = 0;
   //transform.rotation = Quaternion.Euler(rotationVector);
   power.transform.rotation.eulerAngles.y=180;
}
if(!GetComponent.<SpriteRenderer>().flipX){ 
//rotationVector.y = 180;
   //transform.rotation = Quaternion.Euler(rotationVector);
    power.transform.rotation.eulerAngles.y=0;
}

if(Input.GetKey(KeyCode.LeftShift)){
if ((power.transform.eulerAngles.z <360 && power.transform.eulerAngles.z > 280)||(power.transform.eulerAngles.z >0  && power.transform.eulerAngles.z < 95)){
power.transform.Rotate(Vector3.back * Time.deltaTime*15);
}
}
if(Input.GetKey(KeyCode.LeftControl)){
if ((power.transform.eulerAngles.z <360 && power.transform.eulerAngles.z > 275)||(power.transform.eulerAngles.z >0  && power.transform.eulerAngles.z < 90)){
power.transform.Rotate(Vector3.forward* Time.deltaTime*15);
}
}
print(power.transform.eulerAngles.z);

if(Input.GetKeyDown(KeyCode.E)){

clone= Instantiate(bomb,transform.position, Quaternion.identity);
if(GetComponent.<SpriteRenderer>().flipX) {
clone.transform.Translate(3,0,0);
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*((270-power.transform.eulerAngles.z)*30));
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*((360-power.transform.eulerAngles.z)*30));

}
if(!GetComponent.<SpriteRenderer>().flipX){ 
clone.transform.Translate(-3,0,0);
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*((270-power.transform.eulerAngles.z)*-30));
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*((360-power.transform.eulerAngles.z)*30));

}
}


}
