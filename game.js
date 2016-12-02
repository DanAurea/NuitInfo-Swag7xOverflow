//Game Core

//GL Data

var testTexture;

//Level
function drawGame()
{
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	
	perspectiveMatrix = makePerspective(45, width / height, 0.1, 100.0);
  
	loadIdentity();
	
	mvRotate(playerPitch, [1, 0, 0]);
	mvRotate(playerYaw, [0, 1, 0]);
	
	mvTranslate([-playerX, -1.0, -playerZ]);
	
	drawLevel();
}

//Début du jeu
$(function()
{
	initCanvas();
});