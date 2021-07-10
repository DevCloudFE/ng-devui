import { TemplateRef } from '@angular/core';

export interface TimeAxisData {
  direction?:  'vertical' | 'horizontal' | '';
  position?: 'bottom' | 'left' | '';
  widthMode?: 'fitContent' | 'fitWidth';
  horizontalAlign?: 'center'|'left';
  model: 'text' | 'html' | 'template' | '';
  list: Array<{
    time?: string;
    text?: string;
    lineStyle?: object;
    dotColor?: string;
    customDot?: string | HTMLElement| TemplateRef<any>;
    type?: 'primary' | 'success' | 'danger' | 'warning';
    status?: 'runned' | 'running' | '';
    position?: 'top' | 'bottom' | 'left' | 'right';
    extraElement?: string | HTMLElement| TemplateRef<any>;
    iconClass?: string;
    data?: any;
  }>;
}
