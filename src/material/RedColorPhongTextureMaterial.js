"use strict";
var RedColorPhongTextureMaterial;
(function () {
	var makeProgram;
	/**DOC:
	 {
		 constructorYn : true,
		 title :`RedColorPhongTextureMaterial`,
		 description : `
			 RedColorPhongTextureMaterial Instance 생성
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 hexColor : [
				 {type:'hex'}
			 ],
			 alpha : [
				 {type:'number'},
				 '알파값'
			 ],
			 normalTexture : [
				 {type: 'RedBitmapTexture'}
			 ],
			 specularTexture : [
				 {type: 'RedBitmapTexture'}
			 ],
			 specularTexture : [
				 {type: 'RedBitmapTexture'}
			 ],
			 displacementTexture : [
				 {type: 'RedBitmapTexture'}
			 ]
		 },
		 example: `
		 RedColorPhongTextureMaterial(RedGL Instance, hex, alpha, normalTexture, specularTexture)
		 `,
		 return : 'RedColorPhongTextureMaterial Instance'
	 }
	 :DOC*/
	RedColorPhongTextureMaterial = function ( redGL, hexColor, alpha, normalTexture, specularTexture, displacementTexture ) {
		if ( !(this instanceof RedColorPhongTextureMaterial) ) return new RedColorPhongTextureMaterial( redGL, hexColor, alpha, normalTexture, specularTexture, displacementTexture );
		/////////////////////////////////////////
		// 유니폼 프로퍼티
		this['_color'] = new Float32Array( 4 );
		/**DOC:
		 {
			 title :`normalTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['normalTexture'] = normalTexture;
		/**DOC:
		 {
			 title :`specularTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['specularTexture'] = specularTexture;
		/**DOC:
		 {
			 title :`displacementTexture`,
			 return : 'RedBitmapTexture'
		 }
		 :DOC*/
		this['displacementTexture'] = displacementTexture;
		/**DOC:
		 {
			 title :`shininess`,
			 description : `기본값 : 16`,
			 return : 'uint'
		 }
		 :DOC*/
		this['shininess'] = 16
		/**DOC:
		 {
			 title :`specularPower`,
			 description : `기본값 : 1`,
			 return : 'uint'
		 }
		 :DOC*/
		this['specularPower'] = 1
		/**DOC:
		 {
			 title :`displacementPower`,
			 description : `기본값 : 0`,
			 return : 'Number'
		 }
		 :DOC*/
		this['displacementPower'] = 0
		/////////////////////////////////////////
		// 일반 프로퍼티
		/**DOC:
		 {
			 code : 'PROPERTY',
			 title :`color`,
			 description : `
				 컬러설정
			 `,
			 return : 'hex'
		 }
		 :DOC*/
		Object.defineProperty( this, 'color', (function () {
			var _v = '#ff2211'
			return {
				get: function () { return _v },
				set: (function () {
					var t0;
					return function ( hex ) {
						_v = hex ? hex : '#ff2211';
						t0 = RedGLUtil.hexToRGB.call( this, _v );
						this['_color'][0] = t0[0];
						this['_color'][1] = t0[1];
						this['_color'][2] = t0[2];
						this['_color'][3] = this['alpha'];
					}
				})()
			}
		})() );
		Object.defineProperty( this, 'alpha', (function () {
			var _v = '#ff2211'
			return {
				get: function () { return _v; },
				set: function ( v ) { this['_color'][3] = _v = v }
			}
		})() );
		this['alpha'] = alpha == undefined ? 1 : alpha;
		this['color'] = hexColor ? hexColor : '#ff0000'
		this['program'] = makeProgram( redGL );
		this['_UUID'] = RedGL['makeUUID']();
		this.checkUniformAndProperty()
		// Object.seal(this);
		console.log( this );
	}
	makeProgram = (function () {
		var vSource, fSource;
		var PROGRAM_NAME;
		vSource = function () {
			/* @preserve
			 uniform vec4 u_color;
			 varying vec4 vColor;
			 uniform sampler2D uDisplacementTexture;
			 uniform float uDisplacementPower;
			 varying vec4 vVertexPositionEye4;
			 void main(void) {
				 vColor = u_color;
				 vTexcoord = uAtlascoord.xy + aTexcoord * uAtlascoord.zw;
				 vVertexNormal = vec3(uNMatrix * vec4(aVertexNormal,1.0));
				 vVertexPositionEye4 = uMMatrix * vec4(aVertexPosition, 1.0);
				 vVertexPositionEye4.xyz += normalize(vVertexNormal) * texture2D(uDisplacementTexture, vTexcoord).x * uDisplacementPower ;
				 gl_PointSize = uPointSize;
				 gl_Position = uPMatrix * uCameraMatrix* vVertexPositionEye4;
			 }
			 */
		}
		fSource = function () {
			/* @preserve
			 precision mediump float;
			 uniform sampler2D uNormalTexture;
			 uniform sampler2D uSpecularTexture;

			 uniform float uShininess;
			 uniform float uSpecularPower;

			 varying vec4 vVertexPositionEye4;
			 varying vec4 vColor;

			 float fogFactor(float perspectiveFar, float density){
				 float flog_cord = gl_FragCoord.z / gl_FragCoord.w / perspectiveFar;
				 float fog = flog_cord * density;
				 if(1.0 - fog < 0.0) discard;
			    return clamp(1.0 - fog, 0.0,  1.0);
			 }
			 vec4 fog(float fogFactor, vec4 fogColor, vec4 currentColor) {
			    return mix(fogColor, currentColor, fogFactor);
			 }
			 void main(void) {
				 vec4 la = uAmbientLightColor * uAmbientLightColor.a;
				 vec4 ld = vec4(0.0, 0.0, 0.0, 1.0);
				 vec4 ls = vec4(0.0, 0.0, 0.0, 1.0);

				 vec4 texelColor = vColor;
				 // texelColor.rgb *= texelColor.a;

				 vec3 N = normalize(vVertexNormal);
				 vec4 normalColor = texture2D(uNormalTexture, vTexcoord);
				 if(normalColor.a != 0.0) N = normalize(2.0 * (N + normalColor.rgb  - 0.5));

				 vec4 specularLightColor = vec4(1.0, 1.0, 1.0, 1.0);
				 float specularTextureValue = 1.0;
				 specularTextureValue = texture2D(uSpecularTexture, vTexcoord).r;
				 float specular;

				 vec3 L;
				 vec3 R;
				 highp float lambertTerm;
				 for(int i=0; i<cDIRETIONAL_MAX; i++){
					 if(i == uDirectionalLightNum) break;
					 L = normalize(-uDirectionalLightPosition[i]);
					 lambertTerm = dot(N,-L);
					 if(lambertTerm > 0.0){
						 ld += (uDirectionalLightColor[i] * texelColor * lambertTerm * uDirectionalLightIntensity[i]) * uDirectionalLightColor[i].a;
						 R = reflect(L, N);
						 specular = pow( max(dot(R, -L), 0.0), uShininess);
						 ls +=  specularLightColor * specular * uSpecularPower * specularTextureValue * uDirectionalLightIntensity[i];
					 }
				 }
				 vec3 pointDirection;
				 highp float distanceLength;
				 highp float attenuation;
				 for(int i=0;i<cPOINT_MAX;i++){
				 if(i== uPointLightNum) break;
					 pointDirection =  -uPointLightPosition[i] + vVertexPositionEye4.xyz;
					 distanceLength = length(pointDirection);
					 if(uPointLightRadius[i]> distanceLength){
						 attenuation = 1.0 / (0.01 + 0.02 * distanceLength + 0.03 * distanceLength * distanceLength);
						 L = normalize(pointDirection);
						 lambertTerm = dot(N,-L);
						 if(lambertTerm > 0.0){
							 ld += (uPointLightColor[i] * texelColor * lambertTerm * attenuation * uPointLightIntensity[i]) * uPointLightColor[i].a;
							 R = reflect(L, N);
							 specular = pow( max(dot(R, -L), 0.0), uShininess);
							 ls +=  specularLightColor * specular * uSpecularPower * specularTextureValue * uPointLightIntensity[i] ;
						 }
					 }
				 }

				 vec4 finalColor = la * uAmbientIntensity + ld + ls;
				 finalColor.rgb *= texelColor.a;
				 finalColor.a = texelColor.a;
				 if(uUseFog) gl_FragColor = fog( fogFactor(uFogDistance, uFogDensity), uFogColor, finalColor);
				 else gl_FragColor = finalColor;
			 }
			 */
		}
		vSource = RedGLUtil.getStrFromComment( vSource.toString() );
		fSource = RedGLUtil.getStrFromComment( fSource.toString() );
		// console.log(vSource, fSource)
		PROGRAM_NAME = 'colorPhongTextureProgram';
		return function ( redGL ) {
			return RedProgram( redGL, PROGRAM_NAME, vSource, fSource )
		}
	})();
	RedColorPhongTextureMaterial.prototype = RedBaseMaterial.prototype
	Object.freeze( RedColorPhongTextureMaterial )
})();