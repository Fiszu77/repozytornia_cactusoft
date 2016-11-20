#pragma strict
var TextureToCopy: Texture2D ;
var cam : GameObject;//obiekt ze spritem do zmienienia  
cam = GameObject.Find("Ground");

function CopyTexture2D(copiedTexture : Texture2D){
var texture = new Texture2D(copiedTexture.width, copiedTexture.height);
               //Choose your filtermode and wrapmode here.
        texture.filterMode = FilterMode.Point;
        texture.wrapMode = TextureWrapMode.Clamp;
        for (var y: int = 0; y < texture.height; y++) {
		for (var x: int = 0; x < texture.width; x++) {
			texture.SetPixel(x, y,Color.clear);
		}
	}
	texture.Apply();
	 return texture;
}

function Start () {
var groundTexture2D : Texture2D = CopyTexture2D(cam.GetComponent.<SpriteRenderer>().sprite.texture);  
var tempName : String = cam.GetComponent.<SpriteRenderer>().sprite.name; 
cam.GetComponent.<SpriteRenderer>().sprite = Sprite.Create (groundTexture2D, cam.GetComponent.<SpriteRenderer>().sprite.rect, new Vector2(0,1));
cam.GetComponent.<SpriteRenderer>().sprite.name = tempName;
cam.GetComponent.<SpriteRenderer>().material.mainTexture = groundTexture2D;
cam.GetComponent.<SpriteRenderer>().material.shader = Shader.Find ("Sprites/Transparent Unlit");

}

function Update () {

}

