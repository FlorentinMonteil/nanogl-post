module.exports = function( obj ){
var __t,__p='';
__p+='\nprecision highp float;\n\nuniform vec2 uInvTargetSize;\nuniform vec2 uViewportScale;\n\nattribute vec2 aTexCoord0;\n\nvarying vec2 tcColor0;\nvarying vec2 tcColor1;\nvarying vec2 tcDepth0;\nvarying vec2 tcDepth1;\nvarying vec2 tcDepth2;\nvarying vec2 tcDepth3;\n\n\nvoid main(void)\n{\n  vec2 tc = aTexCoord0 * uViewportScale;\n\n  tcColor0 = tc + vec2( -0.5, -0.5 ) * uInvTargetSize;\n  tcColor1 = tc + vec2( +1.5, -0.5 ) * uInvTargetSize;\n  tcDepth0 = tc + vec2( -2.5, -0.5 ) * uInvTargetSize;\n  tcDepth1 = tc + vec2( -0.5, -0.5 ) * uInvTargetSize;\n  tcDepth2 = tc + vec2( +1.5, -0.5 ) * uInvTargetSize;\n  tcDepth3 = tc + vec2( +3.5, -0.5 ) * uInvTargetSize;\n\n  gl_Position.xy = 2.0 * aTexCoord0-vec2(1.0,1.0);\n  gl_Position.zw = vec2(0.0,1.0);\n}\n';
return __p;
}