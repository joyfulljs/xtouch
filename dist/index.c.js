'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * bind event
 * @param target window | HTMLElement
 * @param type event type
 * @param handler event handler
 * @param capture if capture phase
 */
function on(target, type, handler, capture) {
    if (capture === void 0) { capture = false; }
    target.addEventListener(type, handler, capture);
}
/**
 * unbind event
 * @param target window | HTMLElement
 * @param type event type
 * @param handler event handler
 * @param capture if capture phase
 */
function off(target, type, handler, capture) {
    if (capture === void 0) { capture = false; }
    target.removeEventListener(type, handler, capture);
}
/**
 * if position is out of visible screen
 * @param x x coordinate
 * @param y y coordinate
 */
function withinBoundry(x, y) {
    return x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight;
}
/**
 * bind mouse or touch event according to current env
 * @param el  window | HTMLElement
 * @param onStart on start handler
 * @param onMove on move handler
 * @param onEnd on end handler
 * @param onCancel on cancel handler. useless in none-touch device.
 */
function XTouch(el, onStart, onMove, onEnd, capture) {
    var oldStart = onStart, oldMove = onMove, oldEnd = onEnd;
    var startTarget = null;
    onStart = function (e) {
        if (e.type === 'mousedown') {
            startTarget = e.target;
            // @ts-ignore
            e.identifier = 0;
            // @ts-ignore
            e.touches = e.changedTouches = [e];
            // @ts-ignore
            e.targetTouches = [e];
        }
        oldStart(e);
    };
    onMove = function (e) {
        if (e.type === 'mousemove') {
            // @ts-ignore
            e.identifier = 0;
            // @ts-ignore
            e.touches = e.changedTouches = [e];
            // @ts-ignore
            e.targetTouches = e.target === startTarget ? [e] : [];
        }
        oldMove(e);
    };
    onEnd = function (e) {
        if (e.type === 'mouseup') {
            // @ts-ignore
            e.identifier = 0;
            // @ts-ignore
            e.touches = [];
            // @ts-ignore
            e.changedTouches = [e];
            // @ts-ignore
            e.targetTouches = e.target === startTarget ? [e] : [];
        }
        oldEnd(e);
    };
    // touch event
    on(el, 'touchstart', onStart);
    on(window, 'touchmove', onMove);
    on(window, 'touchend', onEnd);
    // mouse event
    on(el, 'mousedown', onStart);
    on(window, 'mousemove', onMove);
    on(window, 'mouseup', onEnd);
    return function unbind() {
        off(el, 'touchstart', onStart);
        off(window, 'touchmove', onMove);
        off(window, 'touchend', onEnd);
        off(el, 'mousedown', onStart);
        off(window, 'mousemove', onMove);
        off(window, 'mouseup', onEnd);
    };
}

exports.default = XTouch;
exports.off = off;
exports.on = on;
exports.withinBoundry = withinBoundry;
