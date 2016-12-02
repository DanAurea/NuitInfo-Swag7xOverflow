//Camera
playerX = 2;
playerZ = 2;
playerPitch = 0;
playerYaw = 0;
locked = false;


function lockChangeAlert()
{
	if (document.pointerLockElement === theCanvas ||document.mozPointerLockElement === theCanvas)
	{
		locked = true;
		document.addEventListener("mousemove", updateCamera, false);
	}
	else
	{
		locked = false;
		document.removeEventListener("mousemove", updateCamera, false);
	}
}

function updateMovement(e)
{
	if(locked)
	{
		var forward = 0;
		var strafe = 0;
		
		switch(e.key)
		{
			case "z":
			{
				forward = 0.2;
				
				break;
			}
			case "q":
			{
				strafe = -0.2;
				
				break;
			}
			case "s":
			{
				forward = -0.2;
				
				break;
			}
			case "d":
			{
				strafe = 0.2;
				
				break;
			}
		}
		
		var newPlayerX = playerX + Math.cos(toRadians(playerYaw)) * (strafe / 2) - (Math.cos(toRadians(playerYaw + 90)) * (forward / 2));
		var newPlayerZ = playerZ + Math.sin(toRadians(playerYaw)) * (strafe / 2) - (Math.sin(toRadians(playerYaw + 90)) * (forward / 2));
		if (canWalkTo(newPlayerX, newPlayerZ)) {
			playerX = newPlayerX;
			playerZ = newPlayerZ;
		}
	}
}

function updateCamera(e)
{
	playerYaw += e.movementX;
	playerPitch += e.movementY;
	
	//Clamp pitch
	playerPitch = Math.min(Math.max(playerPitch, -90), 90);
}