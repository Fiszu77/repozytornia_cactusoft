#pragma strict
import UnityEngine.SceneManagement;
var exit:boolean=false;
var openWindow:boolean=false;
var toggle:boolean=false;
var load:boolean=false;
var scene:String;
var windowToOpen:GameObject;
var windows:GameObject[];

function Click () {
	if(exit) {
	 Application.Quit();
	}

	if(openWindow) {
		/*windows=GameObject.FindGameObjectsWithTag("window");
		for(var i:int;i>=windows.length;i++) {
			windows[i].SetActive(false);
		}*/
		windowToOpen.SetActive(true);
	}

	if(load) {
	 SceneManager.LoadScene(scene);
	}
}