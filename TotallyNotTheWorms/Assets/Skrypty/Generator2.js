#pragma strict

var atom:GameObject[];
var clone:GameObject;
var heights:int[];

var dirt:Material;
var stone:Material;

var width:int;
var height:int;
var smoothness:float;
var multiplier:float;
var seed:float;
var y:int;
var x:int;
var r2:int;
var r1:int;

function Start () {
	seed=Random.Range(-1000.0,1000.0);
	Generate();
	GenerateTriangles();
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

