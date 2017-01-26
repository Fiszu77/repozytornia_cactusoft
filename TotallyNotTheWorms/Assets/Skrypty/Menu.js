#pragma strict
import UnityEngine.SceneManagement;
var exit:boolean=false;
var normal:boolean=false;
var toggle:boolean=false;
var load:boolean=false;
var fi:GameObject;
var fi2:GameObject;
var se:GameObject;
var th:GameObject;
var fo:GameObject;
var play:GameObject;
var playb:UnityEngine.UI.Button;
var ptext:GameObject;
var script:Menu;
var s:String;

function Click () {
	if(exit==true) {
	 Application.Quit();
	}
	if(normal==true) {
	 if(fi.activeInHierarchy==false) {
	  fi.SetActive(true);
	  fi2.SetActive(true);
	 }
	 if(se.activeInHierarchy==true) {
	  se.SetActive(false);
	 }
	 if(th.activeInHierarchy==true) {
	  th.SetActive(false);
	 }
	 if(fo.activeInHierarchy==true) {
	  fo.SetActive(false);
	 }
	}
	if(toggle==true) {
	  playb.interactable=true;
	  ptext.SetActive(true);
	  script=play.GetComponent(Menu);
	  script.s=s;
	}
	if(load==true) {
	 SceneManager.LoadScene(s);
	}
}