/// <reference path="./index.d.ts" />

export function on(target: Target, type: string, handler: EventHandler, capture: boolean = false) {
  target.addEventListener(type, handler, capture)
}

export function off(target: Target, type: string, handler: EventHandler, capture: boolean = false) {
  target.removeEventListener(type, handler, capture);
}

export function withinBoundry(x: number, y: number) {
  return x >= 0 && x <= window.innerWidth && y >= 0 && y <= window.innerHeight;
}

export default function XTouch(
  el: Target,
  onStart: EventHandler, onMove: EventHandler, onEnd: EventHandler, onCancel: EventHandler
) {
  const isTouchDevice = 'ontouchstart' in window;
  if (isTouchDevice) {
    on(el, 'touchstart', onStart);
    on(el, 'touchmove', onMove);
    on(el, 'touchend', onEnd);
    on(el, 'touchcancel', onCancel);
  } else {
    const oldStart = onStart,
      oldMove = onMove,
      oldEnd = onEnd
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
    } else {
      off(el, 'mousedown', onStart);
      off(el, 'mousemove', onMove);
      off(window, 'mouseup', onEnd);
    }
  };
}
