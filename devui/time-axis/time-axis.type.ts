import { TemplateRef } from '@angular/core';

export interface TimeAxisData {
  direction?:  'vertical' | 'horizontal' | '';
  position?: 'bottom' | 'left' | '';
  widthMode?: 'fitContent' | 'fitWidth';
  model: 'text' | 'html' | 'template' | '';
  list: Array<{
    time?: string;
    text?: string;
    lineStyle?: object;
    customDot?: string | HTMLElement| TemplateRef<any>;
    type?: 'primary' | 'success' | 'danger' | 'warning' | 'waiting' | 'info';
    status?: 'runned' | 'running' | 'error';
    position?: 'top' | 'bottom' | 'left' | 'right';
    extraElement?: string | HTMLElement| TemplateRef<any>;
    iconClass?: string;
    data?: any;
  }>;
}
