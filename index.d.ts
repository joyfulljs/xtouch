/**
 * bind event
 * @param target window | HTMLElement
 * @param type event type
 * @param handler event handler
 * @param capture if capture phase
 */
export declare function on(target: Target, type: string, handler: EventHandler, capture?: boolean): void;
/**
 * unbind event
 * @param target window | HTMLElement
 * @param type event type
 * @param handler event handler
 * @param capture if capture phase
 */
export declare function off(target: Target, type: string, handler: EventHandler, capture?: boolean): void;
/**
 * if position is out of visible screen
 * @param x x coordinate
 * @param y y coordinate
 */
export declare function withinBoundry(x: number, y: number): boolean;
/**
 * bind mouse or touch event according to current env
 * @param el  window | HTMLElement
 * @param onStart on start handler
 * @param onMove on move handler
 * @param onEnd on end handler
 * @param onCancel on cancel handler. useless in none-touch device.
 */
export default function XTouch(el: Target, onStart: EventHandler, onMove: EventHandler, onEnd: EventHandler, capture: boolean): () => void;
/**
 * event callback.
 */
export declare type EventHandler = (e: TouchEvent) => void;
/**
 * target that to bind event.
 */
export declare type Target = Window | HTMLElement;
