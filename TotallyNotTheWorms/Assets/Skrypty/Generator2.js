#pragma strict

var atom:GameObject[]; // obiekty tworzące atomy
var clone:GameObject;
var player:GameObject; //obiekt nieświszczuków
var heights:int[]; //wysokości pojedyńczych kolumn mapy

var dirt:Material; //materiał ziemii
var stone:Material; //materiał kamienia

var width:int; //szerokość mapy
var height:int; //obecna wysokość kolumny przy tworzeniu atomów
var smoothness:float; //gładkość mapy (góry i doliny)
var multiplier:float; //"wysokość" mapy
@Range(1,100)
var caveCount:int; //szansa na  stworzenie się jaskini
var seed:float; //ziarno genereatora mapy
var y:int; //obecna wysokość
var x:int; //obecna szerokość
var r2:int; //głebokość od której zaczyna się ziemia
var r1:int; //głębokość od której zaczyna się kamień (licząc od ziemii)
var numberOfTeams:int; //liczba nieświszczuków do zespawnowania

function Start () {
	seed=Random.Range(-1000.0,1000.0);
	Generate();
	GenerateTriangles();
	GenerateCave();
	Spawn();
}

function Generate() {
	for(x=0; x<width; x++) {
	 height = Mathf.RoundToInt(Mathf.PerlinNoise(seed, x/smoothness)*multiplier);
	 heights[x]=height;
	 r2=Random.Range(4,6);
	 r1=Random.Range(10,13);
	 for(y=0; y<height; y++) {
	  GenerateAtom();
	 }
	}
}

function GenerateTriangles() {
 var a:int;
 var b:int;
	for(x=0; x<width; x++) {
	 y=heights[x];
	 a=x-1;
	 b=x+1;
	 if(x>=1 && x<=width-2) {
	  if(heights[a]<=heights[x] && heights[b]>=heights[x]) {
	    GenerateRight();
	  }
	  if(heights[a]>=heights[x] && heights[b]<=heights[x]) {
	   GenerateLeft();
	  }
	  if(heights[a]>=heights[x] && heights[b]>=heights[x]) {
	    GenerateAtom();
	  }
	 }
	 if(x==0 || x==width-1) {
	  GenerateAtom();
	 }
	}
}

function GenerateAtom() {
	for(var a:int=0; a<=3; a++) {
	 clone=Instantiate(atom[a], Vector2(x*2.5,y*2.5), atom[a].transform.rotation);
	 if(y<=heights[x]-r2) {
	  clone.GetComponent.<SpriteRenderer>().material=dirt;
	 }
	 if(y<=heights[x]-(r1+r2)) {
	  clone.GetComponent.<SpriteRenderer>().material=stone;
	 }
	}
}

function GenerateLeft() {
	Instantiate(atom[0], Vector2(x*2.5,y*2.5), atom[0].transform.rotation);
	Instantiate(atom[3], Vector2(x*2.5,y*2.5), atom[3].transform.rotation);
}

function GenerateRight() {
	Instantiate(atom[2], Vector2(x*2.5,y*2.5), atom[2].transform.rotation);
	Instantiate(atom[3], Vector2(x*2.5,y*2.5), atom[3].transform.rotation);
}

function GenerateCave () {
	for(x=0; x<width; x++) {
	 var h:int=Random.Range(1,height); //losowa wysokość "jaskiniowej bomby"
	 var r:int=Random.Range(6,16); //losowy promień
	 var create:int=Random.Range(0,100); //losowanie, czy ma się stworzyć jaskinia
	 var s:int=0; //długość serii bomb (jaskini)
	 var a:Collider2D[]; //atomy do usunięcia
	 if(s==0 || create>caveCount) {s=Random.Range(2,8);} //losowanie długści serii, gdy skończy się poprzednia seria i powinna się rozpocząć nowa jaskinia
	 if(create>caveCount && s>0) { //jeśli ma powstać jaskinia
	   a=Physics2D.OverlapCircleAll(Vector2(x*2.5,h*2.5),r); //zaznacz atomy do usunięcia
	   s--;
	   for(var i=0;i<a.length;i++) { //usuwanie atomów
	    if(a[i].CompareTag("atom")) {
	     a[i].gameObject.SetActive(false);
	    }
	   }
	 }
	}
}

function Spawn () {
	var a:int=1; //ilość zespawnowanych w drużynie nieświszczuków
	for(var i=1; i<=numberOfTeams; i++) {
	 for(x=0; x<=width && a<=4; x+=Random.Range(4,10)*2.5) { //jeśli liczba obecnych na mapie nieświszczuków nie przekracza docelowej
	  y=Random.Range(10,multiplier/2); //losowa wysokość spawnu nieświszczuka
	  if(!Physics2D.OverlapArea(Vector2((x-2)*2.5,(y+3)*2.5),Vector2((x+2)*2.5,(y-3)*2.5))) { //jeśli nie ma atomów w miejscu spawnu
	   player.GetComponent.<Character>().team=i; //nadaj obecnie spawnującemu nieświszczukowi odpowiedni numer drużyny
	   player.GetComponent.<Character>().player=a; //nadaj obecnie spawnującemu nieświszczukowi odpowiedni numer gracza w drużynie
	   Instantiate(player, Vector2(x*2.5,y*2.5), Quaternion.identity);
	   a++;
	  }
	  if(x>width-10) {
	   x=0;
	  }
	 }
	 a=1;
	}
}

