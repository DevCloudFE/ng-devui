import {
  Directive,
  OnInit, OnDestroy, Input, Output, HostBinding,
  EventEmitter, ElementRef, HostListener
} from '@angular/core';
import { DropDownService } from './dropdown.service';
import { Subject } from 'rxjs';

@Directive({
  selector: '[aveDropDown]',
  exportAs: 'ave-dropdown',
  providers: [DropDownService]
})
export class DropDownDirective implements OnInit, OnDestroy {
 /**
  * 控制是否打开dropdown，绑定一个devui-dropdown-open class
  */
  @HostBinding('class.devui-dropdown-open')
  @Input()  get isOpen(): boolean {
      return this._isOpen;
  }
  @Input() disabled = null;

  /**
   * dropdown触发方式
   */
  @Input() trigger: 'click' | 'hover' = 'click';
  /**
   * 关闭区域，默认点击菜单链接也会关闭，blank点击其他空白区域才关闭
   */
  @Input() closeScope: 'all' | 'blank' = 'all';

  @Output() toggleEvent: EventEmitter<boolean> = new EventEmitter();
  @HostBinding('class.devui-dropdown') addClass = true;

  visibleSubject = new Subject<boolean>();

  private _isOpen = false;

  // drop menu html
  public menuEl: ElementRef;
  // drop down toggle element
  public toggleEl: ElementRef;

  constructor(private dropdownService: DropDownService, public el: ElementRef) {

   }

  set isOpen(value) {
      this._isOpen = !!value;
      if (this.disabled) {
          return;
      }
      if (this.isOpen) {
          this.visibleSubject.next(true);
          this.focusToggleElement();
          this.dropdownService.open(this);
      } else {
          this.visibleSubject.next(false);
          this.dropdownService.close(this);
      }
      this.toggleEvent.emit(this.isOpen);
   }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dropdownService.close(this);
  }

  public set dropDownMenu(dropdownMenu) {
      // init drop down menu
      this.menuEl = dropdownMenu.el;
  }

  public set dropDownToggle(dropdownToggle) {
      // init toggle element
      this.toggleEl = dropdownToggle.el;
  }

  public toggle(): boolean {
      return this.isOpen = !this.isOpen;
  }


  public focusToggleElement() {
      if (this.toggleEl) {
          this.toggleEl.nativeElement.focus();
      }
  }

  @HostListener('mouseenter', ['$event'])
  public mouseEner(event: MouseEvent) {
      event.stopPropagation();

      if (!this.disabled && this.trigger === 'hover') {
          this.isOpen = true;
      }
      return false;
  }

  @HostListener('mouseleave', ['$event'])
  public mouseLeave(event: MouseEvent) {
      event.stopPropagation();

      if (!this.disabled && this.trigger === 'hover') {
        this.isOpen = false;
      }
      return false;
  }
}
