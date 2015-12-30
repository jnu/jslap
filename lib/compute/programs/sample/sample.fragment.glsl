/**
 * @fileOverview Sample fragment shader
 */

#ifdef GL_ES
precision highp float;
#endif

uniform sampler2D uImage;
varying vec2 vTexCoord;

void main() {
    gl_FragColor = texture2D(uImage, vTexCoord);
}
