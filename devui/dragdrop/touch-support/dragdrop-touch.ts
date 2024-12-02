/**
 * 2020.03.23-Modified from https://github.com/Bernardo-Castilho/dragdroptouch, license: MIT，reason:Converting .js file to .ts file
 */
export class DragDropTouch {
  static readonly THRESHOLD = 5; // pixels to move before drag starts
  static readonly OPACITY = 0.5; // drag image opacity
  static readonly DBLCLICK = 500; // max ms between clicks in a double click
  static readonly DRAG_OVER_TIME = 300; // interval ms when drag over
  static readonly CTX_MENU = 900; // ms to hold before raising 'contextmenu' event
  static readonly IS_PRESS_HOLD_MODE = true; // decides of press & hold mode presence
  static readonly PRESS_HOLD_AWAIT = 400; // ms to wait before press & hold is detected
  static readonly PRESS_HOLD_MARGIN = 25; // pixels that finger might shiver while pressing
  static readonly PRESS_HOLD_THRESHOLD = 0; // pixels to move before drag starts
  static readonly DRAG_HANDLE_ATTR = 'data-drag-handle-selector';
  static readonly rmvAttrs = 'id,class,style,draggable'.split(',');
  static readonly kbdProps = 'altKey,ctrlKey,metaKey,shiftKey'.split(',');
  static readonly ptProps = 'pageX,pageY,clientX,clientY,screenX,screenY'.split(',');

  private static instance: DragDropTouch = null;

  dataTransfer: DataTransfer;
  lastClick = 0;
  lastTouch: TouchEvent;
  // touched element
  lastTarget: HTMLElement;
  // touched draggble element
  dragSource: HTMLElement;
  ptDown: { x: number; y: number };
  isDragEnabled: boolean;
  isDropZone: boolean;
  pressHoldInterval;
  img;
  imgCustom;
  imgOffset;
  // for continual drag over event even touch point stop at a certain point for a while.
  dragoverTimer;
  // for bind touch move and touch end event to touch target incase virtual scroll cause
  // document no longer get capture/ bubble of touchmove event from dom removed from document tree
  touchTarget: EventTarget;
  touchmoveListener: EventListener;
  touchendListener: EventListener;
  listenerOpt: boolean | EventListenerOptions;

  constructor() {
    // enforce singleton pattern
    if (DragDropTouch.instance) {
      throw new Error('DragDropTouch instance already created.');
    }
    // detect passive event support
    // https://github.com/Modernizr/Modernizr/issues/1894
    let supportsPassive = false;
    if (typeof document !== 'undefined') {
      document.addEventListener('test', () => {}, {
        get passive() {
          supportsPassive = true;
          return true;
        },
      });
      // listen to touch events
      if (DragDropTouch.isTouchDevice()) {
        // 能响应触摸事件
        const d = document;
        const ts = this.touchstart;
        const tmod = this.touchmoveOnDocument;
        const teod = this.touchendOnDocument;
        const opt = supportsPassive ? { passive: false, capture: false } : false;
        const optPassive = supportsPassive ? { passive: true } : false;
        d.addEventListener('touchstart', ts, opt);
        d.addEventListener('touchmove', tmod, optPassive);
        d.addEventListener('touchend', teod);
        d.addEventListener('touchcancel', teod);
        this.touchmoveListener = this.touchmove;
        this.touchendListener = this.touchend;
        this.listenerOpt = opt;
      }
    }
  }
  /**
   * Gets a reference to the @see:DragDropTouch singleton.
   */
  static getInstance() {
    if (!DragDropTouch.instance) {
      DragDropTouch.instance = new DragDropTouch();
    }
    return DragDropTouch.instance;
  }
  static isTouchDevice() {
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return false;
    }
    const d: Document = document;
    const w: Window = window;
    let bool;
    if (
      'ontouchstart' in d || // normal mobile device
      'ontouchstart' in w ||
      navigator.maxTouchPoints > 0 ||
      (navigator as any).msMaxTouchPoints > 0 ||
      ((window as any).DocumentTouch && document instanceof (window as any).DocumentTouch)
    ) {
      bool = true;
    } else {
      const fakeBody = document.createElement('fakebody');
      fakeBody.innerHTML += `
      <style>
        @media (touch-enabled),(-webkit-touch-enabled),(-moz-touch-enabled),(-o-touch-enabled){
          #touch_test {
            top: 42px;
            position: absolute;
          }
        }
      </style>`;
      document.documentElement.appendChild(fakeBody);
      const touchTestNode = document.createElement('div');
      touchTestNode.id = 'touch_test';
      fakeBody.appendChild(touchTestNode);
      bool = touchTestNode.offsetTop === 42;
      fakeBody.parentElement.removeChild(fakeBody);
    }
    return bool;
  }
  // ** event listener binding
  bindTouchmoveTouchend(e: TouchEvent) {
    this.touchTarget = e.target;
    e.target.addEventListener('touchmove', this.touchmoveListener, this.listenerOpt);
    e.target.addEventListener('touchend', this.touchendListener);
    e.target.addEventListener('touchcancel', this.touchendListener);
  }
  removeTouchmoveTouchend() {
    if (this.touchTarget) {
      this.touchTarget.removeEventListener('touchmove', this.touchmoveListener);
      this.touchTarget.removeEventListener('touchend', this.touchendListener);
      this.touchTarget.removeEventListener('touchcancel', this.touchendListener);
      this.touchTarget = undefined;
    }
  }
  // ** event handlers
  touchstart = (e: TouchEvent) => {
    if (this.shouldHandle(e)) {
      // raise double-click and prevent zooming
      if (Date.now() - this.lastClick < DragDropTouch.DBLCLICK) {
        if (this.dispatchEvent(e, 'dblclick', e.target)) {
          e.preventDefault();
          this.reset();
          return;
        }
      }
      // clear all variables
      this.reset();
      // get nearest draggable element
      const src = this.closestDraggable(e.target);
      if (src) {
        this.dragSource = src;
        this.ptDown = this.getPoint(e);
        this.lastTouch = e;
        if (DragDropTouch.IS_PRESS_HOLD_MODE) {
          this.pressHoldInterval = setTimeout(() => {
            this.bindTouchmoveTouchend(e);
            this.isDragEnabled = true;
            this.touchmove(e);
          }, DragDropTouch.PRESS_HOLD_AWAIT);
        } else {
          e.preventDefault();
          this.bindTouchmoveTouchend(e);
        }
      }
    }
  };
  touchmoveOnDocument = (e) => {
    if (this.shouldCancelPressHoldMove(e)) {
      this.reset();
      return;
    }
  };
  touchmove = (e: TouchEvent) => {
    if (this.shouldCancelPressHoldMove(e)) {
      this.reset();
      return;
    }
    if (this.shouldHandleMove(e) || this.shouldHandlePressHoldMove(e)) {
      const target = this.getTarget(e);
      // start dragging
      if (this.dragSource && !this.img && this.shouldStartDragging(e)) {
        this.dispatchEvent(e, 'dragstart', this.dragSource);
        this.createImage(e);
      }
      // continue dragging
      if (this.img) {
        this.clearDragoverInterval();
        this.lastTouch = e;
        e.preventDefault(); // prevent scrolling
        if (target !== this.lastTarget) {
          // according to drag drop implementation of the browser, dragenterB is supposed to fired before dragleaveA
          this.dispatchEvent(e, 'dragenter', target);
          this.dispatchEvent(this.lastTouch, 'dragleave', this.lastTarget);
          this.lastTarget = target;
        }
        this.moveImage(e);
        this.isDropZone = this.dispatchEvent(e, 'dragover', target);
        // should continue dispatch dragover event when touch position stay still
        this.setDragoverInterval(e);
      }
    }
  };
  touchendOnDocument = (e) => {
    if (this.shouldHandle(e)) {
      if (!this.img) {
        this.dragSource = null;
        this.lastClick = Date.now();
      }
      // finish dragging
      this.destroyImage();
      if (this.dragSource) {
        this.reset();
      }
    }
  };
  touchend = (e) => {
    if (this.shouldHandle(e)) {
      // user clicked the element but didn't drag, so clear the source and simulate a click
      if (!this.img) {
        this.dragSource = null;
        // browser will dispatch click event after trigger touchend, since touchstart didn't preventDefault
        this.lastClick = Date.now();
      }
      // finish dragging
      this.destroyImage();
      if (this.dragSource) {
        if (e.type.indexOf('cancel') < 0 && this.isDropZone) {
          this.dispatchEvent(this.lastTouch, 'drop', this.lastTarget);
        }
        this.dispatchEvent(this.lastTouch, 'dragend', this.dragSource);
        this.reset();
      }
    }
  };
  // ** utilities
  // ignore events that have been handled or that involve more than one touch
  shouldHandle(e) {
    return e && !e.defaultPrevented && e.touches && e.touches.length < 2;
  }
  // use regular condition outside of press & hold mode
  shouldHandleMove(e) {
    return !DragDropTouch.IS_PRESS_HOLD_MODE && this.shouldHandle(e);
  }
  // allow to handle moves that involve many touches for press & hold
  shouldHandlePressHoldMove(e) {
    return DragDropTouch.IS_PRESS_HOLD_MODE && this.isDragEnabled && e && e.touches && e.touches.length;
  }
  // reset data if user drags without pressing & holding
  shouldCancelPressHoldMove(e) {
    return DragDropTouch.IS_PRESS_HOLD_MODE && !this.isDragEnabled && this.getDelta(e) > DragDropTouch.PRESS_HOLD_MARGIN;
  }
  // start dragging when mouseover element matches drag handler selector and specified delta is detected
  shouldStartDragging(e) {
    const dragHandleSelector = this.getDragHandle();
    // start dragging when mouseover element matches drag handler selector
    if (dragHandleSelector && !this.matchSelector(e.target, dragHandleSelector)) {
      return false;
    }
    // start dragging when specified delta is detected
    const delta = this.getDelta(e);
    return delta > DragDropTouch.THRESHOLD || (DragDropTouch.IS_PRESS_HOLD_MODE && delta >= DragDropTouch.PRESS_HOLD_THRESHOLD);
  }
  // find drag handler selector for dragstart only with partial element
  getDragHandle() {
    if (this.dragSource) {
      return this.dragSource.getAttribute(DragDropTouch.DRAG_HANDLE_ATTR) || '';
    }
    return '';
  }
  // test if element matches selector
  matchSelector(element, selector) {
    if (selector) {
      const proto: any = Element.prototype;
      const func =
        proto.matches ||
        proto.matchesSelector ||
        proto.mozMatchesSelector ||
        proto.msMatchesSelector ||
        proto.oMatchesSelector ||
        proto.webkitMatchesSelector ||
        function (s) {
          const matches = (this.document || this.ownerDocument).querySelectorAll(s);
          let i = matches.length;
          while (--i >= 0 && matches.item(i) !== this) {
            // do nothing
          }
          return i > -1;
        };
      return func.call(element, selector);
    }
    return true;
  }
  // clear all members
  reset() {
    this.removeTouchmoveTouchend();
    this.destroyImage();
    this.dragSource = null;
    this.lastTouch = null;
    this.lastTarget = null;
    this.ptDown = null;
    this.isDragEnabled = false;
    this.isDropZone = false;
    this.dataTransfer = new DragDropTouch.DataTransfer();
    clearInterval(this.pressHoldInterval);
    this.clearDragoverInterval();
  }
  // get point for a touch event
  getPoint(e, page?) {
    if (e && e.touches) {
      e = e.touches[0];
    }
    return { x: page ? e.pageX : e.clientX, y: page ? e.pageY : e.clientY };
  }
  // get distance between the current touch event and the first one
  getDelta(e) {
    if (DragDropTouch.IS_PRESS_HOLD_MODE && !this.ptDown) {
      return 0;
    }
    const p = this.getPoint(e);
    return Math.abs(p.x - this.ptDown.x) + Math.abs(p.y - this.ptDown.y);
  }
  // get the element at a given touch event
  getTarget(e: TouchEvent) {
    const pt = this.getPoint(e);
    let el = document.elementFromPoint(pt.x, pt.y);
    while (el && getComputedStyle(el).pointerEvents === 'none') {
      el = el.parentElement;
    }
    return <HTMLElement>el;
  }
  // create drag image from source element
  createImage(e) {
    // just in case...
    if (this.img) {
      this.destroyImage();
    }
    // create drag image from custom element or drag source
    const src = this.imgCustom || this.dragSource;
    this.img = src.cloneNode(true);
    this.copyStyle(src, this.img);
    this.img.style.top = this.img.style.left = '-9999px';
    // if creating from drag source, apply offset and opacity
    if (!this.imgCustom) {
      const rc = src.getBoundingClientRect();
      const pt = this.getPoint(e);
      this.imgOffset = { x: pt.x - rc.left, y: pt.y - rc.top };
      this.img.style.opacity = DragDropTouch.OPACITY.toString();
    }
    // add image to document
    this.moveImage(e);
    document.body.appendChild(this.img);
  }
  // dispose of drag image element
  destroyImage() {
    if (this.img && this.img.parentElement) {
      this.img.parentElement.removeChild(this.img);
    }
    this.img = null;
    this.imgCustom = null;
  }
  // move the drag image element
  moveImage(e) {
    requestAnimationFrame(() => {
      if (this.img) {
        const pt = this.getPoint(e, true);
        const s = this.img.style;
        s.position = 'absolute';
        s.pointerEvents = 'none';
        s.zIndex = '999999';
        s.left = Math.round(pt.x - this.imgOffset.x) + 'px';
        s.top = Math.round(pt.y - this.imgOffset.y) + 'px';
      }
    });
  }
  // copy properties from an object to another
  copyProps(dst, src, props) {
    for (let i = 0; i < props.length; i++) {
      const p = props[i];
      dst[p] = src[p];
    }
  }
  // copy styles/attributes from drag source to drag image element
  copyStyle(src, dst) {
    // remove potentially troublesome attributes
    DragDropTouch.rmvAttrs.forEach((att) => dst.removeAttribute(att));
    // copy canvas content
    if (src instanceof HTMLCanvasElement) {
      const canSrc = src;
      const canDst = dst;
      canDst.width = canSrc.width;
      canDst.height = canSrc.height;
      canDst.getContext('2d').drawImage(canSrc, 0, 0);
    }
    // copy canvas content for nested canvas element
    const srcCanvases = src.querySelectorAll('canvas');
    if (srcCanvases.length > 0) {
      const dstCanvases = dst.querySelectorAll('canvas');
      for (let i = 0; i < dstCanvases.length; i++) {
        const cSrc = srcCanvases[i];
        const cDst = dstCanvases[i];
        cDst.getContext('2d').drawImage(cSrc, 0, 0);
      }
    }
    // copy style (without transitions)
    const cs = getComputedStyle(src);
    for (let i = 0; i < cs.length; i++) {
      const key = cs[i];
      if (key.indexOf('transition') < 0) {
        dst.style[key] = cs[key];
      }
    }
    dst.style.pointerEvents = 'none';
    // and repeat for all children
    for (let i = 0; i < src.children.length; i++) {
      this.copyStyle(src.children[i], dst.children[i]);
    }
  }
  // synthesize and dispatch an event
  // returns true if the event has been handled (e.preventDefault == true)
  dispatchEvent(e, type, target) {
    if (e && target) {
      const evt = document.createEvent('Event');
      const t = e.touches ? e.touches[0] : e;
      evt.initEvent(type, true, true);
      const obj = {
        button: 0,
        which: 0,
        buttons: 1,
        dataTransfer: this.dataTransfer,
      };
      this.copyProps(evt, e, DragDropTouch.kbdProps);
      this.copyProps(evt, t, DragDropTouch.ptProps);
      this.copyProps(evt, { fromTouch: true }, ['fromTouch']); // mark as from touch event
      this.copyProps(evt, obj, Object.keys(obj));

      target.dispatchEvent(evt);
      return evt.defaultPrevented;
    }
    return false;
  }
  // gets an element's closest draggable ancestor
  closestDraggable(e) {
    for (; e; e = e.parentElement) {
      if (e.hasAttribute('draggable') && e.draggable) {
        return e;
      }
    }
    return null;
  }
  // repeat dispatch dragover event when touch point stay still
  setDragoverInterval(e) {
    this.dragoverTimer = setInterval(() => {
      const target = this.getTarget(e);
      if (target !== this.lastTarget) {
        this.dispatchEvent(e, 'dragenter', target);
        this.dispatchEvent(e, 'dragleave', this.lastTarget);
        this.lastTarget = target;
      }
      this.isDropZone = this.dispatchEvent(e, 'dragover', target);
    }, DragDropTouch.DRAG_OVER_TIME);
  }
  clearDragoverInterval() {
    if (this.dragoverTimer) {
      clearInterval(this.dragoverTimer);
      this.dragoverTimer = undefined;
    }
  }
}
/* eslint-disable-next-line @typescript-eslint/no-namespace */
export namespace DragDropTouch {
  /**
   * Object used to hold the data that is being dragged during drag and drop operations.
   *
   * It may hold one or more data items of different types. For more information about
   * drag and drop operations and data transfer objects, see
   * <a href="https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer">HTML Drag and Drop API</a>.
   *
   * This object is created automatically by the @see:DragDropTouch singleton and is
   * accessible through the @see:dataTransfer property of all drag events.
   */
  export class DataTransfer implements DataTransfer {
    files;
    items;
    private _data;
    /**
     * Gets or sets the type of drag-and-drop operation currently selected.
     * The value must be 'none',  'copy',  'link', or 'move'.
     */
    private _dropEffect;
    get dropEffect() {
      return this._dropEffect;
    }
    set dropEffect(value) {
      this._dropEffect = value;
    }
    /**
     * Gets or sets the types of operations that are possible.
     * Must be one of 'none', 'copy', 'copyLink', 'copyMove', 'link',
     * 'linkMove', 'move', 'all' or 'uninitialized'.
     */
    private _effectAllowed;
    get effectAllowed() {
      return this._effectAllowed;
    }
    set effectAllowed(value) {
      this._effectAllowed = value;
    }
    /**
     * Gets an array of strings giving the formats that were set in the @see:dragstart event.
     */
    private _types;
    get types() {
      return Object.keys(this._data);
    }

    constructor() {
      this._dropEffect = 'move';
      this._effectAllowed = 'all';
      this._data = {};
    }
    /**
     * Removes the data associated with a given type.
     *
     * The type argument is optional. If the type is empty or not specified, the data
     * associated with all types is removed. If data for the specified type does not exist,
     * or the data transfer contains no data, this method will have no effect.
     *
     * @param type Type of data to remove.
     */
    clearData(type) {
      if (type !== null) {
        delete this._data[type];
      } else {
        this._data = null;
      }
    }
    /**
     * Retrieves the data for a given type, or an empty string if data for that type does
     * not exist or the data transfer contains no data.
     *
     * @param type Type of data to retrieve.
     */
    getData(type) {
      return this._data[type] || '';
    }

    /**
     * Set the data for a given type.
     *
     * For a list of recommended drag types, please see
     * https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Recommended_Drag_Types.
     *
     * @param type Type of data to add.
     * @param value Data to add.
     */
    setData(type, value) {
      this._data[type] = value;
    }
    /**
     * Set the image to be used for dragging if a custom one is desired.
     *
     * @param img An image element to use as the drag feedback image.
     * @param offsetX The horizontal offset within the image.
     * @param offsetY The vertical offset within the image.
     */
    setDragImage(img, offsetX, offsetY) {
      const ddt = DragDropTouch.getInstance();
      ddt.imgCustom = img;
      ddt.imgOffset = { x: offsetX, y: offsetY };
    }
  }
}
