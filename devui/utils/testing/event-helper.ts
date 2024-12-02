enum keyBoardLocation {
  // 各个值的含义请参见: https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/location
  DOM_KEY_LOCATION_STANDARD = 0,
  DOM_KEY_LOCATION_LEFT = 1,
  DOM_KEY_LOCATION_RIGHT = 2,
  DOM_KEY_LOCATION_NUMPAD = 3,
}

interface KeyBoardParams {
  key?: string;
  code?: string;
  charCode?: number;
  location?: keyBoardLocation;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  repeat?: boolean;
  isComposing?: boolean;
  keyCode?: number;
  data?: string;
}

interface MouseEventParams {
  clientX: number;
  clientY: number;
  screenX: number;
  screenY: number;
}

type keyBoardEventType = 'keydown' | 'keyup' | 'keypress' | 'input';
type dragEventType = 'drag' | 'dragend' | 'dragenter' | 'dragexit' | 'dragleave' | 'dragover' | 'dragstart' | 'drop';

export function createKeyBoardEvent(eventType: keyBoardEventType, params: KeyBoardParams) {
  params.key = params.key || '';
  params.code = params.code || '';
  params.charCode = params.charCode || 0;
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
    keyCode: { value: params.keyCode },
    charCode: { value: params.charCode },
    data: { value: params.data },
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
    screenY: params.screenY,
  });

  Object.defineProperties(event, {
    buttons: { value: 1 },
  });

  return event;
}

export function mouseMoveTrigger(el: HTMLElement, from: { x: number; y: number }, to: { x: number; y: number }): void {
  if (typeof window === 'undefined') {
    return;
  }
  dispatchMouseEvent(el, 'mousedown', from.x, from.y);
  dispatchMouseEvent(window.document, 'mousemove', to.x, to.y);
  dispatchMouseEvent(window.document, 'mouseup');
}

export function dispatchMouseEvent(node: Node, type: string, x = 0, y = 0, event: MouseEvent = createMouseEvent(type, x, y)) {
  node.dispatchEvent(event);
}

export function createMouseEvent(type: string, x = 0, y = 0, button = 0): MouseEvent {
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

export function dateToStrWithArr(date: Date, arr = ['yy', 'mm', 'dd'], splitter = '-') {
  const padZero = (value) => {
    return String(value).padStart(2, '0');
  };
  const newArr = [];
  arr.forEach((type) => {
    switch (type) {
    case 'yy':
      newArr.push(date.getFullYear());
      break;
    case 'mm':
      newArr.push(padZero(date.getMonth() + 1));
      break;
    case 'dd':
      newArr.push(padZero(date.getDate()));
      break;
    default:
    }
  });
  return newArr.join(splitter);
}
