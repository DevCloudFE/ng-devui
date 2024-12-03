import { Injectable } from '@angular/core';
import { DocumentRef, WindowRef } from 'ng-devui/window-ref';

@Injectable()
export class PositionService {
  constructor(private documentRef: DocumentRef, private windowRef: WindowRef) {}

  position(element: HTMLElement, round = true) {
    let elPosition;
    let parentOffset = { width: 0, height: 0, top: 0, bottom: 0, left: 0, right: 0 };

    if (this.getStyle(element, 'position') === 'fixed') {
      elPosition = element.getBoundingClientRect();
    } else {
      const offsetParentEl = this.offsetParent(element);

      elPosition = this.offset(element, false);

      if (offsetParentEl !== this.documentRef.documentElement) {
        parentOffset = this.offset(offsetParentEl, false);
      }

      parentOffset.top += offsetParentEl.clientTop - offsetParentEl.scrollTop;
      parentOffset.left += offsetParentEl.clientLeft - offsetParentEl.scrollLeft;
    }

    elPosition.top -= parentOffset.top;
    elPosition.bottom -= parentOffset.top;
    elPosition.left -= parentOffset.left;
    elPosition.right -= parentOffset.left;

    if (round) {
      elPosition.top = Math.round(elPosition.top);
      elPosition.bottom = Math.round(elPosition.bottom);
      elPosition.left = Math.round(elPosition.left);
      elPosition.right = Math.round(elPosition.right);
    }

    return elPosition;
  }

  offset(element: HTMLElement, round = true) {
    const elBcr = element.getBoundingClientRect();
    const viewportOffset = {
      top: this.windowRef.pageYOffset - this.documentRef.documentElement.clientTop,
      left: this.windowRef.pageXOffset - this.documentRef.documentElement.clientLeft,
    };

    const elOffset = {
      height: elBcr.height || element.offsetHeight,
      width: elBcr.width || element.offsetWidth,
      top: elBcr.top + viewportOffset.top,
      bottom: elBcr.bottom + viewportOffset.top,
      left: elBcr.left + viewportOffset.left,
      right: elBcr.right + viewportOffset.left,
    };

    if (round) {
      elOffset.height = Math.round(elOffset.height);
      elOffset.width = Math.round(elOffset.width);
      elOffset.top = Math.round(elOffset.top);
      elOffset.bottom = Math.round(elOffset.bottom);
      elOffset.left = Math.round(elOffset.left);
      elOffset.right = Math.round(elOffset.right);
    }

    return elOffset;
  }

  getScrollParent(element) {
    let style = getComputedStyle(element);
    const excludeStaticParent = style.position === 'absolute';
    const overflowRegex = /(auto|scroll|overlay)/;

    if (style.position === 'fixed') {
      return this.documentRef.body;
    }
    for (let parent = element; (parent = parent.parentElement); parent.parentElement !== this.documentRef.body) {
      style = getComputedStyle(parent);
      if (excludeStaticParent && style.position === 'static') {
        continue;
      }
      if (overflowRegex.test(style.overflow + style.overflowY + style.overflowX)) {
        return parent;
      }
    }

    return this.documentRef.body;
  }

  positionElements(hostElement: HTMLElement, targetElement: HTMLElement, placement: string | string[], appendToBody?: boolean): any {
    const hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
    const shiftWidth: any = {
      left: hostElPosition.left,
      center: hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2,
      right: hostElPosition.left + hostElPosition.width,
    };
    const shiftHeight: any = {
      top: hostElPosition.top,
      center: hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2,
      bottom: hostElPosition.top + hostElPosition.height,
    };
    const targetElBCR = targetElement.getBoundingClientRect();

    const targetElPosition: any = {
      height: targetElBCR.height || targetElement.offsetHeight,
      width: targetElBCR.width || targetElement.offsetWidth,
      top: 0,
      bottom: targetElBCR.height || targetElement.offsetHeight,
      left: 0,
      right: targetElBCR.width || targetElement.offsetWidth,
    };

    let placementPrimary: string;
    let placementSecondary: string;

    if (Array.isArray(placement)) {
      const targetPlacement = this.getPlacement(hostElement, targetElement, placement);
      placementPrimary = targetPlacement[0];
      placementSecondary = targetPlacement[1];
    } else {
      placementPrimary = placement?.split('-')[0] || 'top';
      placementSecondary = placement?.split('-')[1] || 'center';
    }

    switch (placementPrimary) {
    case 'top':
      targetElPosition.top = hostElPosition.top - targetElement.offsetHeight;
      targetElPosition.bottom += hostElPosition.top - targetElement.offsetHeight;
      targetElPosition.left =
        placementSecondary === 'right' ? shiftWidth[placementSecondary] - targetElement.offsetWidth : shiftWidth[placementSecondary];
      targetElPosition.right += shiftWidth[placementSecondary];
      break;
    case 'bottom':
      targetElPosition.top = shiftHeight[placementPrimary];
      targetElPosition.bottom += shiftHeight[placementPrimary];
      targetElPosition.left =
        placementSecondary === 'right' ? shiftWidth[placementSecondary] - targetElement.offsetWidth : shiftWidth[placementSecondary];
      targetElPosition.right += shiftWidth[placementSecondary];
      break;
    case 'left':
      targetElPosition.top =
        placementSecondary === 'bottom' ? shiftHeight[placementSecondary] - targetElement.offsetHeight : shiftHeight[placementSecondary];
      targetElPosition.bottom += shiftHeight[placementSecondary];
      targetElPosition.left = hostElPosition.left - targetElement.offsetWidth;
      targetElPosition.right += hostElPosition.left - targetElement.offsetWidth;
      break;
    case 'right':
      targetElPosition.top =
        placementSecondary === 'bottom' ? shiftHeight[placementSecondary] - targetElement.offsetHeight : shiftHeight[placementSecondary];
      targetElPosition.bottom += shiftHeight[placementSecondary];
      targetElPosition.left = shiftWidth[placementPrimary];
      targetElPosition.right += shiftWidth[placementPrimary];
      break;
    default:
    }

    targetElPosition.top = Math.round(targetElPosition.top);
    targetElPosition.bottom = Math.round(targetElPosition.bottom);
    targetElPosition.left = Math.round(targetElPosition.left);
    targetElPosition.right = Math.round(targetElPosition.right);
    targetElPosition.placementPrimary = placementPrimary;
    targetElPosition.placementSecondary = placementSecondary;

    return targetElPosition;
  }

  // 根据传入数组选取第一个合适的位置
  private getPlacement(hostElement: HTMLElement, targetElement: HTMLElement, placement: string[]) {
    const hostElPosition = this.offset(hostElement, false);
    const shiftWidth: any = {
      left: hostElPosition.left,
      center: hostElPosition.left + hostElPosition.width / 2 - targetElement.offsetWidth / 2,
      right: hostElPosition.left + hostElPosition.width,
    };
    const shiftHeight: any = {
      top: hostElPosition.top,
      center: hostElPosition.top + hostElPosition.height / 2 - targetElement.offsetHeight / 2,
      bottom: hostElPosition.top + hostElPosition.height,
    };

    let placementPrimary = placement[0].split('-')[0] || 'top';
    let placementSecondary = placement[0].split('-')[1] || 'center';

    for (let i = 0; i < placement.length; i++) {
      const placementPrimaryTemp = placement[i].split('-')[0] || 'top';
      const placementSecondaryTemp = placement[i].split('-')[1] || 'center';

      let top;
      let left;
      switch (placementPrimaryTemp) {
      case 'top':
        top = hostElPosition.top - targetElement.offsetHeight;
        left =
          placementSecondaryTemp === 'right'
            ? shiftWidth[placementSecondaryTemp] - targetElement.offsetWidth
            : shiftWidth[placementSecondary];
        break;
      case 'bottom':
        top = shiftHeight[placementPrimaryTemp];
        left =
          placementSecondaryTemp === 'right'
            ? shiftWidth[placementSecondaryTemp] - targetElement.offsetWidth
            : shiftWidth[placementSecondary];
        break;
      case 'left':
        top =
          placementSecondaryTemp === 'bottom'
            ? shiftHeight[placementSecondaryTemp] - targetElement.offsetHeight
            : shiftHeight[placementSecondary];
        left = hostElPosition.left - targetElement.offsetWidth;
        break;
      case 'right':
        top =
          placementSecondaryTemp === 'bottom'
            ? shiftHeight[placementSecondaryTemp] - targetElement.offsetHeight
            : shiftHeight[placementSecondary];
        left = shiftWidth[placementPrimaryTemp];
        break;
      default:
      }
      if (this.isInViewPort(targetElement, { offsetLeft: left, offsetTop: top })) {
        placementPrimary = placement[i].split('-')[0] || 'top';
        placementSecondary = placement[i].split('-')[1] || 'center';
        return [placementPrimary, placementSecondary];
      }
    }
    return [placementPrimary, placementSecondary];
  }

  private isInViewPort(ele, { offsetLeft, offsetTop }) {
    const targetElBCR = ele.getBoundingClientRect();
    const viewPortHeight =
      this.windowRef.innerHeight || this.documentRef.documentElement.clientHeight || this.documentRef.body.clientHeight;
    const viewPortWidth = this.windowRef.innerWidth || this.documentRef.documentElement.clientWidth || this.documentRef.body.clientWidth;
    const height = targetElBCR.height || targetElBCR.offsetHeight;
    const width = targetElBCR.width || targetElBCR.offsetWidth;
    offsetTop = offsetTop || ele.offsetTop;
    const scrollTop = this.documentRef.documentElement.scrollTop || this.documentRef.body.scrollTop;
    const top = offsetTop - scrollTop;
    offsetLeft = offsetLeft || ele.offsetLeft;
    const scrollLeft = this.documentRef.documentElement.scrollLeft || this.documentRef.body.scrollLeft;
    const left = offsetLeft - scrollLeft;

    return top + height <= viewPortHeight && top > 0 && left + width <= viewPortWidth && left > 0;
  }

  private getStyle(element: HTMLElement, prop: string): string {
    return this.windowRef.getComputedStyle(element)[prop];
  }

  private isStaticPositioned(element: HTMLElement): boolean {
    return (this.getStyle(element, 'position') || 'static') === 'static';
  }

  private offsetParent(element: HTMLElement): HTMLElement {
    let offsetParentEl = <HTMLElement>element.offsetParent || this.documentRef.documentElement;

    while (offsetParentEl && offsetParentEl !== this.documentRef.documentElement && this.isStaticPositioned(offsetParentEl)) {
      offsetParentEl = <HTMLElement>offsetParentEl.offsetParent;
    }

    return offsetParentEl || this.documentRef.documentElement;
  }
}
