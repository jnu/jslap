/**
 * GLContainer
 *
 * Allocates a context for GL computation work
 */

//import Matrix from '../matrix/Matrix';
import uniqueId from '../util/uniqueId';
import CanvasContainer from './CanvasContainer';
import GLRC from '../util/WebGLRenderingContext';
import log from 'loglevel';

const GL_FLOAT = GLRC.FLOAT;
const GL_COMPILE_STATUS = GLRC.COMPILE_STATUS;
const GL_LINK_STATUS = GLRC.LINK_STATUS;
const GL_VERTEX_SHADER = GLRC.VERTEX_SHADER;
const GL_FRAGMENT_SHADER = GLRC.FRAGMENT_SHADER;
const GL_TRIANGLES = GLRC.TRIANGLES;
const GL_STATIC_DRAW = GLRC.STATIC_DRAW;
const GL_ARRAY_BUFFER = GLRC.ARRAY_BUFFER;
const GL_RGBA = GLRC.RGBA;
const GL_UNSIGNED_BYTE = GLRC.UNSIGNED_BYTE;
const GL_TEXTURE_2D = GLRC.TEXTURE_2D;
const GL_TEXTURE_MIN_FILTER = GLRC.TEXTURE_MIN_FILTER;
const GL_LINEAR = GLRC.LINEAR;
const GL_TEXTURE_WRAP_S = GLRC.TEXTURE_WRAP_S;
const GL_TEXTURE_WRAP_T = GLRC.TEXTURE_WRAP_T;
const GL_CLAMP_TO_EDGE = GLRC.CLAMP_TO_EDGE;
const GL_FRAMEBUFFER = GLRC.FRAMEBUFFER;
const GL_COLOR_ATTACHMENT0 = GLRC.COLOR_ATTACHMENT0;


let createShader = (gl, type, source) => {
    let shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (DEBUG) {
        // Check that shader compiled correctly
        if (!gl.getShaderParameter(shader, GL_COMPILE_STATUS)) {
            log.error(gl.getShaderInfoLog(shader));
        }
    }

    return shader;
};

export default class GLC {

    constructor() {
        let id = this.id = uniqueId('glc');
        let container = this.container = new CanvasContainer(id);
        let gl = this.gl = container.getGLContext();
        this.program = null;
        this.outBuffer = null;
        this.w = null;
        this.h = null;
        this.texture = null;
    }

    loadProgram(program) {
        let { gl } = this;
        let { vertex, fragment } = program;

        // Compile shaders
        let glv = createShader(gl, GL_VERTEX_SHADER, vertex);
        let glf = createShader(gl, GL_FRAGMENT_SHADER, fragment);

        // Create program
        let glp = gl.createProgram();
        gl.attachShader(glp, glv);
        gl.attachShader(glp, glf);
        gl.linkProgram(glp);

        if (DEBUG) {
            // Check that program linked correctly
            if (!gl.getProgramParameter(glp, GL_LINK_STATUS)) {
                log.error(gl.getProgramInfoLog(glp));
            }
        }

        gl.useProgram(glp);

        this.program = glp;

        return this;
    }

    setSize(w, h) {
        this.container.setSize(w, h);
        this.w = w;
        this.h = h;
        this.outBuffer = new Uint8Array(w * h * 4);
        return this;
    }

    sendVertexBuffer(target, sourceBuffer, size = 2, type = GL_FLOAT) {
        let { gl, program } = this;

        if (!program) {
            let msg = 'noprog - Trying to use buffer with no loaded program';
            log.error(msg);
            throw new Error(msg);
        }

        let glBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, glBuffer);

        gl.bufferData(GL_ARRAY_BUFFER, sourceBuffer, GL_STATIC_DRAW);

        let attribute = gl.getAttribLocation(program, target);

        gl.enableVertexAttribArray(attribute);
        gl.vertexAttribPointer(attribute, size, type, false, 0, 0);

        return this;
    }

    sendFullSquare() {
        return this.sendVertexBuffer('aVertexPosition', new Float32Array([
            -1,  1,  1,  1,  1, -1,
            -1,  1,  1, -1, -1, -1
        ]));
    }

    sendTexSquare() {
        return this.sendVertexBuffer('aTexCoord', new Float32Array([
            0.0,  0.0,
            1.0,  0.0,
            0.0,  1.0,
            0.0,  1.0,
            1.0,  0.0,
            1.0,  1.0
        ]));
    }

    sendFloatVec4(target, vec4) {
        let { gl, program } = this;

        let uniformLocation = gl.getUniformLocation(program, target);
        gl.uniform4fv(uniformLocation, vec4);

        return this.sendFullSquare();
    }

    sendMatrix(mtx) {
        let { gl } = this;
        let texture = this.texture = gl.createTexture();
        let data = new Uint8Array(mtx.elements.buffer);
        gl.bindTexture(GL_TEXTURE_2D, texture);
        gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
        gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
        gl.texParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
        gl.texImage2D(GL_TEXTURE_2D, 0, GL_RGBA, this.w, this.h, 0, GL_RGBA, GL_UNSIGNED_BYTE, data);
        return this;
    }

    seal() {
        let { gl } = this;

        this.sendFullSquare();
        this.sendTexSquare();

        gl.drawArrays(GL_TRIANGLES, 0, 6);

        return this;
    }

    read() {
        let { gl, outBuffer, w, h, texture } = this;

        if (!outBuffer || !w || !h) {
            let msg = 'nosize - Trying to use buffer without setting size';
            log.error(msg);
            throw new Error(msg);
        }

        let fb = gl.createFramebuffer();
        gl.bindFramebuffer(GL_FRAMEBUFFER, fb);
        gl.framebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0, GL_TEXTURE_2D, texture, 0);
        gl.readPixels(0, 0, w, h, GL_RGBA, GL_UNSIGNED_BYTE, outBuffer);

        // View the UInt array as a Float32
        return new Float32Array(outBuffer.buffer);
    }

}
