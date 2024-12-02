import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { DropDownDirective } from './dropdown.directive';

@Injectable()
export class DropDownService {
  private openScope: DropDownDirective;
  private documentClickTimeOut = null;
  private closeDropdownBind: EventListener = this.closeDropdown.bind(this);
  document: Document;
  constructor(@Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  public open(dropdownScope: DropDownDirective) {
    if (!this.openScope) {
      // 延时绑定document事件，防止事件冒泡导致立即触发
      this.documentClickTimeOut = setTimeout(() => {
        this.document.addEventListener('click', this.closeDropdownBind);
      });
    }
    this.openScope = dropdownScope;
  }

  public close(dropdownScope: DropDownDirective) {
    if (this.openScope !== dropdownScope) {
      return;
    }
    this.openScope = null;
    clearTimeout(this.documentClickTimeOut);
    this.document.removeEventListener('click', this.closeDropdownBind);
  }

  private closeDropdown(event: MouseEvent) {
    if (event && this.openScope?.menuEl) {
      const menuEl = this.openScope.menuEl.nativeElement;
      const target = event.target as Element;
      const className = target && typeof target.className === 'string' ? target.className : '';
      const rules = [
        className.indexOf('disabled') > -1,
        /input|textarea/i.test(target.tagName) && menuEl.contains(target),
        this.openScope.closeScope === 'none',
        menuEl.contains(target) && this.openScope.closeScope === 'blank',
        this.openScope.dropdownChildren.some((children) => children.toggleEl.nativeElement.contains(target)),
      ];
      if (!rules.includes(true)) {
        this.openScope.isOpen = false;
      }
    }
  }
}
