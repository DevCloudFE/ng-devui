import {
    Directive,
    ElementRef,
    Renderer2,
    Input,
    OnInit,
    HostBinding,
} from '@angular/core';

export enum FormLayout {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
    Columns = 'columns',
}

@Directive({
    selector: '[dForm]',
})
export class FormDirective {
    @Input() layout = FormLayout.Horizontal;
    @Input() labelSize: 'sm' | '' | 'lg' = '';

    @HostBinding('class.devui-form-horizontal')
    get layoutHorizontal() {
        return this.layout === FormLayout.Horizontal;
    }

    @HostBinding('class.devui-form-vertical')
    get layoutVertical() {
        return this.layout === FormLayout.Vertical;
    }

    @HostBinding('class.devui-form-columns')
    get layoutColumns() {
        return this.layout === FormLayout.Columns;
    }

    @HostBinding('class.devui-form-lg')
    get labelSizeLg() {
        return this.labelSize === 'lg';
    }

    @HostBinding('class.devui-form-sm')
    get labelSizeSm() {
        return this.labelSize === 'sm';
    }

    constructor() {
    }

}
