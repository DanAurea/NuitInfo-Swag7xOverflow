//Init
var theCanvas;
var gl = null;
var width;
var height;
var aspectRatio = 0;
var shaderProgram;



function initCanvas()
{
	var canvas = $("#gameCanvas");
	theCanvas = canvas[0];
	theCanvas.requestPointerLock = theCanvas.requestPointerLock || theCanvas.mozRequestPointerLock;
	document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock;
	document.addEventListener('pointerlockchange', lockChangeAlert, false);
	document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
	document.addEventListener('webkitpointerlockchange', lockChangeAlert, false);
	$(document).keydown(updateMovement);
	
	theCanvas.onclick = function()
	{
		theCanvas.requestPointerLock();
	};
	
	//Init properties
	width = theCanvas.width;
	height = theCanvas.height;
	aspectRatio = height / width;
	
	initWebGL(canvas);
	initShaders();
	
	//Si le contexte existe (compatible)
	if(gl)
	{
		gl.clearColor(0.9, 1.0, 1.0, 1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);
		gl.activeTexture(gl.TEXTURE0);
		
		testTexture = loadTexture($("#texture")[0]);
		
		initLevelBuffers();
		
		setInterval(drawGame, 15);
	}
}

function initWebGL(canvas)
{
	gl = null;
	
	try
	{
		//Récupération du context webGL
		// /!\ Canvas = Element JQUERY ||   Canvas[0] = Element HTML
		gl = canvas[0].getContext("webgl") || canvas.getContext("experimental-webgl");
	}
	catch(e)
	{
		alert("WebGL non compatile");
	}
}

function initShaders()
{
	var fragmentShader = getShader(gl, "shader-fs");
	var vertexShader = getShader(gl, "shader-vs");

	// Créer le programme shader
	shaderProgram = gl.createProgram();
	gl.attachShader(shaderProgram, vertexShader);
	gl.attachShader(shaderProgram, fragmentShader);
	gl.linkProgram(shaderProgram);

	// Faire une alerte si le chargement du shader échoue
	if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)){alert("Impossible d'initialiser le shader.");}

	gl.useProgram(shaderProgram);

	vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
	gl.enableVertexAttribArray(vertexPositionAttribute);
	
	textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
	gl.enableVertexAttribArray(textureCoordAttribute);
}

