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
	$.get("genMap.php", function(e)
	{
		tiles = [];
		json = JSON.parse(e);
		for(var i = 0; i < json.length; i++)
		{
			levelWidth = json[i].length;
			tiles = tiles.concat(json[i]);
		}
		
		for(var j = 0; j < tiles.length; j++)
		{
			if(tiles[j] == 2)
			{
				tiles[j] = 0;
				playerX = j % levelWidth;
				playerZ = parseInt(j / levelWidth);
				break;
			}
		}
		
		initCanvas();
	});
	
});