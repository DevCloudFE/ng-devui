import {
    Directive,
    ElementRef,
    Renderer2,
    Input,
    OnInit,
    HostBinding,
} from '@angular/core';

enum FormLayout {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
    columns = 'columns',
}

@Directive({
    selector: '[dForm]',
})
export class FormDirective implements OnInit {
    @Input() layout = FormLayout.Horizontal;
    @Input() labelSize: 'sm' | '' | 'lg' = '';
    constructor(private elementRef: ElementRef,
        private renderer: Renderer2) {
    }

    ngOnInit() {
        this.renderer.addClass(this.elementRef.nativeElement, 'devui-form-' + this.layout);
        if (this.labelSize) {
            this.renderer.addClass(this.elementRef.nativeElement, 'devui-form-' + this.labelSize);
        }
    }

}
