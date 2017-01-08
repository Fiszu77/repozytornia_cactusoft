#pragma strict

var bomb : Rigidbody2D;
var clone : Rigidbody2D;
var power : Transform;//celownik
var timer : float;//czas trzymania-siła
var mouseposx : float;
var mouseposy : float;//pozycja myszki względem postaci
var mn : int;//mnożnik siły
function Start () {
mn=30;
timer=0;
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
power.transform.Rotate(Vector3.back * Time.deltaTime*50);
}
}
if(Input.GetKey(KeyCode.LeftControl)){
if ((power.transform.eulerAngles.z <360 && power.transform.eulerAngles.z > 275)||(power.transform.eulerAngles.z >0  && power.transform.eulerAngles.z < 90)){
power.transform.Rotate(Vector3.forward* Time.deltaTime*50);
}
}
//print(power.transform.eulerAngles.z);

if(Input.GetKey(KeyCode.E)){
timer +=Time.deltaTime*0.5;
print(timer);

}
 if (Input.GetKeyUp(KeyCode.E) && CharController.grounded)
 {

clone= Instantiate(bomb,transform.position, Quaternion.identity);
if(GetComponent.<SpriteRenderer>().flipX) {

if (power.transform.eulerAngles.z <360 && power.transform.eulerAngles.z > 275){
clone.transform.Translate(3,1.3,0);
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*((270-power.transform.eulerAngles.z)*mn*timer));
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*((360-power.transform.eulerAngles.z)*mn*timer));
}
if (power.transform.eulerAngles.z >0  && power.transform.eulerAngles.z < 95){
clone.transform.Translate(3,-1.3,0);
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*((90-power.transform.eulerAngles.z)*-mn*timer));
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*((0-power.transform.eulerAngles.z)*mn*timer));
}
}
if(!GetComponent.<SpriteRenderer>().flipX){ 

if (power.transform.eulerAngles.z <360 && power.transform.eulerAngles.z > 275){
clone.transform.Translate(-3,1.3,0);
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*((270-power.transform.eulerAngles.z)*-mn*timer));
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*((360-power.transform.eulerAngles.z)*mn*timer));
}
if (power.transform.eulerAngles.z >0  && power.transform.eulerAngles.z < 95){
clone.transform.Translate(-3,-1.3,0);
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*((90-power.transform.eulerAngles.z)*mn*timer));
clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*((0-power.transform.eulerAngles.z)*mn*timer));
}
}
timer=0;
}


}
