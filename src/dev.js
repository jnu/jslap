/**
 * Interactive dev mode
 */
/* eslint-env browser */

window.__loadDevMode__ = () => {

/**
 * Perf entity labels
 * @type {Object}
 */
window.perfData = {};


/**
 * Get DOM element corresponding to perf key. Create as necessary.
 * @param  {String} key - perf key
 * @return {Element}
 */
window.getPerfEl = function(key) {

    let domId = `PERF-${key}`;

    let el = document.getElementById(domId);

    if (!el) {
        el = document.createElement('pre');
        el.setAttribute('id', domId);
        document.getElementById('perf').appendChild(el);
    }

    return el;
};


// last animation frame
window._lastFrame = 0;
// update perf data
window.updatePerf = function() {
    let now = performance.now();

    if ((now - window._lastFrame) > 1000) {

        // Loop over all perf labels
        Object.keys(window.perfData).forEach(key => {
            let el = window.getPerfEl(key);

            let perfTxt = `${key}\n===\n`;

            let perfTags = window.perfData[key];

            // write measurements
            ['send', 'read', 'all'].forEach(tag => {
                // take average of durations
                let p = performance.getEntriesByName(perfTags[tag])
                    .reduce((agg, cur, i) => agg - (agg - cur.duration) / (i + 1), 0);
                perfTxt += `${tag}:\t${p.toFixed(3)}ms\n`;
            });

            perfTxt += `right:\t${perfTags.correct}`;

            el.innerHTML = perfTxt;
        });

        window._lastFrame = now;
    }

    window.requestAnimationFrame(window.updatePerf);
};
window.updatePerf();


/**
 * Check that the given array matches the expected array
 * @param  {Number[]} actual
 * @param  {Number[]} expected
 * @return {Boolean}
 */
window.verifyRead = function(actual, expected) {
    let n = expected.size;
    let x = actual.size;
    if (n !== x) {
        return false;
    }

    while (n--) {
        if (actual[n] !== expected[n]) {
            return false;
        }
    }

    return true;
};


/**
 * Time matrix I/O cycles: write, compute, read. Store the perf entity tags
 * under the label in the global scope.
 * @param  {String} label - perf label
 * @param  {GLC} ctx - gpu context
 * @param  {Matrix} mtx - Matrix
 */
window.timed = function(label, ctx, mtx) {
    let size = `${mtx.rows}x${mtx.cols}`;
    performance.mark(`${label}_send_start_${size}`);
    ctx.sendMatrix(mtx).seal();
    performance.mark(`${label}_send_end_${size}`);
    performance.mark(`${label}_read_start_${size}`);
    let r = ctx.read();
    performance.mark(`${label}_read_end_${size}`);

    // Measure perf
    let sendTag = `${label}_send_${size}`;
    let readTag = `${label}_read_${size}`;
    let allTag = `${label}_${size}`;
    performance.measure(
        sendTag,
        `${label}_send_start_${size}`,
        `${label}_send_end_${size}`
    );
    performance.measure(
        readTag,
        `${label}_read_start_${size}`,
        `${label}_read_end_${size}`
    );
    performance.measure(
        allTag,
        `${label}_send_start_${size}`,
        `${label}_read_end_${size}`
    );

    // Store perf tag
    let perfTag = `${label}_[${size}]`;
    if (!perfData.hasOwnProperty(perfTag)) {
        perfData[perfTag] = {
            all: allTag,
            read: readTag,
            send: sendTag,
            correct: true
        };
    }

    // Verify data was read correctly
    perfData[perfTag].correct = perfData[perfTag].correct && verifyRead(r, mtx.elements);
};


/**
 * Create a new NxN compute context
 * @param  {Number} n - side of square
 * @return {GLC}
 */
window.newContext = function(n) {
    n = n || 100;
    let jslap = window.jslap;
    let glc = (new jslap.GLC())
        .loadProgram(jslap.programs.sample)
        .setSize(n, n);
    return glc;
};


/**
 * Test NxN random matrix
 * @param  {Number} n
 * @return {GLC}
 */
window.testRandom = function(n) {
    let glc = newContext(n);
    n = glc.w;
    let m = jslap.Matrix.random(n, n, 0, (-1)>>>1);

    timed('rand', glc, m);

    return glc;
};


/**
 * Test NxN identity matrix
 * @param  {Number} n
 * @return {GLC}
 */
window.testEye = function(n) {
    let glc = newContext(n);
    n = glc.w;
    let m = jslap.Matrix.eye(n);

    timed('eye', glc, m);

    return glc;
};


// test some stuff to start
window.rand = window.testRandom();
window.eye = window.testEye();

};
