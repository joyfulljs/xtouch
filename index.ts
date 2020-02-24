
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
      // @ts-ignore
      e.identifier = 0;
      // @ts-ignore
      e.touches = e.changedTouches = [e];
      oldStart(e);
    };
    onMove = function (e) {
      // @ts-ignore
      e.identifier = 0;
      // @ts-ignore
      e.touches = e.changedTouches = [e];
      oldMove(e);
    };
    onEnd = function (e) {
      // @ts-ignore
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

type EventHandler = (e: TouchEvent) => void;
type Target = Window | HTMLElement;
