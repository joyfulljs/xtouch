/// <reference path="./index.d.ts" />
function on(target, type, handler, capture = false) {
    target.addEventListener(type, handler, capture);
}
function off(target, type, handler, capture = false) {
    target.removeEventListener(type, handler, capture);
}
function withinBoundry(x, y) {
    return x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight;
}
function XTouch(el, onStart, onMove, onEnd, onCancel) {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) {
        on(el, 'touchstart', onStart);
        on(el, 'touchmove', onMove);
        on(el, 'touchend', onEnd);
        on(el, 'touchcancel', onCancel);
    }
    else {
        const oldStart = onStart, oldMove = onMove, oldEnd = onEnd;
        onStart = function (e) {
            e.identifier = 0;
            // @ts-ignore
            e.touches = e.changedTouches = [e];
            oldStart(e);
        };
        onMove = function (e) {
            e.identifier = 0;
            // @ts-ignore
            e.touches = e.changedTouches = [e];
            oldMove(e);
        };
        onEnd = function (e) {
            e.identifier = 0;
            // @ts-ignore
            e.touches = [];
            // @ts-ignore
            e.changedTouches = [e];
            oldEnd(e);
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

export default XTouch;
export { off, on, withinBoundry };
