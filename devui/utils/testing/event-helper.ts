
enum keyBoardLocation {
  // 各个值的含义请参见: https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/location
  DOM_KEY_LOCATION_STANDARD,
  DOM_KEY_LOCATION_LEFT,
  DOM_KEY_LOCATION_RIGHT,
  DOM_KEY_LOCATION_NUMPAD
}

interface KeyBoardParams {
  key?: string;
  code?: string;
  location?: keyBoardLocation;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  repeat?: boolean;
  isComposing?: boolean;
  keyCode?: number;
}

interface MouseEventParams {
  clientX: number;
  clientY: number;
  screenX: number;
  screenY: number;
}

type keyBoardEventType = 'keydown' | 'keyup' | 'keypress';
type dragEventType = 'drag' | 'dragend' | 'dragenter' | 'dragexit' | 'dragleave' | 'dragover' | 'dragstart' | 'drop';

export function createKeyBoardEvent(eventType: keyBoardEventType, params: KeyBoardParams) {
  params.key = params.key || '';
  params.code = params.code || '';
  params.ctrlKey = params.ctrlKey === undefined ? true : params.ctrlKey;
  params.altKey = params.altKey === undefined ? true : params.altKey;
  params.shiftKey = params.shiftKey === undefined ? true : params.shiftKey;
  params.metaKey = params.metaKey === undefined ? true : params.metaKey;
  params.repeat = params.repeat === undefined ? true : params.repeat;
  params.isComposing = params.isComposing === undefined ? true : params.isComposing;

  const event = new KeyboardEvent(eventType, {
    key: params.key,
    code: params.code,
  });

  Object.defineProperties(event, {
      keyCode: {value: params.keyCode}
  });

  return event;
}

export function createDragEvent(type: dragEventType, params: MouseEventParams) {
  const dataTransfer = new DataTransfer();

  const event = new DragEvent(type, {
    bubbles: true,
    cancelable: true,
    dataTransfer: dataTransfer,
    clientX: params.clientX,
    clientY: params.clientY,
    screenX: params.screenX,
    screenY: params.screenY
  });

  Object.defineProperties(event, {
    buttons: { value: 1 }
  });

  return event;
}

export function mouseMoveTrigger(el: HTMLElement, from: { x: number; y: number }, to: { x: number; y: number }): void {
  dispatchMouseEvent(el, 'mousedown', from.x, from.y);
  dispatchMouseEvent(window.document, 'mousemove', to.x, to.y);
  dispatchMouseEvent(window.document, 'mouseup');
}

export function dispatchMouseEvent(
  node: Node,
  type: string,
  x: number = 0,
  y: number = 0,
  event: MouseEvent = createMouseEvent(type, x, y)
) {
  node.dispatchEvent(event);
}

export function createMouseEvent(type: string, x: number = 0, y: number = 0, button: number = 0): MouseEvent {
  const event = document.createEvent('MouseEvent');
  event.initMouseEvent(
    type,
    true /* canBubble */,
    false /* cancelable */,
    window /* view */,
    0 /* detail */,
    x /* screenX */,
    y /* screenY */,
    x /* clientX */,
    y /* clientY */,
    false /* ctrlKey */,
    false /* altKey */,
    false /* shiftKey */,
    false /* metaKey */,
    button /* button */,
    null /* relatedTarget */
  );
  return event;
}
