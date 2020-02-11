type EventHandler = (e: TouchEvent) => void;
type Target = Window | HTMLElement;

interface TouchEvent {
  identifier: number;
}
