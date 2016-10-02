module.exports = function( obj ){
var __t,__p='';
__p+='precision mediump float;\n\nuniform sampler2D tInput;\nuniform sampler2D tDepth;\n\nuniform vec2 uDofEq;\nuniform highp vec2 uInvTargetSize;\n\nvarying vec2 tcColor0;\nvarying vec2 tcColor1;\nvarying vec2 tcDepth0;\nvarying vec2 tcDepth1;\nvarying vec2 tcDepth2;\nvarying vec2 tcDepth3;\n\n\nvec4 saturate( vec4 v ){\n  return clamp( v, 0.0, 1.0 );\n}\n\nvoid main(void)\n{\n\n  vec3 color;\n  vec4 depth;\n  vec4 coc;\n\n  vec2 rowDelta;\n\n  rowDelta = vec2( 0.0, 2.0 * uInvTargetSize.y );\n  // Use bilinear filtering to average 4 color samples for free.\n\n  color  = texture2D( tInput, tcColor0             ).rgb;\n  color += texture2D( tInput, tcColor1             ).rgb;\n  color += texture2D( tInput, tcColor0 + rowDelta ).rgb;\n  color += texture2D( tInput, tcColor1 + rowDelta ).rgb;\n  color /= 4.0;\n\n  // Process 4 samples at a time to use vector hardware efficiently.\n   // The CoC will be 1 if the depth is negative, so use "min" to pick\n   // between "sceneCoc" and "viewCoc".\n  depth.x = texture2D( tDepth, tcDepth0             ).r;\n  depth.y = texture2D( tDepth, tcDepth1             ).r;\n  depth.z = texture2D( tDepth, tcDepth2             ).r;\n  depth.w = texture2D( tDepth, tcDepth3             ).r;\n\n  coc = saturate( uDofEq.x * depth + uDofEq.y );\n\n\n  rowDelta = vec2( 0.0, -2.0 * uInvTargetSize.y );\n  depth.x = texture2D( tDepth, tcDepth0 + rowDelta ).r;\n  depth.y = texture2D( tDepth, tcDepth1 + rowDelta ).r;\n  depth.z = texture2D( tDepth, tcDepth2 + rowDelta ).r;\n  depth.w = texture2D( tDepth, tcDepth3 + rowDelta ).r;\n\n  coc = max( coc, saturate( uDofEq.x * depth + uDofEq.y ) );\n\n\n  rowDelta = vec2( 0.0, 2.0 * uInvTargetSize.y );\n  depth.x = texture2D( tDepth, tcDepth0 + rowDelta ).r;\n  depth.y = texture2D( tDepth, tcDepth1 + rowDelta ).r;\n  depth.z = texture2D( tDepth, tcDepth2 + rowDelta ).r;\n  depth.w = texture2D( tDepth, tcDepth3 + rowDelta ).r;\n\n  coc = max( coc, saturate( uDofEq.x * depth + uDofEq.y ) );\n\n\n  rowDelta = vec2( 0.0, 4.0 * uInvTargetSize.y );\n  depth.x = texture2D( tDepth, tcDepth0 + rowDelta ).r;\n  depth.y = texture2D( tDepth, tcDepth1 + rowDelta ).r;\n  depth.z = texture2D( tDepth, tcDepth2 + rowDelta ).r;\n  depth.w = texture2D( tDepth, tcDepth3 + rowDelta ).r;\n\n  coc = max( coc, saturate( uDofEq.x * depth + uDofEq.y ) );\n\n\n  float maxCoc = max( max( coc.x, coc.y ), max( coc.z, coc.w ) );\n  gl_FragColor = vec4( color, maxCoc );\n\n}\n';
return __p;
}