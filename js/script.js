

function init() {
	
	//fitDivToBackgroundImage("gearFlat");
	//fitDivToBackgroundImage("gearSteampunk");
	
}


function fitDivToBackgroundImage(idImg) {
	document.getElementById(idImg).style.backgroundSize = document.getElementById(idImg).style.width + "px "
																+ document.getElementById(idImg).style.height + "px";
}