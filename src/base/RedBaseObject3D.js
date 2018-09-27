"use strict";
var RedBaseObject3D;
(function () {
    /**DOC:
     {
		 constructorYn : true,
		 title :`RedBaseObject3D`,
		 description : `
			 RedBaseObject3D 기저층
		 `,
		 return : 'RedBaseObject3D Instance'
	 }
     :DOC*/
    RedBaseObject3D = function () {
    };
    /**DOC:
     {
		 title :`RedBaseObject3D.build`,
		 code : 'STATIC METHOD',
		 description : `
			RedBaseObject3D가 가지고있는 속성을 해당 인스턴스에 복사하기위해사용
		 `,
		 params : {
			 gl : [
				 {type : 'glContext' }
			 ]
		 },
		 example : `
		 var testMesh = function (redGL) {
			 var tGL;
			 tGL = redGL.gl;
			 RedBaseObject3D['build'].call(this, tGL)
		 }
		 `,
		 return : 'void'
	 }
     :DOC*/
    RedBaseObject3D['build'] = function (gl) {
        this['name'] = 'object3D_' + (RedGL.makeUUID() + 1)
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`useTransparentSort`,
			 description : `
				 투명도 소팅 여부
				 기본값 : false
			 `,
			 return : 'Boolean'
		 }
         :DOC*/
        this['useTransparentSort'] = false
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`useCullFace`,
			 description : `
				 컬링 사용여부
				 기본값 : true
			 `,
			 return : 'Boolean'
		 }
         :DOC*/
        this['useCullFace'] = true;
        /**DOC:
         {
             code : 'PROPERTY',
			 title :`cullFace`,
			 description : `
				 컬링 페이스 설정
				 기본값 : gl.BACK
			 `,
			 return : 'gl 상수'
		 }
         :DOC*/
        this['cullFace'] = gl.BACK;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`useDepthMask`,
			 description : `
				 뎁스 테스트 사용여부
				 기본값 : true
			 `,
			 return : 'Boolean'
		 }
         :DOC*/
        this['useDepthMask'] = true;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`useDepthTest`,
			 description : `
				 뎁스 테스트 사용여부
				 기본값 : true
			 `,
			 return : 'Boolean'
		 }
         :DOC*/
        this['useDepthTest'] = true;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`depthTestFunc`,
			 description : `
				 뎁스 테스트 함수 설정
				 기본값 : gl.LEQUAL
			 `,
			 return : 'gl 상수'
		 }
         :DOC*/
        this['depthTestFunc'] = gl.LEQUAL;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`useBlendMode`,
			 description : `
				 블렌드 모드 사용여부
				 기본값 : true
			 `,
			 return : 'Boolean'
		 }
         :DOC*/
        this['useBlendMode'] = true;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`blendSrc`,
			 description : `
				 블렌드 소스값 factor
				 기본값 : gl.ONE
			 `,
			 return : 'gl 상수'
		 }
         :DOC*/
        this['blendSrc'] = gl.SRC_ALPHA;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`blendDst`,
			 description : `
				 블렌드 목표값 factor
				 기본값 : gl.ONE_MINUS_SRC_ALPHA
			 `,
			 return : 'gl 상수'
		 }
         :DOC*/
        this['blendDst'] = gl.ONE_MINUS_SRC_ALPHA;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`drawMode`,
			 description : `
				 기본값 : gl.TRIANGLES
				 drawCall시 적용한 드로잉 모드
			 `,
			 return : 'gl 상수'
		 }
         :DOC*/
        this['drawMode'] = gl.TRIANGLES;
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`pointSize`,
			 description : `
				 기본값 : 1
				 gl.POINTS로 그릴경우 반영될 포인트 사이즈.
			 `,
			 return : 'Number'
		 }
         :DOC*/
        this['pointSize'] = 1;
        this['x'] = this['y'] = this['z'] = 0;
        this['rotationX'] = this['rotationY'] = this['rotationZ'] = 0;
        this['scaleX'] = this['scaleY'] = this['scaleZ'] = 1;
        /**DOC:
         {
		    code : 'PROPERTY',
			title :`matrix`,
			description : `
			matrix 자동계산여부
			`,
			return : 'mat4'
		 }
         :DOC*/
        this['autoUpdateMatrix'] = true;
        this['_renderAutoUpdateMatrix'] = true;
        /**DOC:
         {
		    code : 'PROPERTY',
			title :`matrix`,
			description : `
			matrix 렌더링시 자동계산
			`,
			return : 'mat4'
		 }
         :DOC*/
        this['matrix'] = mat4.create();
        this['cachedMatrix'] = mat4.create();
        this['localMatrix'] = mat4.create();
        /**DOC:
         {
		    code : 'PROPERTY',
			title :`normalMatrix`,
			description : `
			normalMatrix 렌더링시 자동계산
			`,
			return : 'mat4'
		 }
         :DOC*/
        this['normalMatrix'] = mat4.create();
        this['cachedNormalMatrix'] = mat4.create();
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`children`,
			 description : `
			    자식 리스트
			 `,
			 return : 'Array'
		 }
         :DOC*/
        this['children'] = [];
        /**DOC:
         {
		     code : 'PROPERTY',
			 title :`useLOD`,
			 description : `LOD사용여부`,
			 return : 'Boolean'
		 }
         :DOC*/
        this['useLOD'] = false;
        this['_lodLevels'] = {
            /* 1: {
                geometry : ~~,
                material : ~~~
                둘중하나는 있어야하며
                하나만 입력할경우 없는쪽은 오리지날 속성이 부여된다.
            }
            */
        };
    };
    RedBaseObject3D.prototype = {
        /**DOC:
         {
			 title :`addLOD`,
			 code : 'METHOD',
			 description : `
				 LOD 추가.
				 추가시 geometry, material 둘중 하나는 반드시 입력되어야함.
			 `,
			 params : {
				 level : [
					  {type : 'Number' }
				 ],
				 distance : [
					 {type : 'Number' }
				 ],
				 geometry : [
					 {type : 'RedGeometry 확장 Instance' }
				 ],
				 material : [
					 {type : 'RedBaseMaterial 확장 Instance' }
				 ]
			 },
			 return : 'void'
		 }
         :DOC*/
        addLOD: (function () {
            var tData;
            return function (level, distance, geometry, material) {
                geometry || material || RedGLUtil.throwFunc('RedBaseObject3D - addLOD : geometry, material 둘중하나는 반드시 입력되어야함');
                typeof level == 'number' || RedGLUtil.throwFunc('RedBaseObject3D - level : 숫자만허용함');
                tData = {
                    level: level,
                    distance: distance,
                    geometry: geometry ? geometry : this['geometry'],
                    material: material ? material : this['material']
                };
                this['_lodLevels'][level] = tData;
            }
        })(),
        /**DOC:
         {
			 title :`removeLOD`,
			 code : 'METHOD',
			 description : `LOD 삭제`,
			 params : {
				 level : [
					 {type : 'int' }
				 ]
			 },
			 return : 'void'
		 }
         :DOC*/
        removeLOD: function (level) {
            if (this['_lodLevels'][level]) delete this['_lodLevels'][level]
        },
        /**DOC:
         {
			 title :`localToWorld`,
			 code : 'METHOD',
			 description : `
				 로컬좌표를 RedWorld 좌표로 변경
			 `,
			  params : {
				 x : [
					 {type : 'Number' }
				 ],
				 y : [
					 {type : 'Number' }
				 ],
				 z : [
					 {type : 'Number' }
				 ]
			 },
			 return : 'Array'
		 }
         :DOC*/
        localToWorld: (function () {
            var t0;
            t0 = mat4.create();
            return function (x, y, z) {
                x = x || 0;
                y = y || 0;
                z = z || 0;
                mat4.identity(t0);
                mat4.translate(t0, t0, [x, y, z]);
                mat4.multiply(t0, this['matrix'], t0);
                return [
                    t0[12],
                    t0[13],
                    t0[14]
                ]
            }
        })(),
        /**DOC:
         {
			 title :`worldToLocal`,
			 code : 'METHOD',
			 description : `
				 RedWorld 좌표를 로컬좌표로 변환
			 `,
			 params : {
				 x : [
					 {type : 'Number' }
				 ],
				 y : [
					 {type : 'Number' }
				 ],
				 z : [
					 {type : 'Number' }
				 ]
			 },
			 return : 'Array'
		 }
         :DOC*/
        worldToLocal: (function () {
            var t0, t1;
            t0 = mat4.create();
            t1 = mat4.create();
            return function (x, y, z) {
                x = x || 0;
                y = y || 0;
                z = z || 0;
                mat4.translate(t0, t0, [x, y, z]);
                mat4.multiply(t1, t0, this['matrix']);
                return [
                    t1[0] * x + t1[1] * y + t1[2] * z + t1[3],
                    t1[4] * x + t1[5] * y + t1[6] * z + t1[7],
                    t1[8] * x + t1[9] * y + t1[10] * z + t1[11]
                ]
            }
        })(),
        /**DOC:
         {
			 title :`getScreenPoint`,
			 code : 'METHOD',
			 description : `
				 스크린좌표반환
			 `,
			 params : {
				 redView : [
					 {type : 'RedView' }
				 ]
			 },
			 return : 'Array'
		 }
         :DOC*/
        getScreenPoint: (function () {
            var resultMTX = mat4.create();
            var tCamera, tViewRect;
            var resultPosition;
            resultPosition = {
                x: 0,
                y: 0,
                z: 0,
                w: 0
            };
            return function (redView) {
                mat4.identity(resultMTX);
                tCamera = redView['camera'];
                tViewRect = redView['_viewRect'];
                if (tCamera instanceof RedBaseController) tCamera = tCamera.camera;
                mat4.multiply(resultMTX, tCamera.perspectiveMTX, tCamera.matrix);
                mat4.multiply(resultMTX, resultMTX, this['matrix']);
                resultPosition.x = resultMTX[12];
                resultPosition.y = resultMTX[13];
                resultPosition.z = resultMTX[14];
                resultPosition.w = resultMTX[15];
                resultPosition.x = resultPosition.x * 0.5 / resultPosition.w + 0.5;
                resultPosition.y = resultPosition.y * 0.5 / resultPosition.w + 0.5;
                return [
                    (tViewRect[0] + resultPosition.x * tViewRect[2]) / window.devicePixelRatio,
                    (tViewRect[1] + (1 - resultPosition.y) * tViewRect[3]) / window.devicePixelRatio
                ]
            }
        })()
    };
    //TODO: xyz,scaleXYZ,rotationXYZ 일단 이 GET/SET을 쓸건지 말껀지 결정해야함
    //TODO: xyz,scaleXYZ,rotationXYZ 렌더러 계산시 get/set 함수 안타게 추적해야함
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`x`,
		 return : 'Number'
	 }
     :DOC*/
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`y`,
		 return : 'Number'
	 }
     :DOC*/
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`z`,
		 return : 'Number'
	 }
     :DOC*/
    // RedDefinePropertyInfo.definePrototype('RedBaseObject3D', 'x', 'number');
    // RedDefinePropertyInfo.definePrototype('RedBaseObject3D', 'y', 'number');
    // RedDefinePropertyInfo.definePrototype('RedBaseObject3D', 'z', 'number');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`rotationX`,
		 return : 'Number'
	 }
     :DOC*/
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`rotationY`,
		 return : 'Number'
	 }
     :DOC*/
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`rotationZ`,
		 return : 'Number'
	 }
     :DOC*/
    // RedDefinePropertyInfo.definePrototype('RedBaseObject3D', 'scaleX', 'number');
    // RedDefinePropertyInfo.definePrototype('RedBaseObject3D', 'scaleY', 'number');
    // RedDefinePropertyInfo.definePrototype('RedBaseObject3D', 'scaleZ', 'number');
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`scaleX`,
		 return : 'Number'
	 }
     :DOC*/
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`scaleY`,
		 return : 'Number'
	 }
     :DOC*/
    /**DOC:
     {
	     code : 'PROPERTY',
		 title :`scaleZ`,
		 return : 'Number'
	 }
     :DOC*/
    // RedDefinePropertyInfo.definePrototype('RedBaseObject3D', 'rotationX', 'number');
    // RedDefinePropertyInfo.definePrototype('RedBaseObject3D', 'rotationY', 'number');
    // RedDefinePropertyInfo.definePrototype('RedBaseObject3D', 'rotationZ', 'number');
    Object.defineProperty(RedBaseObject3D.prototype, 'geometry', {
        get: function () {
            return this['_geometry'];
        },
        set: function (v) {
            if (v && !(v instanceof RedGeometry)) RedGLUtil.throwFunc('geometry : RedGeometry Instance만 허용.', '입력값 : ' + v);
            this['_geometry'] = v
        }
    });
    Object.defineProperty(RedBaseObject3D.prototype, 'material', {
        get: function () {
            return this['_material'];
        },
        set: function (v) {
            if (v && !(v instanceof RedBaseMaterial)) RedGLUtil.throwFunc('material : RedBaseMaterial Instance만 허용.', '입력값 : ' + v)
            this['_material'] = v
        }
    });
    Object.freeze(RedBaseObject3D);
})();
