/**
 * @fileOverview Global unique ID
 */

/**
 * ID counter
 * @private
 * @type {Number}
 */
let i = 0;

/**
 * Create an ID unique within the application
 * @name uniqueId
 * @param  {?String} s - optional prefix for ID
 * @return {String}
 */
export default (s = '') => `${s}${i++}`;
