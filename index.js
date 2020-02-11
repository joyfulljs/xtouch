"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function on(target, type, handler, capture) {
    if (capture === void 0) { capture = false; }
    target.addEventListener(type, handler, capture);
}
exports.on = on;
function off(target, type, handler, capture) {
    if (capture === void 0) { capture = false; }
    target.removeEventListener(type, handler, capture);
}
exports.off = off;
function withinBoundry(x, y) {
    return x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight;
}
exports.withinBoundry = withinBoundry;
function XTouch(el, onStart, onMove, onEnd, onCancel) {
    var isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
        on(el, 'touchstart', onStart);
        on(el, 'touchmove', onMove);
        on(el, 'touchend', onEnd);
        on(el, 'touchcancel', onCancel);
    }
    else {
        var oldStart_1 = onStart, oldMove_1 = onMove, oldEnd_1 = onEnd;
        onStart = function (e) {
            e.identifier = 0;
            e.touches = e.changedTouches = [e];
            oldStart_1(e);
        };
        onMove = function (e) {
            e.identifier = 0;
            e.touches = e.changedTouches = [e];
            oldMove_1(e);
        };
        onEnd = function (e) {
            e.identifier = 0;
            e.touches = [];
            e.changedTouches = [e];
            oldEnd_1(e);
        };
        on(el, 'mousedown', onStart);
        on(el, 'mousemove', onMove);
        on(window, 'mouseup', onEnd);
    }
    return function unbind() {
        if (isTouchDevice) {
            off(el, 'touchstart', onStart);
            off(el, 'touchmove', onMove);
            off(el, 'touchend', onEnd);
            off(el, 'touchcancel', onCancel);
        }
        else {
            off(el, 'mousedown', onStart);
            off(el, 'mousemove', onMove);
            off(window, 'mouseup', onEnd);
        }
    };
}
exports.default = XTouch;
