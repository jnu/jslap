/**
 * @fileOverview Matrix class
 */

export default class Matrix {

    constructor(w, h) {
        h = this.rows = h === undefined ? w : h;
        this.cols = w;
        let size = this.size = w * h;
        this.elements = new Float32Array(size);
    }

    get(row, col) {
        let { rows, cols, elements } = this;

        if (col < 0 || col >= cols) {
            throw new RangeError(`Column ${col} is out of matrix bounds`);
        }
        if (row < 0 || row >= rows) {
            throw new RangeError(`Row ${row} is out of matrix bounds`);
        }

        // TODO use a macro for accessing vectorized matrix?
        let idx = cols * row + col;
        return elements[idx];
    }

    static create(w, h) {
        return new Matrix(w, h);
    }

    static zeroes(w, h) {
        return Matrix.create(w, h);
    }

    static diag(v, w, h) {
        let M = new Matrix(w, h);
        let { size, elements } = M;
        // Set the diagonal to v
        let i = 0;
        while (i < size) {
            elements[i] = v;
            i = i + 1 + w;
        }
        return M;
    }

    static random(w, h, min = 0, max = 1) {
        let M = new Matrix(w, h);
        let { size, elements } = M;
        let i = size;
        let range = max - min;
        while (i--) {
            elements[i] = Math.random() * range + min;
        }
        return M;
    }

    static eye(w, h) {
        return Matrix.diag(1, w, h);
    }

    static from(A) {
        let rows = A.length;
        let cols = A[0].length;
        let M = new Matrix(cols, rows);
        let { elements } = M;
        let i = rows;
        while (n--) {

        }
    }

}
