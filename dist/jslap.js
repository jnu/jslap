(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["jslap"] = factory();
	else
		root["jslap"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _matrix = __webpack_require__(1);

	var _loop = function _loop(_key2) {
	  if (_key2 === "default") return 'continue';
	  Object.defineProperty(exports, _key2, {
	    enumerable: true,
	    get: function get() {
	      return _matrix[_key2];
	    }
	  });
	};

	for (var _key2 in _matrix) {
	  var _ret = _loop(_key2);

	  if (_ret === 'continue') continue;
	}

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Matrix = __webpack_require__(2);
	
	Object.defineProperty(exports, 'Matrix', {
	  enumerable: true,
	  get: function get() {
	    return _Matrix.default;
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * @fileOverview Matrix class
	 */
	
	var Matrix = (function () {
	    function Matrix(w, h) {
	        _classCallCheck(this, Matrix);
	
	        h = this.rows = h === undefined ? w : h;
	        this.cols = w;
	        var size = this.size = w * h;
	        this.elements = new Float32Array(size);
	    }
	
	    _createClass(Matrix, [{
	        key: "get",
	        value: function get(row, col) {
	            var rows = this.rows;
	            var cols = this.cols;
	            var elements = this.elements;
	
	            if (col < 0 || col >= cols) {
	                throw new RangeError("Column " + col + " is out of matrix bounds");
	            }
	            if (row < 0 || row >= rows) {
	                throw new RangeError("Row " + row + " is out of matrix bounds");
	            }
	
	            // TODO use a macro for accessing vectorized matrix?
	            var idx = cols * row + col;
	            return elements[idx];
	        }
	    }], [{
	        key: "create",
	        value: function create(w, h) {
	            return new Matrix(w, h);
	        }
	    }, {
	        key: "zeroes",
	        value: function zeroes(w, h) {
	            return Matrix.create(w, h);
	        }
	    }, {
	        key: "diag",
	        value: function diag(v, w, h) {
	            var M = new Matrix(w, h);
	            var size = M.size;
	            var elements = M.elements;
	            // Set the diagonal to v
	
	            var i = 0;
	            while (i < size) {
	                elements[i] = v;
	                i = i + 1 + w;
	            }
	            return M;
	        }
	    }, {
	        key: "eye",
	        value: function eye(w, h) {
	            return Matrix.diag(1, w, h);
	        }
	    }, {
	        key: "from",
	        value: function from(A) {
	            var rows = A.length;
	            var cols = A[0].length;
	            var M = new Matrix(cols, rows);
	            var elements = M.elements;
	
	            var i = rows;
	            while (n--) {}
	        }
	    }]);
	
	    return Matrix;
	})();
	
	exports.default = Matrix;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=jslap.js.map