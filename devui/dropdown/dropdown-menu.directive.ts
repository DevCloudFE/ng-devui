import {
    Directive, ElementRef, Host,
    OnInit,
    HostBinding,
    Renderer2
} from '@angular/core';

import {DropDownDirective} from './dropdown.directive';
import { WindowRef } from '../window-ref/window-ref.service';

@Directive({
    selector: '[aveDropDownMenu]',
    exportAs: 'ave-dropdown-menu'
})
export class DropDownMenuDirective implements OnInit {
    @HostBinding('class.devui-dropdown-menu') addClass = true;
    constructor( @Host() private dropdown: DropDownDirective, private el: ElementRef, private render: Renderer2,
    private windowRef: WindowRef) {
        this.dropdown.visibleSubject.subscribe(value => {
            const display = value ? 'block' : 'none';
            this.render.setStyle(this.el.nativeElement, 'display', display);
            this.calcPopDirection(value);
        });
    }

    ngOnInit() {
        this.dropdown.dropDownMenu = this;
    }

    calcPopDirection(value) {
        const selectMenuElement = this.el.nativeElement;
        const elementHeight = selectMenuElement.offsetHeight;
        const bottemDistance = this.windowRef.innerHeight - this.dropdown.el.nativeElement.getBoundingClientRect().bottom;
        const isBottemEnough = bottemDistance >= elementHeight;
        if (!isBottemEnough && value) {
            this.render.setStyle(selectMenuElement, 'bottom', '100%');
            this.render.setStyle(selectMenuElement, 'top', 'auto');
        } else {
            this.render.removeStyle(selectMenuElement, 'bottom');
            this.render.removeStyle(selectMenuElement, 'top');
        }
      }
}
