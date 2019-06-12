import {
    Directive, ElementRef, Host,
    OnInit, HostBinding, HostListener
} from '@angular/core';

import {DropDownDirective} from './dropdown.directive';

@Directive({
     selector: '[aveDropDownToggle]',
     exportAs: 'ave-dropdown-toggle'
    })
export class DropDownToggleDirective implements OnInit {
    @HostBinding('attr.disabled') disabled = null;

    @HostBinding('class.devui-dropdown-toggle') addClass = true;

    constructor(@Host() private dropdown: DropDownDirective, private el: ElementRef) {
    }

    public ngOnInit() {
        this.dropdown.dropDownToggle = this;
        this.disabled = this.dropdown.disabled;
    }

    @HostListener('click', ['$event'])
    public toggleDropdown(event: MouseEvent) {
        if (!this.disabled) {
            this.dropdown.toggle();
        }
        return false;
    }
}
