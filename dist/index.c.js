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
function XTouch(el, onStart, onMove, onEnd, onCancel) {
    var isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
        on(el, 'touchstart', onStart);
        on(window, 'touchmove', onMove);
        on(window, 'touchend', onEnd);
        on(el, 'touchcancel', onCancel);
    }
    else {
        var oldStart_1 = onStart, oldMove_1 = onMove, oldEnd_1 = onEnd;
        onStart = function (e) {
            // @ts-ignore
            e.identifier = 0;
            // @ts-ignore
            e.touches = e.changedTouches = [e];
            oldStart_1(e);
        };
        onMove = function (e) {
            // @ts-ignore
            e.identifier = 0;
            // @ts-ignore
            e.touches = e.changedTouches = [e];
            oldMove_1(e);
        };
        onEnd = function (e) {
            // @ts-ignore
            e.identifier = 0;
            // @ts-ignore
            e.touches = [];
            // @ts-ignore
            e.changedTouches = [e];
            oldEnd_1(e);
        };
        on(el, 'mousedown', onStart);
        on(window, 'mousemove', onMove);
        on(window, 'mouseup', onEnd);
    }
    return function unbind() {
        if (isTouchDevice) {
            off(el, 'touchstart', onStart);
            off(window, 'touchmove', onMove);
            off(window, 'touchend', onEnd);
            off(el, 'touchcancel', onCancel);
        }
        else {
            off(el, 'mousedown', onStart);
            off(window, 'mousemove', onMove);
            off(window, 'mouseup', onEnd);
        }
    };
}

exports.default = XTouch;
exports.off = off;
exports.on = on;
exports.withinBoundry = withinBoundry;