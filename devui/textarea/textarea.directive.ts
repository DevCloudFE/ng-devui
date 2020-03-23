import { Directive, Input, HostBinding} from '@angular/core';

@Directive({
  selector: '[dTextarea]',
  exportAs: 'dTextarea',
})
export class TextareaDirective {
  @Input() @HostBinding('style.resize') resize: 'none' | 'vertical' | 'horizontal' | 'both' | 'inherit' = 'none';
  @Input() @HostBinding('class.error') error: boolean;
  constructor() { }

}
