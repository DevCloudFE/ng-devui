import { ElementRef } from '@angular/core';
import { WindowRef } from 'ng-devui/window-ref';

export function centerWindowPosition(elementRef: ElementRef, windowRef: WindowRef): { top?: number, left?: number } {
  if (!elementRef.nativeElement || !elementRef.nativeElement.getBoundingClientRect) {
    return {};
  }

  const rect = elementRef.nativeElement.getBoundingClientRect();
  const elmHeight = rect.height;
  const elmWidth = rect.width;
  const winHeight = windowRef.innerHeight;
  const winWidth = windowRef.innerWidth;

  return {
    left: (winWidth - elmWidth) / 2,
    top: (winHeight - elmHeight) / 2
  };
}

export function stopPropagationIfExist($event?: Event) {
  if ($event) {
    $event.stopPropagation();
  }
}
