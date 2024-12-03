import { ElementRef } from '@angular/core';

export class Utils {
  /**
   * Polyfill for element.matches.
   * See: https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
   * element
   */
  public static matches(element: any, selectorName: string): boolean {
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

    return func.call(element, selectorName);
  }

  /**
   * Applies the specified css class on nativeElement
   * elementRef
   * className
   */
  public static addClass(elementRef: ElementRef | any, className: string) {
    if (className === undefined) {
      return;
    }
    const e = this.getElementWithValidClassList(elementRef);

    if (e) {
      e.classList.add(className);
    }
  }

  /**
   * Removes the specified class from nativeElement
   * elementRef
   * className
   */
  public static removeClass(elementRef: ElementRef | any, className: string) {
    if (className === undefined) {
      return;
    }
    const e = this.getElementWithValidClassList(elementRef);

    if (e) {
      e.classList.remove(className);
    }
  }

  /**
   * Gets element with valid classList
   *
   * elementRef
   * @returns ElementRef | null
   */
  private static getElementWithValidClassList(elementRef: ElementRef) {
    const e = elementRef instanceof ElementRef ? elementRef.nativeElement : elementRef;

    if (e.classList !== undefined && e.classList !== null) {
      return e;
    }

    return null;
  }

  public static slice(args, slice?, sliceEnd?) {
    const ret = [];
    let len = args.length;

    if (len === 0) {
      return ret;
    }

    const start = slice < 0 ? Math.max(0, slice + len) : slice || 0;

    if (sliceEnd !== undefined) {
      len = sliceEnd < 0 ? sliceEnd + len : sliceEnd;
    }

    while (len-- > start) {
      ret[len - start] = args[len];
    }
    return ret;
  }

  // 动态添加styles
  public static addElStyles(el: any, styles: any) {
    if (styles instanceof Object) {
      for (const s in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, s)) {
          if (Array.isArray(styles[s])) {
            // 用于支持兼容渐退
            styles[s].forEach((val) => {
              el.style[s] = val;
            });
          } else {
            el.style[s] = styles[s];
          }
        }
      }
    }
  }
  public static dispatchEventToUnderElement(event: DragEvent, target?: HTMLElement, eventType?: string) {
    const up = target || <HTMLElement>event.target;
    up.style.display = 'none';
    const { x, y } = { x: event.clientX, y: event.clientY };
    const under = document.elementFromPoint(x, y);
    up.style.display = '';
    if (!under) {
      return event;
    }
    const ev = document.createEvent('DragEvent');
    ev.initMouseEvent(
      eventType || event.type,
      true,
      true,
      window,
      0,
      event.screenX,
      event.screenY,
      event.clientX,
      event.clientY,
      event.ctrlKey,
      event.altKey,
      event.shiftKey,
      event.metaKey,
      event.button,
      event.relatedTarget
    );
    if (ev.dataTransfer !== null) {
      ev.dataTransfer.setData('text', '');
      ev.dataTransfer.effectAllowed = event.dataTransfer.effectAllowed;
    }
    setTimeout(() => {
      under.dispatchEvent(ev);
    }, 0);
    return event;
  }
}
