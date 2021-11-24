let scrollbarWidth: number;

function _styleToNumber(str: string) {
  const match = str.match(/^[0-9]+(?=px$)/);
  const value = Number(match?.[0]);
  return value;
}

// tslint:disable-next-line: max-line-length
// TODO: if necessary, use [getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) that provide a fractional value.
export function getScrollBarWidth(): number {
  if (scrollbarWidth === undefined) {
    const inner = document.createElement('div');
    inner.setAttribute('style', 'width: 100%;');

    const outer = document.createElement('div');
    outer.setAttribute('style', 'position: absolute;visibility: hidden;width: 200px;height: 200px;overflow: hidden;');

    outer.appendChild(inner);
    document.body.appendChild(outer);

    const noScrollWidth = inner.clientWidth;
    outer.style.overflow = 'scroll';
    const scrollWidth = inner.clientWidth;

    document.body.removeChild(outer);

    scrollbarWidth = noScrollWidth - scrollWidth;
  }

  return scrollbarWidth;
}

export function getTargetScrollBarWidth(target: HTMLElement): number {
  const { width } = getComputedStyle(target, '::-webkit-scrollbar');
  const value = _styleToNumber(width);
  return Number.isNaN(value) ? getScrollBarWidth() : value;
}

export function lockScroll(el?: HTMLElement): () => void {
  if (el && el.scrollHeight > el.clientHeight) {
    const _scrollBarWidth = getTargetScrollBarWidth(el);
    const style = el.getAttribute('style');
    el.style.overflow = 'hidden';
    el.style.width = `calc(100% - ${_scrollBarWidth}px)`;
    el.style.touchAction = 'none';
    return () => {
      if (style) {
        el.setAttribute('style', style);
      } else {
        el.removeAttribute('style');
      }
    };
  }

  // when no el pass, check document.documentElement
  if (!el && document.documentElement.scrollHeight > document.documentElement.clientHeight) {
    const scrollTop = document.documentElement.scrollTop;
    const style = document.documentElement.getAttribute('style');
    document.documentElement.style.position = 'fixed';
    document.documentElement.style.top = `-${scrollTop}px`;
    document.documentElement.style.width = document.documentElement.style.width ? document.documentElement.style.width : '100%';
    document.documentElement.style.overflowY = 'scroll';
    return () => {
      if (style) {
        document.documentElement.setAttribute('style', style);
      } else {
        document.documentElement.removeAttribute('style');
      }
      document.documentElement.scrollTop = scrollTop;
    };
  }

  return () => {};
}
