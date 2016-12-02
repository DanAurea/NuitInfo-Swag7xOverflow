//Collision

function canWalkTo(x, y) {
	return tiles[Math.round(y - 0.3) * levelWidth + Math.round(x - 0.3)] <= 0 && tiles[Math.round(y - 0.7) * levelWidth + Math.round(x - 0.3)] <= 0 && tiles[Math.round(y - 0.7) * levelWidth + Math.round(x - 0.7)] <= 0 && tiles[Math.round(y - 0.3) * levelWidth + Math.round(x - 0.7)] <= 0;
}