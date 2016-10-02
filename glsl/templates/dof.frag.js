module.exports = function( obj ){
var __t,__p='';
__p+='// uniform sampler2D tDofMedBlur;\n// uniform sampler2D tDofBlur;\n// uniform vec2      uDofInvTargetSize;\n\n{\n  mediump vec3 small;\n  mediump vec4 med;\n  mediump vec3 large;\n  mediump float nearCoc;\n  mediump float farCoc;\n  mediump float coc;\n\n  small   = GetSmallBlurSample( texCoordVP );\n  med     = texture2D( tDofMedBlur, texCoordVP );\n  large   = texture2D( tDofBlur   , texCoordVP ).rgb;\n  nearCoc = med.a;// * 0.000001;\n\n  // if ( depth > 1.0e6 )\n  // {\n  //   coc = nearCoc; // We don\'t want to blur the sky.\n  // }\n  // else\n  // {\n\n\n    // dofEqFar.x and dofEqFar.y specify the linear ramp to convert\n   // to depth for the distant out-of-focus region.\n   // dofEqFar.z is the ratio of the far to the near blur radius.\n  farCoc = clamp( uDofEqFar.x * sceneDepth + uDofEqFar.y, 0.0, 1.0 );\n  coc = max( nearCoc, farCoc * uDofEqFar.z );\n\n\n  // if ( sceneDepth > .999999 )\n  // {\n  //    coc = nearCoc; // We don\'t want to blur the sky.\n  // }\n\n\n  // }\n  // vec3 bak = c;\n  InterpolateDof( c, small, med.rgb, large, coc );\n\n  // c *= 0.000001;\n  // c += nearCoc;\n\n}\n\n';
return __p;
}