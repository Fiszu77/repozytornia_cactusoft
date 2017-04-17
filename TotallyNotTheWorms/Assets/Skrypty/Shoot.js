#pragma strict

//var bomb : Rigidbody2D;
var clone : Rigidbody2D;
var power : GameObject;//celownik
var arm : Transform;//Ręka
var pwr : RectTransform;//Wskaźnik siła
var pwrFill : UnityEngine.UI.Slider;//fill wskaźnika
var timer : float;//czas trzymania-siła
var weapRend : GameObject;

static var isArmed : boolean;//czy broń jest wyciągnięta?
static var weapon : int;//numer broni
class Weapons{
var name : String;
var mn : int;//mnożnik siły
var slider : boolean;//czy slider ma być
var weap : Rigidbody2D;// obiekt do pojawienia jako broń
var weapTex : Sprite;//tekstura broni w łapce
};
var tab : Weapons[];

function Update () {
if(GetComponent.<SpriteRenderer>().flipX) {
  // rotationVector.y = 0;
   //transform.rotation = Quaternion.Euler(rotationVector);
   power.transform.rotation.eulerAngles.y=180;
   arm.transform.rotation.eulerAngles.y=180;
   pwr.transform.rotation.eulerAngles.y=180;
}
if(!GetComponent.<SpriteRenderer>().flipX) {
//rotationVector.y = 180;
   //transform.rotation = Quaternion.Euler(rotationVector);
    power.transform.rotation.eulerAngles.y=0;
    arm.transform.rotation.eulerAngles.y=0;
    pwr.transform.rotation.eulerAngles.y=0;
}

if(isArmed) {
 weapRend.SetActive(true);
 weapRend.GetComponent.<SpriteRenderer>().sprite=tab[weapon].weapTex;
if(Input.GetKey(KeyCode.LeftShift)){
 if ((power.transform.eulerAngles.z <360 && power.transform.eulerAngles.z > 280)||(power.transform.eulerAngles.z >0  && power.transform.eulerAngles.z < 95)){
  power.transform.Rotate(Vector3.back * Time.deltaTime*50);
  arm.transform.Rotate(Vector3.back * Time.deltaTime*50);
  pwr.transform.Rotate(Vector3.back * Time.deltaTime*50);
 }
}
if(Input.GetKey(KeyCode.LeftControl)){
 if ((power.transform.eulerAngles.z <360 && power.transform.eulerAngles.z > 275)||(power.transform.eulerAngles.z >0  && power.transform.eulerAngles.z < 90)){
  power.transform.Rotate(Vector3.forward * Time.deltaTime*50);
  arm.transform.Rotate(Vector3.forward * Time.deltaTime*50);
  pwr.transform.Rotate(Vector3.forward * Time.deltaTime*50);
 }
}
//print(power.transform.eulerAngles.z);

 if(Input.GetKey(KeyCode.E)){
  timer+=Time.deltaTime;
  if (tab[weapon].slider)
  pwrFill.value+=Time.deltaTime;
  print(timer);
 }
 if (Input.GetKeyUp(KeyCode.E) && CharController.grounded || timer>=1) {
  clone= Instantiate(tab[weapon].weap,transform.position, Quaternion.identity);
  if(GetComponent.<SpriteRenderer>().flipX) {

   if (power.transform.eulerAngles.z <360 && power.transform.eulerAngles.z > 275) {
    clone.transform.Translate(3,1.3,0);
    clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*((270-power.transform.eulerAngles.z)*tab[weapon].mn*timer));
    clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*((360-power.transform.eulerAngles.z)*tab[weapon].mn*timer));
   }
   if (power.transform.eulerAngles.z >0  && power.transform.eulerAngles.z < 95) {
    clone.transform.Translate(3,-1.3,0);
    clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*((90-power.transform.eulerAngles.z)*-tab[weapon].mn*timer));
    clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*((0-power.transform.eulerAngles.z)*tab[weapon].mn*timer));
   }
  }
  if(!GetComponent.<SpriteRenderer>().flipX){

   if (power.transform.eulerAngles.z <360 && power.transform.eulerAngles.z > 275){
    clone.transform.Translate(-3,1.3,0);
    clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*((270-power.transform.eulerAngles.z)*-tab[weapon].mn*timer));
    clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*((360-power.transform.eulerAngles.z)*tab[weapon].mn*timer));
   }
   if (power.transform.eulerAngles.z >0  && power.transform.eulerAngles.z < 95){
    clone.transform.Translate(-3,-1.3,0);
    clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.left*((90-power.transform.eulerAngles.z)*tab[weapon].mn*timer));
    clone.GetComponent.<Rigidbody2D>().AddForce(Vector2.up*((0-power.transform.eulerAngles.z)*tab[weapon].mn*timer));
   }
  }
  Reset();
 }



}

}

function Reset() {
	timer=0;
	pwrFill.value=0;
	power.SetActive(false);
	isArmed=false;
	power.transform.localRotation=Quaternion.Euler(0,0,60);
	pwr.transform.localRotation=Quaternion.Euler(0,0,238.5);
	arm.transform.localRotation=Quaternion.Euler(0,0,20);
	weapRend.SetActive(false);
}
