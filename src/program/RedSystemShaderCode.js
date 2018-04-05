"use strict";
var RedSystemShaderCode;
(function () {
    /**DOC:
        {
            constructorYn : true,
            title :`RedSystemShaderCode`,
            description : `
                쉐이더 기본 정의 코드
                쉐이더 생성시 자동으로 추가되어 들어감.
            `,
            return : 'RedSystemShaderCode'
        }
    :DOC*/
    RedSystemShaderCode = {
        /**DOC:
            {
                code: 'CONST',
                title :`RedSystemShaderCode.vShareSource`,
                description : `
                    버텍스 쉐이더 기본 생성코드 리스트
                `,
                return : 'Array'
            }
        :DOC*/
        vShareSource: [
            'attribute vec3 aVertexPosition',
            'attribute vec3 aVertexNormal',
            'varying vec3 vVertexNormal',

            'attribute vec2 aTexcoord',
            'varying vec2 vTexcoord',

            'uniform float uTime',
            'varying float vTime',

            'uniform vec2 uResolution',
            'varying vec2 vResolution',

            'uniform mat4 uMVMatrix',
            'uniform mat4 uNMatrix',
            'uniform mat4 uPMatrix',
            'uniform mat4 uCameraMatrix'
        ],
        /**DOC:
            {
                code: 'CONST',
                title :`RedSystemShaderCode.fShareSource`,
                description : `
                    프레그먼트 쉐이더 기본 생성코드 리스트
                `,
                return : 'Array'
            }
        :DOC*/
        fShareSource: [
            'varying vec3 vVertexNormal',
            'varying vec2 vTexcoord',

            'varying float vTime',
            'varying vec2 vResolution',

            'const int DIRETIONAL_MAX = 5',
            'uniform vec3 uDirectionalLightPosition[5]',
            'uniform vec4 uDirectionalLightColor[5]',
            'uniform float uDirectionalLightIntensity[5]',
            'uniform int uDirectionalLightNum',

            'uniform vec4 uAmbientLightColor',
            'uniform float uAmbientIntensity'

        ],
        systemUniform: {}
    };
    [RedSystemShaderCode.vShareSource, RedSystemShaderCode.fShareSource].forEach(function (data) {
        data.forEach(function (v) {
            v = v.split(' ')
            if (v[0] == 'uniform') {
                RedSystemShaderCode.systemUniform[v[2]] = 1
            }
        })
    });
    console.log(RedSystemShaderCode)
    Object.freeze(RedSystemShaderCode)
})();