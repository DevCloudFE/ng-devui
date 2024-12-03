const properties = [
  'direction', // RTL support
  'boxSizing',
  'width', // on Chrome and IE, exclude the scrollbar, so the mirror div wraps exactly as the textarea does
  'height',
  'overflowX',
  'overflowY',

  'borderTopWidth',
  'borderRightWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderStyle',

  'paddingTop',
  'paddingRight',
  'paddingBottom',
  'paddingLeft',

  'fontStyle',
  'fontVariant',
  'fontWeight',
  'fontStretch',
  'fontSize',
  'fontSizeAdjust',
  'lineHeight',
  'fontFamily',

  'textAlign',
  'textTransform',
  'textIndent',
  'textDecoration',

  'letterSpacing',
  'wordSpacing',

  'tabSize',
  'MozTabSize',
];

const isBrowser = typeof window !== 'undefined';
const isFirefox = isBrowser && (window as any).mozInnerScreenX !== undefined;
function _parseInt(value) {
  return parseInt(value, 10);
}

export function getCaretCoordinates(element, position, options?) {
  if (!isBrowser) {
    throw new Error('textarea-caret-position#getCaretCoordinates should only be called in a browser');
  }

  // isDebugMode 调试模式，用来定位光标位置的
  const isDebugMode = (options && options.isDebugMode) || false;
  if (isDebugMode) {
    const el = document.querySelector('#input-textarea-caret-position-mirror-div');
    if (el) {
      el.parentNode.removeChild(el);
    }
  }

  const div = document.createElement('div');
  div.id = 'input-textarea-caret-position-mirror-div';
  document.body.appendChild(div);

  const style = div.style;
  const computed = window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;
  const isInput = element.nodeName === 'INPUT';

  style.whiteSpace = 'pre-wrap';
  if (!isInput) {
    style.wordWrap = 'break-word';
  }

  style.position = 'absolute';
  if (!isDebugMode) {
    style.visibility = 'hidden';
  }

  properties.forEach((prop) => {
    if (isInput && prop === 'lineHeight') {
      if (computed.boxSizing === 'border-box') {
        const height = _parseInt(computed.height);
        const outerHeight =
          _parseInt(computed.paddingTop) +
          _parseInt(computed.paddingBottom) +
          _parseInt(computed.borderTopWidth) +
          _parseInt(computed.borderBottomWidth);
        const targetHeight = outerHeight + _parseInt(computed.lineHeight);
        if (height > targetHeight) {
          style.lineHeight = height - outerHeight + 'px';
        } else if (height === targetHeight) {
          style.lineHeight = computed.lineHeight;
        } else {
          style.lineHeight = '0';
        }
      } else {
        style.lineHeight = computed.height;
      }
    } else {
      style[prop] = computed[prop];
    }
  });

  if (isFirefox) {
    if (element.scrollHeight > _parseInt(computed.height)) {
      style.overflowY = 'scroll';
    }
  } else {
    style.overflow = 'hidden';
  }

  div.textContent = element.value.substring(0, position);
  if (isInput) {
    div.textContent = div.textContent.replace(/\s/g, '\u00a0');
  }

  const span = document.createElement('span');
  span.textContent = element.value.substring(position) || '.';
  div.appendChild(span);

  const coordinates = {
    top: span.offsetTop + _parseInt(computed.borderTopWidth),
    left: span.offsetLeft + _parseInt(computed.borderLeftWidth),
    height: _parseInt(computed.lineHeight),
  };

  if (isDebugMode) {
    span.style.backgroundColor = '#aaa';
  } else {
    document.body.removeChild(div);
  }

  return coordinates;
}

export function getRegExp(prefix: string | string[]): RegExp {
  const prefixArray = Array.isArray(prefix) ? prefix : [prefix];
  let prefixToken = prefixArray.join('').replace(/(\$|\^)/g, '\\$1');

  if (prefixArray.length > 1) {
    prefixToken = `[${prefixToken}]`;
  }

  return new RegExp(`(\\s|^)(${prefixToken})[^\\s]*`, 'g');
}

export function getMentions(value: string, prefix: string | string[] = '@'): string[] {
  if (typeof value !== 'string') {
    return [];
  }
  const regex = getRegExp(prefix);
  const mentions = value.match(regex);
  return mentions !== null ? mentions.map((e) => e.trim()) : [];
}
