//Collision

function canWalkTo(x, y) {
	return tiles[Math.round(y) * levelWidth + Math.round(x)] == 0 && tiles[Math.round(y - 1) * levelWidth + Math.round(x)] == 0 && tiles[Math.round(y - 1) * levelWidth + Math.round(x - 1)] == 0 && tiles[Math.round(y) * levelWidth + Math.round(x - 1)] == 0;
}