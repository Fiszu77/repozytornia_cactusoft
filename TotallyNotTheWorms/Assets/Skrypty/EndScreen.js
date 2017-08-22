#pragma strict

var mainText:UnityEngine.UI.Text;

var tColors:Color32[];

function Start () {
	mainText.text="Wygrała Drużyna " + Game.won + "!";
	mainText.color=tColors[Game.won];
}

function Update () {

}