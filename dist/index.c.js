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
 * To bind event
 * @param el taget element. required.
 * @param options event handlers and other configration. required.
 */
function XTouch(el, options) {
    if (Object.prototype.toString.call(options) !== '[object Object]') {
        throw new Error('[xtouch]: argument `options` is missing or illegal.');
    }
    var onStart = options.onStart, onMove = options.onMove, onEnd = options.onEnd, capture = options.capture;
    var startTarget = null;
    var _onStart = function (e) {
        if (e.type === 'mousedown') {
            startTarget = e.target;
            // @ts-ignore
            e.identifier = 0;
            // @ts-ignore
            e.touches = e.changedTouches = [e];
            // @ts-ignore
            e.targetTouches = [e];
        }
        onStart(e);
    }, _onMove = function (e) {
        if (e.type === 'mousemove') {
            // @ts-ignore
            e.identifier = 0;
            // @ts-ignore
            e.touches = e.changedTouches = [e];
            // @ts-ignore
            e.targetTouches = e.target === startTarget ? [e] : [];
        }
        onMove(e);
    }, _onEnd = function (e) {
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
        onEnd(e);
    };
    if (onStart) {
        on(el, 'touchstart', _onStart, capture);
        on(el, 'mousedown', _onStart, capture);
    }
    if (onMove) {
        on(window, 'touchmove', _onMove, capture);
        on(window, 'mousemove', _onMove, capture);
    }
    if (onEnd) {
        on(window, 'touchend', _onEnd, capture);
        on(window, 'mouseup', _onEnd, capture);
    }
    return function unbind() {
        off(el, 'touchstart', _onStart, capture);
        off(window, 'touchmove', _onMove, capture);
        off(window, 'touchend', _onEnd, capture);
        off(el, 'mousedown', _onStart, capture);
        off(window, 'mousemove', _onMove, capture);
        off(window, 'mouseup', _onEnd, capture);
    };
}

exports.default = XTouch;
exports.off = off;
exports.on = on;
exports.withinBoundry = withinBoundry;
