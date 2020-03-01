
/**
 * bind event
 * @param target window | HTMLElement
 * @param type event type
 * @param handler event handler
 * @param capture if capture phase
 */
export function on(target: Target, type: string, handler: EventHandler, capture: boolean = false) {
  target.addEventListener(type, handler, capture)
}

/**
 * unbind event
 * @param target window | HTMLElement
 * @param type event type
 * @param handler event handler
 * @param capture if capture phase
 */
export function off(target: Target, type: string, handler: EventHandler, capture: boolean = false) {
  target.removeEventListener(type, handler, capture);
}

/**
 * if position is out of visible screen
 * @param x x coordinate
 * @param y y coordinate
 */
export function withinBoundry(x: number, y: number) {
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
export default function XTouch(
  el: Target,
  onStart: EventHandler, onMove: EventHandler, onEnd: EventHandler,
  capture: boolean
) {

  const oldStart = onStart,
    oldMove = onMove,
    oldEnd = onEnd;
  let startTarget: EventTarget = null;

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
  on(el, 'touchstart', onStart, capture);
  on(window, 'touchmove', onMove, capture);
  on(window, 'touchend', onEnd, capture);
  // mouse event
  on(el, 'mousedown', onStart, capture);
  on(window, 'mousemove', onMove, capture);
  on(window, 'mouseup', onEnd, capture);

  return function unbind() {
    off(el, 'touchstart', onStart, capture);
    off(window, 'touchmove', onMove, capture);
    off(window, 'touchend', onEnd, capture);
    off(el, 'mousedown', onStart, capture);
    off(window, 'mousemove', onMove, capture);
    off(window, 'mouseup', onEnd, capture);
  };
}

/**
 * event callback.
 */
export type EventHandler = (e: TouchEvent) => void;
/**
 * target that to bind event.
 */
export type Target = Window | HTMLElement;
