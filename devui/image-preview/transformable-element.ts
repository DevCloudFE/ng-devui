import { fromEvent, of, Subscription } from 'rxjs';
import { delay, tap, throttleTime } from 'rxjs/operators';

export class TransformableElement {
  private _element: HTMLElement;
  private _mouseDown = false;
  private _originMouseX: number;
  private _originMouseY: number;
  private _originTranslateX = 0;
  private _originTranslateY = 0;

  get element(): HTMLElement {
    return this._element;
  }

  set element(ele: HTMLElement) {
    this._element = ele;
    this.setElementListener();
  }

  private zoom: number;
  private turn: number; // turn
  private translateX: number; // px
  private translateY: number; // px

  private eventSub: Subscription;
  private zoomSub: Subscription;

  MIN_SCALE = 0.2;
  MAX_SCALE = 2.5;

  constructor(element: HTMLElement, { zoom = 1, turn = 0, translateX = 0, translateY = 0 }) {
    this.element = element;
    this.zoom = zoom;
    this.turn = turn;
    this.translateX = translateX;
    this.translateY = translateY;

    this.setElementTransform();
  }

  setElementListener() {
    if (typeof window === 'undefined') {
      return;
    }
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
    this.eventSub = new Subscription();
    this.eventSub.add(fromEvent(this._element, 'mousewheel').subscribe(($event) => this.mouseZoom($event)));
    this.eventSub.add(fromEvent(window, 'mousedown').subscribe(($event) => this.mouseDown($event)));
    this.eventSub.add(fromEvent(window, 'mousemove').subscribe(($event) => this.mouseMove($event)));
    this.eventSub.add(fromEvent(window, 'mouseup').subscribe(($event) => this.mouseUp($event)));
  }

  removeElementListener() {
    if (this.eventSub) {
      this.eventSub.unsubscribe();
    }
    if (this.zoomSub) {
      this.zoomSub.unsubscribe();
    }
  }

  mouseZoom($event) {
    if (typeof document === 'undefined') {
      return;
    }
    this.zoomSub = of($event)
      .pipe(
        throttleTime(300),
        tap((event) => {
          const value = -event.wheelDelta || event.deltaY || event.detail;
          if (value < 0) {
            if (this.zoom === this.MAX_SCALE) {
              this.element.style.cursor = 'not-allowed';
              return;
            }
            this.element.style.cursor = 'zoom-in';
            document.body.style.cursor = 'zoom-in';
            this.zoomIn(0.2);
          } else {
            if (this.zoom === this.MIN_SCALE) {
              this.element.style.cursor = 'not-allowed';
              return;
            }
            this.element.style.cursor = 'zoom-out';
            document.body.style.cursor = 'zoom-out';
            this.zoomOut(0.2);
          }
        }),
        delay(400)
      )
      .subscribe(() => {
        this.element.style.cursor = 'grab';
        document.body.style.cursor = 'default';
      });
  }

  mouseDown($event) {
    if ($event.target !== this.element) {
      return;
    }

    this._mouseDown = true;
    this._originMouseX = $event.clientX;
    this._originMouseY = $event.clientY;
    this._originTranslateX = this.translateX;
    this._originTranslateY = this.translateY;
  }

  mouseMove($event) {
    if (this._mouseDown && typeof document !== 'undefined') {
      $event.stopPropagation();
      $event.preventDefault();
      this.translateX = this._originTranslateX + ($event.clientX - this._originMouseX);
      this.translateY = this._originTranslateY + ($event.clientY - this._originMouseY);
      this.setElementTransform();
      document.body.style.cursor = 'grabbing';
      this.element.style.cursor = 'grabbing';
    }
  }

  mouseUp($event) {
    if (typeof document !== 'undefined') {
      this._mouseDown = false;
      document.body.style.cursor = 'default';
      this.element.style.cursor = 'grab';
    }
  }

  zoomOut(step = 0.25) {
    this.zoom = Math.max(this.MIN_SCALE, this.zoom - step);
    this.setElementTransform();
    return this.zoom === this.MIN_SCALE;
  }

  zoomIn(step = 0.25) {
    this.zoom = Math.min(this.MAX_SCALE, this.zoom + step);
    this.setElementTransform();
    return this.zoom === this.MAX_SCALE;
  }

  rotate() {
    this.turn -= 0.25;
    this.setElementTransform();
  }

  setOriginalScale() {
    this.resetTransformProperties();
    this.setElementTransform();
  }

  setBestScale() {
    this.resetTransformProperties();
    this.setElementTransform();
  }

  resetTransformProperties() {
    this.zoom = 1;
    this.translateX = 0;
    this.translateY = 1;
  }

  setElementTransform(targetParam?, zoom = this.zoom, translateX = this.translateX, translateY = this.translateY, turn = this.turn) {
    let target = targetParam;
    if (!target) {
      target = this.element;
    }
    target.style.transform = `translate(${translateX}px, ${translateY}px) scale(${zoom}) rotate(${turn}turn)`;
  }
}
