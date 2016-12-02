//Utils

function getShader(gl, id)
{
    var shaderScript, theSource, currentChild, shader;

    shaderScript = document.getElementById(id);
    
    if (!shaderScript)
	{
        return null;
    }

    theSource = "";
    currentChild = shaderScript.firstChild;

    while(currentChild)
	{
        if (currentChild.nodeType == currentChild.TEXT_NODE)
		{
            theSource += currentChild.textContent;
        }

        currentChild = currentChild.nextSibling;
    }
    if (shaderScript.type == "x-shader/x-fragment")
	{
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    }
	else if (shaderScript.type == "x-shader/x-vertex")
	{
        shader = gl.createShader(gl.VERTEX_SHADER);
    }
	else
	{
        // type de shader inconnu
        return null;
    }
    gl.shaderSource(shader, theSource);

    // Compile le programme shader
    gl.compileShader(shader);

    // Vérifie si la compilation s'est bien déroulée
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
	{
        alert("Une erreur est survenue au cours de la compilation des shaders: " + gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

/*************/
/** Texture **/
/*************/

function loadTexture(texture)
{
	var textureId = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, textureId);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);
	
	return textureId;
}

/**************/
/**  MATRIX  **/
/**************/

function loadIdentity()
{
    mvMatrix = Matrix.I(4);
}

function multMatrix(m)
{
    mvMatrix = mvMatrix.x(m);
}

function mvTranslate(v)
{
    multMatrix(Matrix.Translation($V([v[0], v[1], v[2]])).ensure4x4());
}

function setMatrixUniforms()
{
    var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    gl.uniformMatrix4fv(pUniform, false, new Float32Array(perspectiveMatrix.flatten()));

    var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    gl.uniformMatrix4fv(mvUniform, false, new Float32Array(mvMatrix.flatten()));
}

function mvRotate(angle, v)
{
	var inRadians = angle * Math.PI / 180.0;
	var m = Matrix.Rotation(inRadians, $V([v[0], v[1], v[2]])).ensure4x4();
	multMatrix(m);
}

function toRadians(degrees)
{
	return degrees * (Math.PI / 180);
}