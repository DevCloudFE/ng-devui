import { ElementRef, Renderer2 } from '@angular/core';
import { DBreakpoint, DBreakpoints, DResponseParameter } from './layout.types';

function isResponseValue(value: DResponseParameter<any>) {
  let flag = false;
  if (typeof value === 'object') {
    DBreakpoints.forEach(point => {
      if (value[point]) {
        flag = true;
      }
    });
  }
  return flag;
}

function runResponse(value: DResponseParameter<any>, func: (point: DBreakpoint, value: any) => void) {
  if (value) {
    if (isResponseValue(value)) {
      DBreakpoints.forEach(point => {
        if (value[point]) {
          func(point, value[point]);
        }
      });
    } else {
      func(null, value);
    }
  }
}

function getDSpanClass(point: DBreakpoint, value: any): string {
  const classType = value === 0 ? 'd' : 'col';
  const classValue = value === 0 ? 'none' : value;

  return point ? `dl-${classType}-${point}-${classValue}` : `dl-${classType}-${classValue}`;
}

/* 如果是ss 则表示全局生效 */
function transPoint(point: DBreakpoint) {
  if (point === 'ss') {
    return null;
  }

  return point;
}

function pointAndValueMapToClassName(paramName, classList, point, value) {
  const finalPonit = transPoint(point);

  const classPrefixMap: { [key: string]: any } = {
    dOffset: 'dl-offset-',
    dAlign: 'dl-align-items-',
    dJustify: 'dl-justify-content-',
    dAlignSelf: 'dl-align-self-',
    dOrder: 'dl-order-',
    // dFlexWrap: '',
    dSpan: getDSpanClass,
    dCols: 'dl-row-cols-',
  };

  if (typeof classPrefixMap[paramName] === 'string') {
    classList.push(finalPonit ? `${classPrefixMap[paramName]}${finalPonit}-${value}` : `${classPrefixMap[paramName]}${value}`);
  } else if (typeof classPrefixMap[paramName] === 'function') {
    classList.push(classPrefixMap[paramName](finalPonit, value));
  }
}

/**
 *
 * 此函数用以绑定当前类中可能需要绑定的Class，并识别响应式Object
 *
 */
export function updateClassList(context: any, elementRef: ElementRef, renderer: Renderer2) {
  const classParamsName = ['dSpan', 'dOffset', 'dAlign', 'dJustify', 'dAlignSelf', 'dOrder', 'dCols'];

  const tempClassList = [];
  classParamsName.forEach(paramName => {
    if (context[paramName]) {
      runResponse(context[paramName], pointAndValueMapToClassName.bind(this, paramName, tempClassList));
    }
  });

  if (context.classList) {
    context.classList.forEach(className => {
      renderer.removeClass(elementRef.nativeElement, className);
    });
  }

  context.classList = tempClassList;
  context.classList.forEach(className => {
    renderer.addClass(elementRef.nativeElement, className);
  });
}
