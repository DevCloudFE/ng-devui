import { ElementRef } from '@angular/core';

export function formWithDropDown(ele: ElementRef): ElementRef['nativeElement'] {
  if (ele) {
    if (!ele.nativeElement.classList.contains('devui-dropdown-origin')) {
      const parentEle = ele.nativeElement.parentElement;
      if (parentEle && parentEle.classList.contains('devui-dropdown-origin')) {
        return ele.nativeElement.parentElement;
      } else {
        return;
      }
    } else {
      return ele.nativeElement;
    }
  }
}

export function addClassToOrigin(ele: ElementRef): void {
  const originEle = formWithDropDown(ele);
  if (originEle && !originEle.classList.contains('devui-dropdown-origin-open')) {
    originEle.classList.add('devui-dropdown-origin-open');
  }
}

export function removeClassFromOrigin(ele: ElementRef): void {
  const originEle = formWithDropDown(ele);
  if (originEle && originEle.classList.contains('devui-dropdown-origin-open')) {
    originEle.classList.remove('devui-dropdown-origin-open');
  }
}
