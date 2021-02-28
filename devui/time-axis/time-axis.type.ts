
export interface TimeAxisData {
  direction?:  'vertical' | 'horizontal' | '';
  position?: 'bottom' | 'left' | '';
  model: 'text' | 'html' | 'template' | '';
  list: Array<{
    time?: string;
    text?: string;
    type?: 'primary' | 'success' | 'danger' | 'warning';
    status?: 'runned' | 'running' | '';
    iconClass?: string;
    data?: any;
  }>;
}
