import { Injectable } from '@angular/core';
import { DropDownDirective } from './dropdown.directive';

@Injectable()
export class DropDownService {
  private openScope: DropDownDirective;

  private closeDropdownBind: EventListener = this.closeDropdown.bind(this);

  public open(dropdownScope: DropDownDirective) {
    if (!this.openScope) {
      // 延时绑定document事件，防止事件冒泡导致立即触发
      setTimeout(() => {
        window.document.addEventListener('click', this.closeDropdownBind);
      });
    }
    this.openScope = dropdownScope;
  }

  public close(dropdownScope: DropDownDirective) {
    if (this.openScope !== dropdownScope) {
      return;
    }
    this.openScope = null;
    window.document.removeEventListener('click', this.closeDropdownBind);
  }

  private closeDropdown(event: MouseEvent) {
    if (!this.openScope) {
      return;
    }
    const menuEl = this.openScope.menuEl.nativeElement;
    if (event && this.openScope.menuEl &&
      ((/input|textarea/i.test((<any> event.target).tagName) && menuEl.contains(event.target))
      || this.openScope.closeScope === 'none'
      || (menuEl.contains(event.target) && this.openScope.closeScope === 'blank')
      || (this.openScope.dropdownChildren.some(children => children.toggleEl.nativeElement.contains(event.target)))
      )) {
      return;
    }
    this.openScope.isOpen = false;
  }
}
