
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
 * To bind event
 * @param el taget element. required.
 * @param options event handlers and other configration. required.
 */
export default function XTouch(el: Target, options: IOptions) {

  if (Object.prototype.toString.call(options) !== '[object Object]') {
    throw new Error('[xtouch]: argument `options` is missing or illegal.')
  }

  const { onStart, onMove, onEnd, capture } = options;
  let startTarget: EventTarget = null;

  const _onStart: EventHandler = function (e) {
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
  }, _onMove: EventHandler = function (e) {
    if (e.type === 'mousemove') {
      // @ts-ignore
      e.identifier = 0;
      // @ts-ignore
      e.touches = e.changedTouches = [e];
      // @ts-ignore
      e.targetTouches = e.target === startTarget ? [e] : [];
    }
    onMove(e);
  }, _onEnd: EventHandler = function (e) {
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

/**
 * configration options
 */
export interface IOptions {
  /**
  * use 'capture' phase
  */
  capture: boolean
  /**
   * touchstart/mousedown event handler
   */
  onStart: EventHandler;
  /**
   * touchmove/mousemove event handler
   */
  onMove: EventHandler;
  /**
   * touchend/mouseup event handler
   */
  onEnd: EventHandler;
}

/**
 * event callback.
 */
export type EventHandler = (e: TouchEvent) => void;
/**
 * target that to bind event.
 */
export type Target = Window | HTMLElement;
