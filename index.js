/**
 * JSLAP
 *
 * Entry point
 */

export * from './lib/matrix';

export * from './lib/compute';

if (DEBUG) {
    require('./src/dev');
}
