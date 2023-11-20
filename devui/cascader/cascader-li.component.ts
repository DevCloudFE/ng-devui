import { ChangeDetectorRef, Component, HostListener, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CascaderService } from './cascader.service';
import { CascaderItem } from './cascader.type';

@Component({
  selector: 'd-cascader-li',
  templateUrl: './cascader-li.component.html',
  styleUrls: ['./cascader-li.component.scss'],
})
export class CascaderLiComponent implements OnInit, OnDestroy {
  @Input() width = 200;
  @Input() trigger: 'click' | 'hover' = 'hover';
  @Input() option: CascaderItem;
  @Input() multiple = false;
  @Input() canSelectParent = false;
  @Input() colIndex: number;
  @Input() dropDownItemTemplate: TemplateRef<any>;
  @Input() isLazyLoad: boolean;
  @Input() checkboxRelation = { upward: true, downward: true };

  dropdownEl: Element;
  isLeaf: boolean;
  selected: boolean;
  halfCheck: boolean;
  active: boolean;

  unsubscribe$ = new Subject<void>();

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.stopPropagation();
  }

  @HostListener('mouseenter', ['$event'])
  onMouseEnter(event) {
    if (this.trigger === 'hover') {
      if (this.option.disabled) {
        return;
      }
      this.cascaderSrv.openColumn(this.option, this.colIndex, false);
    }
  }

  constructor(
    private cascaderSrv: CascaderService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.isLazyLoad) {
      this.isLeaf = !!this.option.isLeaf;
    } else { // 当不是懒加载时可以通过children是否为空来判断是否为叶子节点
      this.isLeaf = this.option.isLeaf || !(this.option.children && this.option.children.length);
    }

    this.initObserable();
  }

  initObserable(): void {
    this.cascaderSrv.resetStatus.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(res => {
      this.selected = false;
      this.halfCheck = false;
      this.active = false;
    });
  }

  clickLeaf(): void {
    if (!this.option.disabled && !this.multiple) {
      this.cascaderSrv.openColumn(this.option, this.colIndex, false);
      this.option.active = true;
      this.cascaderSrv.setCurrentValue();
      this.cascaderSrv.closeAllDropdown();
    }
  }

  clickItem(): void {
    if (this.option.disabled) {
      return;
    }
    this.cascaderSrv.openColumn(this.option, this.colIndex, this.isLazyLoad);
    if (this.canSelectParent && !this.multiple) {
      this.cascaderSrv.setCurrentValue();
    }
  }

  clickCheckbox(event: Event): void {
    if (this.option.disabled) {
      return;
    }
    event.stopPropagation();
    // 如果是半选状态，更新为false，其他状态则更新为与checked相反
    const status = !!this.option.halfChecked;
    this.cascaderSrv.updateOptionCheckedStatus(
      this.option.value,
      this.option.halfChecked ? false : !this.option.checked,
      this.checkboxRelation.upward,
      this.checkboxRelation.downward,
    );

    if (status) {
      this.option.halfChecked = false;
    }

    if (this.isLeaf || this.canSelectParent) {
      this.updateValue(this.option.checked);
    }
  }

  // 阻止checkbox本身的点击事件变化
  avoidCheckboxChange(): boolean {
    return false;
  }

  updateValue(checked: boolean): void {
    this.cascaderSrv.updateTagList.next({
      isAdd: checked,
      option: this.option,
      isEmit: true
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
