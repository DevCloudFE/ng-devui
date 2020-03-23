import { Directive, ElementRef, Host, OnInit, HostBinding, HostListener, Input, AfterViewInit } from '@angular/core';
import { DropDownDirective } from './dropdown.directive';

@Directive({
  selector: '[dDropDownToggle]',
  exportAs: 'd-dropdown-toggle',
})
export class DropDownToggleDirective implements OnInit, AfterViewInit {
  @HostBinding('attr.tabIndex') get tabIndex() {
    return this.disabled ? null : 0;
  }
  @HostBinding('attr.disabled')
  get attrDisabled() {
    return this.disabled ? 'disabled' : null;
  }
  get disabled() {
    return this.dropdown && this.dropdown.disabled;
  }
  @HostBinding('class.devui-dropdown-toggle') addClass = true;
  @Input() toggleOnFocus = false;
  @Input() autoFocus = false;
  isMouseEvent = false;

  constructor(@Host() private dropdown: DropDownDirective, private el: ElementRef) { }

  ngOnInit() {
    this.dropdown.dropDownToggle = this;
  }
  ngAfterViewInit(): void {
    if (this.autoFocus) {
      setTimeout(() => {
        this.el.nativeElement.focus();
      }, 0);
    }
  }

  @HostListener('click', ['$event'])
  toggleDropdown(event: MouseEvent) {
    if (!this.disabled) {
      this.dropdown.toggle();
    }
    return false;
  }
  // mousedown mouseup解决focus与click冲突问题
  @HostListener('mousedown', ['$event'])
  setMouseEventTrue(event) {
    this.isMouseEvent = true;
  }
  @HostListener('mouseup', ['$event'])
  setMouseEventFalse(event) {
    this.isMouseEvent = false;
  }
  @HostListener('focus', ['$event'])
  toggleOnFocusFn(event: FocusEvent) {
    if (this.toggleOnFocus && !this.disabled && !this.dropdown.isOpen && !this.isMouseEvent) {
      this.dropdown.toggle();
    }
  }
  @HostListener('keydown.enter')
  public toggle() {
    this.dropdown.toggle();
  }
}
