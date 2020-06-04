/**
 * bind event
 * @param target window | HTMLElement
 * @param type event type
 * @param handler event handler
 * @param capture if capture phase
 */
export declare function on(target: Window | HTMLElement, type: string, handler: EventHandler, capture?: boolean | AddEventListenerOptions): void;
/**
 * unbind event
 * @param target window | HTMLElement
 * @param type event type
 * @param handler event handler
 * @param capture if capture phase
 */
export declare function off(target: Window | HTMLElement, type: string, handler: EventHandler, capture?: boolean | AddEventListenerOptions): void;
/**
 * if position is out of visible screen
 * @param x x coordinate
 * @param y y coordinate
 */
export declare function withinBoundry(x: number, y: number): boolean;
/**
 * To bind event
 * @param el taget element. required.
 * @param options event handlers and other configration. required.
 */
export default function XTouch(el: Window | HTMLElement, options: IOptions): () => void;
/**
 * configration options
 */
export interface IOptions {
    /**
    * the third arg for `addEventListenner`
    */
    capture?: boolean | AddEventListenerOptions;
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
export declare type EventHandler = (e: TouchEvent) => void;
