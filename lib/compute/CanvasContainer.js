/**
 * WebGL Context via Canvas
 */
/* eslint-env browser */

export default class CanvasContainer {

    constructor(id) {
        this.id = id;
        let canvas = this.canvas = document.createElement('canvas');
        canvas.setAttribute('id', id);
        canvas.style.display = 'none';

        document.body.appendChild(canvas);

        this.gl = canvas.getContext('webgl');
        this.twod = canvas.getContext('2d');
    }

    setSize(w, h) {
        let { canvas, gl } = this;
        canvas.setAttribute('width', w);
        canvas.setAttribute('height', h);
        gl.viewport(0, 0, w, h);
    }

    getGLContext() {
        return this.gl;
    }

}
