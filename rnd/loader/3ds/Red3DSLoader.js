"use strict";
var Red3DSLoader;
(function () {
	var NULL_CHUNK = 0x0000;
	var M3DMAGIC = 0x4D4D;
	var SMAGIC = 0x2D2D;
	var LMAGIC = 0x2D3D;
	var MLIBMAGIC = 0x3DAA;
	var MATMAGIC = 0x3DFF;
	var CMAGIC = 0xC23D;
	var M3D_VERSION = 0x0002;
	var M3D_KFVERSION = 0x0005;
	var COLOR_F = 0x0010;
	var COLOR_24 = 0x0011;
	var LIN_COLOR_24 = 0x0012;
	var LIN_COLOR_F = 0x0013;
	var INT_PERCENTAGE = 0x0030;
	var FLOAT_PERCENTAGE = 0x0031;
	var MDATA = 0x3D3D;
	var MESH_VERSION = 0x3D3E;
	var MASTER_SCALE = 0x0100;
	var LO_SHADOW_BIAS = 0x1400;
	var HI_SHADOW_BIAS = 0x1410;
	var SHADOW_MAP_SIZE = 0x1420;
	var SHADOW_SAMPLES = 0x1430;
	var SHADOW_RANGE = 0x1440;
	var SHADOW_FILTER = 0x1450;
	var RAY_BIAS = 0x1460;
	var O_CONSTS = 0x1500;
	var AMBIENT_LIGHT = 0x2100;
	var BIT_MAP = 0x1100;
	var SOLID_BGND = 0x1200;
	var V_GRADIENT = 0x1300;
	var USE_BIT_MAP = 0x1101;
	var USE_SOLID_BGND = 0x1201;
	var USE_V_GRADIENT = 0x1301;
	var FOG = 0x2200;
	var FOG_BGND = 0x2210;
	var LAYER_FOG = 0x2302;
	var DISTANCE_CUE = 0x2300;
	var DCUE_BGND = 0x2310;
	var USE_FOG = 0x2201;
	var USE_LAYER_FOG = 0x2303;
	var USE_DISTANCE_CUE = 0x2301;
	var MAT_ENTRY = 0xAFFF;
	var MAT_NAME = 0xA000;
	var MAT_AMBIENT = 0xA010;
	var MAT_DIFFUSE = 0xA020;
	var MAT_SPECULAR = 0xA030;
	var MAT_SHININESS = 0xA040;
	var MAT_SHIN2PCT = 0xA041;
	var MAT_TRANSPARENCY = 0xA050;
	var MAT_XPFALL = 0xA052;
	var MAT_USE_XPFALL = 0xA240;
	var MAT_REFBLUR = 0xA053;
	var MAT_SHADING = 0xA100;
	var MAT_USE_REFBLUR = 0xA250;
	var MAT_SELF_ILLUM = 0xA084;
	var MAT_TWO_SIDE = 0xA081;
	var MAT_DECAL = 0xA082;
	var MAT_ADDITIVE = 0xA083;
	var MAT_WIRE = 0xA085;
	var MAT_FACEMAP = 0xA088;
	var MAT_TRANSFALLOFF_IN = 0xA08A;
	var MAT_PHONGSOFT = 0xA08C;
	var MAT_WIREABS = 0xA08E;
	var MAT_WIRE_SIZE = 0xA087;
	var MAT_TEXMAP = 0xA200;
	var MAT_SXP_TEXT_DATA = 0xA320;
	var MAT_TEXMASK = 0xA33E;
	var MAT_SXP_TEXTMASK_DATA = 0xA32A;
	var MAT_TEX2MAP = 0xA33A;
	var MAT_SXP_TEXT2_DATA = 0xA321;
	var MAT_TEX2MASK = 0xA340;
	var MAT_SXP_TEXT2MASK_DATA = 0xA32C;
	var MAT_OPACMAP = 0xA210;
	var MAT_SXP_OPAC_DATA = 0xA322;
	var MAT_OPACMASK = 0xA342;
	var MAT_SXP_OPACMASK_DATA = 0xA32E;
	var MAT_BUMPMAP = 0xA230;
	var MAT_SXP_BUMP_DATA = 0xA324;
	var MAT_BUMPMASK = 0xA344;
	var MAT_SXP_BUMPMASK_DATA = 0xA330;
	var MAT_SPECMAP = 0xA204;
	var MAT_SXP_SPEC_DATA = 0xA325;
	var MAT_SPECMASK = 0xA348;
	var MAT_SXP_SPECMASK_DATA = 0xA332;
	var MAT_SHINMAP = 0xA33C;
	var MAT_SXP_SHIN_DATA = 0xA326;
	var MAT_SHINMASK = 0xA346;
	var MAT_SXP_SHINMASK_DATA = 0xA334;
	var MAT_SELFIMAP = 0xA33D;
	var MAT_SXP_SELFI_DATA = 0xA328;
	var MAT_SELFIMASK = 0xA34A;
	var MAT_SXP_SELFIMASK_DATA = 0xA336;
	var MAT_REFLMAP = 0xA220;
	var MAT_REFLMASK = 0xA34C;
	var MAT_SXP_REFLMASK_DATA = 0xA338;
	var MAT_ACUBIC = 0xA310;
	var MAT_MAPNAME = 0xA300;
	var MAT_MAP_TILING = 0xA351;
	var MAT_MAP_TEXBLUR = 0xA353;
	var MAT_MAP_USCALE = 0xA354;
	var MAT_MAP_VSCALE = 0xA356;
	var MAT_MAP_UOFFSET = 0xA358;
	var MAT_MAP_VOFFSET = 0xA35A;
	var MAT_MAP_ANG = 0xA35C;
	var MAT_MAP_COL1 = 0xA360;
	var MAT_MAP_COL2 = 0xA362;
	var MAT_MAP_RCOL = 0xA364;
	var MAT_MAP_GCOL = 0xA366;
	var MAT_MAP_BCOL = 0xA368;
	var NAMED_OBJECT = 0x4000;
	var N_DIRECT_LIGHT = 0x4600;
	var DL_OFF = 0x4620;
	var DL_OUTER_RANGE = 0x465A;
	var DL_INNER_RANGE = 0x4659;
	var DL_MULTIPLIER = 0x465B;
	var DL_EXCLUDE = 0x4654;
	var DL_ATTENUATE = 0x4625;
	var DL_SPOTLIGHT = 0x4610;
	var DL_SPOT_ROLL = 0x4656;
	var DL_SHADOWED = 0x4630;
	var DL_LOCAL_SHADOW2 = 0x4641;
	var DL_SEE_CONE = 0x4650;
	var DL_SPOT_RECTANGULAR = 0x4651;
	var DL_SPOT_ASPECT = 0x4657;
	var DL_SPOT_PROJECTOR = 0x4653;
	var DL_SPOT_OVERSHOOT = 0x4652;
	var DL_RAY_BIAS = 0x4658;
	var DL_RAYSHAD = 0x4627;
	var N_CAMERA = 0x4700;
	var CAM_SEE_CONE = 0x4710;
	var CAM_RANGES = 0x4720;
	var OBJ_HIDDEN = 0x4010;
	var OBJ_VIS_LOFTER = 0x4011;
	var OBJ_DOESNT_CAST = 0x4012;
	var OBJ_DONT_RECVSHADOW = 0x4017;
	var OBJ_MATTE = 0x4013;
	var OBJ_FAST = 0x4014;
	var OBJ_PROCEDURAL = 0x4015;
	var OBJ_FROZEN = 0x4016;
	var N_TRI_OBJECT = 0x4100;
	var POINT_ARRAY = 0x4110;
	var POINT_FLAG_ARRAY = 0x4111;
	var FACE_ARRAY = 0x4120;
	var MSH_MAT_GROUP = 0x4130;
	var SMOOTH_GROUP = 0x4150;
	var MSH_BOXMAP = 0x4190;
	var TEX_VERTS = 0x4140;
	var MESH_MATRIX = 0x4160;
	var MESH_COLOR = 0x4165;
	var MESH_TEXTURE_INFO = 0x4170;
	var KFDATA = 0xB000;
	var KFHDR = 0xB00A;
	var KFSEG = 0xB008;
	var KFCURTIME = 0xB009;
	var AMBIENT_NODE_TAG = 0xB001;
	var OBJECT_NODE_TAG = 0xB002;
	var CAMERA_NODE_TAG = 0xB003;
	var TARGET_NODE_TAG = 0xB004;
	var LIGHT_NODE_TAG = 0xB005;
	var L_TARGET_NODE_TAG = 0xB006;
	var SPOTLIGHT_NODE_TAG = 0xB007;
	var NODE_ID = 0xB030;
	var NODE_HDR = 0xB010;
	var PIVOT = 0xB013;
	var INSTANCE_NAME = 0xB011;
	var MORPH_SMOOTH = 0xB015;
	var BOUNDBOX = 0xB014;
	var POS_TRACK_TAG = 0xB020;
	var COL_TRACK_TAG = 0xB025;
	var ROT_TRACK_TAG = 0xB021;
	var SCL_TRACK_TAG = 0xB022;
	var MORPH_TRACK_TAG = 0xB026;
	var FOV_TRACK_TAG = 0xB023;
	var ROLL_TRACK_TAG = 0xB024;
	var HOT_TRACK_TAG = 0xB027;
	var FALL_TRACK_TAG = 0xB028;
	var HIDE_TRACK_TAG = 0xB029;
	var POLY_2D = 0x5000;
	var SHAPE_OK = 0x5010;
	var SHAPE_NOT_OK = 0x5011;
	var SHAPE_HOOK = 0x5020;
	var PATH_3D = 0x6000;
	var PATH_MATRIX = 0x6005;
	var SHAPE_2D = 0x6010;
	var M_SCALE = 0x6020;
	var M_TWIST = 0x6030;
	var M_TEETER = 0x6040;
	var M_FIT = 0x6050;
	var M_BEVEL = 0x6060;
	var XZ_CURVE = 0x6070;
	var YZ_CURVE = 0x6080;
	var INTERPCT = 0x6090;
	var DEFORM_LIMIT = 0x60A0;
	var USE_CONTOUR = 0x6100;
	var USE_TWEEN = 0x6110;
	var USE_SCALE = 0x6120;
	var USE_TWIST = 0x6130;
	var USE_TEETER = 0x6140;
	var USE_FIT = 0x6150;
	var USE_BEVEL = 0x6160;
	var DEFAULT_VIEW = 0x3000;
	var VIEW_TOP = 0x3010;
	var VIEW_BOTTOM = 0x3020;
	var VIEW_LEFT = 0x3030;
	var VIEW_RIGHT = 0x3040;
	var VIEW_FRONT = 0x3050;
	var VIEW_BACK = 0x3060;
	var VIEW_USER = 0x3070;
	var VIEW_CAMERA = 0x3080;
	var VIEW_WINDOW = 0x3090;
	var VIEWPORT_LAYOUT_OLD = 0x7000;
	var VIEWPORT_DATA_OLD = 0x7010;
	var VIEWPORT_LAYOUT = 0x7001;
	var VIEWPORT_DATA = 0x7011;
	var VIEWPORT_DATA_3 = 0x7012;
	var VIEWPORT_SIZE = 0x7020;
	var NETWORK_VIEW = 0x7030;
	var parser
	/**DOC:
	 {
		 constructorYn : true,
		 title :`Red3DSLoader`,
		 description : `
			 OBJ 로더
		 `,
		 params : {
			 redGL : [
				 {type:'RedGL'}
			 ],
			 path : [
				 {type:'String'}
			 ],
			 fileName : [
				 {type:'String'}
			 ],
			 callback : [
				 {type:'Function'}
			 ]
		 },
		 return : 'void'
	 }
	 :DOC*/

	Red3DSLoader = function (redGL, path, fileName, callback) {
		if ( (!(this instanceof Red3DSLoader)) ) return new Red3DSLoader(redGL, path, fileName, callback)
		console.log('~~~~~~~~~~~')
		var self = this;
		var request = new XMLHttpRequest();
		request.open("GET", path + fileName, true);
		request.responseType = 'arraybuffer'
		request.onreadystatechange = function () {
			if ( request.readyState == 4 && request.status === 200 ) {
				console.log(request)
				self['result'] = parser(self, redGL, request['response'])
				if ( callback ) {
					console.log('모델 파싱 종료');
					callback(self['result'])
				}
			} else {
				console.log(request)
			}
		}
		request.send();
		this['redGL'] = redGL;
		this['position'] = 0;
		this['path'] = path;
		this['fileName'] = fileName;
		this['callback'] = callback;
		this['resultMesh'] = RedMesh(redGL)
		this['resultMesh']['name'] = 'instanceOfRed3DSLoader_' + RedGL.makeUUID()
		this['result'] = null;
	};
	parser = (function () {
		var readFile;
		var readChunk, nextChunk, endChunk;
		var readWord;
		var readSize;
		var resetPosition;
		var readMeshData;
		var readMesh;
		var readFloat;
		var readNamedObject;
		var readString
		var readByte
		var readFaceArray;
		readChunk = function (target, data) {
			var chunk = {};
			chunk.cur = target.position;
			chunk.id = readWord(target, data);
			chunk.size = readSize(target, data);
			chunk.end = chunk.cur + chunk.size;
			chunk.cur += 6;
			return chunk;
		}
		nextChunk = function (target, data, chunk) {
			if ( chunk.cur >= chunk.end ) return 0;
			target.position = chunk.cur;
			try {
				var next = readChunk(target, data);
				chunk.cur += next.size;
				return next.id;
			} catch ( e ) {
				console.log('Unable to read chunk at ' + target.position);
				return 0;
			}
		}
		endChunk = function (target, chunk) {
			target.position = chunk.end;
		}
		readWord = function (target, data) {
			var v = data.getUint16(target.position, true);
			target.position += 2;
			return v;
		}
		readSize = function (target, data) {
			var v = data.getUint32(target.position, true);
			target.position += 4;
			return v;
		}
		readByte = function (target, data) {
			var v = data.getUint8(target.position, true);
			target.position += 1;
			return v;
		}
		readString = function (target, data, maxLength) {
			var s = '';
			for ( var i = 0; i < maxLength; i++ ) {
				var c = readByte(target, data);
				if ( !c ) {
					break;
				}
				s += String.fromCharCode(c);
			}
			return s;
		}
		readFloat = function (target, data) {
			try {
				var v = data.getFloat32(target.position, true);
				target.position += 4;
				return v;
			} catch ( e ) {
				console.log(e + ' ' + target.position + ' ' + data.byteLength);
			}
		}
		resetPosition = function (target) {
			target.position -= 6;
		}
		readMeshData = function (target, data, path) {
			var chunk = readChunk(target, data);
			var next = nextChunk(target, data, chunk);
			while ( next !== 0 ) {
				if ( next === MESH_VERSION ) {
					var version = +readSize(target, data);
					console.log('Mesh Version: ' + version);
				} else if ( next === MASTER_SCALE ) {
					var scale = readFloat(target, data);
					console.log('Master scale: ' + scale);
					// this.group.scale.set(scale, scale, scale);
				} else if ( next === NAMED_OBJECT ) {
					console.log('Named Object');
					resetPosition(target, data);
					readNamedObject(target, data);
				} else if ( next === MAT_ENTRY ) {
					console.log('Material');
					resetPosition(target, data);
					// readMaterialEntry(target, data, path);
				} else {
					console.log('Unknown MDATA chunk: ' + next.toString(16));
				}
				next = nextChunk(target, data, chunk);
			}
		}
		readFaceArray = function (target, data, mesh) {
			var chunk = readChunk(target, data);
			var faces = readWord(target, data);
			console.log('   Faces: ' + faces);
			var index = [];
			for ( var i = 0; i < faces; ++i ) {
				index.push(readWord(target, data), readWord(target, data), readWord(target, data));
				var visibility = readWord(target, data);
			}
			// mesh.geometry.setIndex( index );
			//The rest of the FACE_ARRAY chunk is subchunks
			while ( target.position < chunk.end ) {
				var chunk = readChunk(target, data);
				if ( chunk.id === MSH_MAT_GROUP ) {
					console.log('      Material Group');
					resetPosition(target, data);
					// var group = readMaterialGroup(  target,data );
					//
					// var material = target.materials[ group.name ];
					//
					// if ( material !== undefined )	{
					//
					// 	mesh.material = material;
					//
					// 	if ( material.name === '' )		{
					//
					// 		material.name = mesh.name;
					//
					// 	}
					//
					// }
				} else {
					console.log('      Unknown face array chunk: ' + chunk.toString(16));
				}
				endChunk(target, chunk);
			}
			endChunk(target, chunk);
			return index
		}
		readMesh = function (target, data) {
			var chunk = readChunk(target, data);
			var next = nextChunk(target, data, chunk);
			// var geometry = new THREE.BufferGeometry();
			var uvs = [];
			var indices;
			while ( next !== 0 ) {
				if ( next === POINT_ARRAY ) {
					var points = readWord(target, data);
					console.log('   Vertex: ' + points);
					//BufferGeometry
					var vertices = [];
					for ( var i = 0; i < points; i++ ) {
						vertices.push(readFloat(target, data));
						vertices.push(readFloat(target, data));
						vertices.push(readFloat(target, data));
					}
				} else if ( next === FACE_ARRAY ) {
					resetPosition(target, data);
					indices = readFaceArray(target, data, mesh);
				} else if ( next === TEX_VERTS ) {
					var texels = readWord(target, data);
					console.log('   UV: ' + texels);
					//BufferGeometry
					var uvs = [];
					for ( var i = 0; i < texels; i++ ) {
						uvs.push(readFloat(target, data));
						uvs.push(readFloat(target, data));
					}
				} else if ( next === MESH_MATRIX ) {
					console.log('   Tranformation Matrix (TODO)');
					var values = [];
					for ( var i = 0; i < 12; i++ ) {
						values[i] = readFloat(target, data);
					}
					var matrix = mat4.create()
					//X Line
					matrix[0] = values[0];
					matrix[1] = values[6];
					matrix[2] = values[3];
					matrix[3] = values[9];
					//Y Line
					matrix[4] = values[2];
					matrix[5] = values[8];
					matrix[6] = values[5];
					matrix[7] = values[11];
					//Z Line
					matrix[8] = values[1];
					matrix[9] = values[7];
					matrix[10] = values[4];
					matrix[11] = values[10];
					//W Line
					matrix[12] = 0;
					matrix[13] = 0;
					matrix[14] = 0;
					matrix[15] = 1;
					// matrix.transpose();
					// var inverse = mat4.craete();
					// inverse.getInverse(matrix, true);
					// geometry.applyMatrix(inverse);
					// matrix.decompose(mesh.position, mesh.quaternion, mesh.scale);
				} else {
					console.log('   Unknown mesh chunk: ' + next.toString(16));
				}
				next = nextChunk(target, data, chunk);
			}
			endChunk(target, chunk);
			// geometry.computeVertexNormals();
			var interleaveBuffer;
			var indexBuffer;
			var normalData = RedGLUtil.calculateNormals(vertices, indices)
			console.log('vertices', vertices)
			console.log('normalData', normalData)
			var interleaveData = []
			var i = 0, len = vertices.length / 3
			for ( i; i < len; i++ ) {
				interleaveData.push(vertices[i * 3 + 0], vertices[i * 3 + 1], vertices[i * 3 + 2])
				interleaveData.push(normalData[i * 3 + 0], normalData[i * 3 + 1], normalData[i * 3 + 2])
				interleaveData.push(uvs[i * 2 + 0], uvs[i * 2 + 1])
			}
			interleaveBuffer = RedBuffer(target['redGL'], 'testRed3DS', RedBuffer.ARRAY_BUFFER, new Float32Array(interleaveData), [
				RedInterleaveInfo('aVertexPosition', 3),
				RedInterleaveInfo('aVertexNormal', 3),
				RedInterleaveInfo('aTexcoord', 2)
			])
			indexBuffer = RedBuffer(target['redGL'], 'testRed3DS', RedBuffer.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices))
			var material = RedColorPhongTextureMaterial(target['redGL'],'#00ff00')
			var tGeo = RedGeometry(interleaveBuffer, indexBuffer)
			var mesh = RedMesh(target['redGL'], tGeo, material)
			mesh.name = 'mesh'+RedGL.makeUUID();
			mesh.matrix = matrix
			return mesh;
		}
		readNamedObject = function (target, data) {
			var chunk = readChunk(target, data);
			var name = readString(target, data, 64);
			chunk.cur = target.position;
			var next = nextChunk(target, data, chunk);
			while ( next !== 0 ) {
				if ( next === N_TRI_OBJECT ) {
					resetPosition(target, data);
					var mesh = readMesh(target, data);
					mesh.name = name;
					target['resultMesh'].addChild(mesh)
					console.log('readNamedObject', name)
				} else {
					console.log('Unknown named object chunk: ' + next.toString(16));
				}
				next = nextChunk(target, data, chunk);
			}
			endChunk(target, chunk);
		}
		readFile = function (target, arraybuffer, path) {
			var data = new DataView(arraybuffer);
			console.log(data)
			var chunk = readChunk(target, data);
			console.log(chunk)
			if ( chunk.id === MLIBMAGIC || chunk.id === CMAGIC || chunk.id === M3DMAGIC ) {
				var next = nextChunk(target, data, chunk);
				while ( next !== 0 ) {
					if ( next === M3D_VERSION ) {
						var version = readSize(target, data);
						console.log('3DS file version: ' + version);
					} else if ( next === MDATA ) {
						resetPosition(target, data);
						readMeshData(target, data, path);
					} else {
						console.log('Unknown main chunk: ' + next.toString(16));
					}
					next = nextChunk(target, data, chunk);
				}
			}
			console.log('Parsed');
		};
		return function (tRed3DSLoader, redGL, rawData) {
			console.log('파싱시작', tRed3DSLoader['path'] + tRed3DSLoader['fileName']);
			// console.log('rawData', rawData);
			readFile(tRed3DSLoader, rawData)
			return {
				fileName: tRed3DSLoader['fileName'],
				path: tRed3DSLoader['path'],
				resultMesh: tRed3DSLoader['resultMesh']
			}
		}
	})();
	Object.freeze(Red3DSLoader);
})();