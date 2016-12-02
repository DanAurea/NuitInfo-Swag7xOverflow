//Level Renderer
var levelWidth = 10;
var tiles = 
[
	1,1,1,1,1,1,1,1,1,1,
	1,0,0,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,1,
	1,0,0,0,1,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,1,
	1,0,0,0,0,0,0,0,0,1,
	1,1,1,1,1,1,1,1,1,1,
];

var levelVertexBuffer;
var levelTextureBuffer;
var levelIndicesBuffer;

function initLevelBuffers() 
{
	levelVertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, levelVertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(makeVertexBuffer()), gl.STATIC_DRAW);
	
	levelTextureBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, levelTextureBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(makeTexturesBuffer()), gl.STATIC_DRAW);
	
	levelIndicesBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, levelIndicesBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(makeIndicesBuffer()), gl.STATIC_DRAW);
}

function drawLevel()
{
	gl.bindTexture(gl.TEXTURE_2D, testTexture);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, levelTextureBuffer);
	gl.vertexAttribPointer(textureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
	
	gl.bindBuffer(gl.ARRAY_BUFFER, levelVertexBuffer);
	gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
	gl.uniform1i(gl.getUniformLocation(shaderProgram, "uSampler"), 0);
	setMatrixUniforms();
	
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, levelIndicesBuffer);
	gl.drawElements(gl.TRIANGLES, tiles.length * 36, gl.UNSIGNED_SHORT, 0);
}

function makeVertexBuffer()
{
	var vertices = 0;
	var outputVertices = [];
	
	for(var i = 0; i < tiles.length; i++)
	{
		var x = parseInt(i % levelWidth);
		var y = parseInt(i / levelWidth);
		
		for(var j = 0; j < cubeVertices.length; j+= 3)
		{
			outputVertices[vertices++] = cubeVertices[j] + x;
			outputVertices[vertices++] = isFloor(tiles[i]) ? cubeVertices[j + 1] - 1 : cubeVertices[j + 1] * 2;
			outputVertices[vertices++] = cubeVertices[j + 2] + y;
		}
	}
	
	return outputVertices;
}

function makeTexturesBuffer()
{
	var textures = 0;
	var outputTextures = [];
	
	for(var i = 0; i < tiles.length; i++)
	{
		outputTextures = outputTextures.concat(textureCoordinates);
		for(var j = 0; j < textureCoordinates.length; j+=2)
		{
			outputTextures[textures++] = isFloor(tiles[i]) ? textureCoordinates[j] : textureCoordinates[j] + 0.5;
			outputTextures[textures++] = textureCoordinates[j + 1];
		}
	}
	
	return outputTextures;
}

function makeIndicesBuffer()
{
	var indices = 0;
	var outputIndices = [];
	
	for(var i = 0; i < tiles.length; i++)
	{		
		for(var j = 0; j < cubeIndices.length; j++)
		{
			outputIndices[i * 36 + j] = cubeIndices[j] + i * 24;
		}
	}
	
	return outputIndices;
}

function isFloor(id)
{
	return id <= 0;
}