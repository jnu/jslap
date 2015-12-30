/**
 * @fileOverview Provides WebGLRenderingContext. Presumably will be defined
 * in the global scope. Encapsulate here for easier test shimming.
 */
/* eslint-env browser */

const GLRC = (typeof window !== undefined) ?
    window.WebGLRenderingContext :
    {};

export default GLRC;
