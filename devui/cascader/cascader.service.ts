import { Injectable, OnDestroy } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { Observable, Subject } from 'rxjs';
import { CascaderItem } from './cascader.type';

@Injectable()
export class CascaderService implements OnDestroy {
  _currentValue: Array<string | number> = [];

  multipleValue: Array<string | number>[] = [];

  options: CascaderItem[];

  columnList: CascaderItem[][] = [];
  searchResultList = [];

  canSelectParent = false;

  isMultiple = false;

  isLazyLoad = false;
  lazyloadCache = {};
  checkboxRelation = { upward: true, downward: true };

  loadChildrenFn: (value: CascaderItem) => Promise<CascaderItem[]> | Observable<CascaderItem[]>;

  set currentValue(value: Array<string | number>) {
    this._currentValue = value.filter((item) => item !== undefined);
    this.currentValueChange.next(this._currentValue);
  }

  get currentValue() {
    return this._currentValue;
  }

  set currentMultipleValue(value) {
    this.resetNodeStatus();
    this.multipleValue = value;
  }

  get currentMultipleValue() {
    this.multipleValue = [];
    this.getMultipleValue([], this.options);
    return this.multipleValue;
  }

  readonly closeMianDropdown = new Subject<void>();
  readonly currentValueChange = new Subject<Array<string | number>>();
  readonly resetStatus = new Subject<void>();
  readonly openDrawer = new Subject<void>();
  readonly updateShowText = new Subject<void>();
  readonly updateTagList = new Subject<{
    isAdd: boolean;
    option: CascaderItem;
    isEmit: boolean; // 是否触发onchanges,对外发出值
  }>();

  initOptions(options: CascaderItem[]): void {
    this.columnList = [];
    this.options = cloneDeep(options);
    // 标记根节点
    this.options.forEach((t) => {
      t.isRoot = true;
    });
    this.columnList.push(this.options);
  }

  openColumn(option: CascaderItem, colIndex: number, islazyLoad: boolean, reload = false): void {
    this.clearTargetActive(this.columnList[colIndex].find((t) => t.active));
    option.active = true;
    this.columnList.splice(colIndex + 1);

    if (option.children && option.children.length) {
      this.columnList.push(option.children);
      this.openDrawer.next();
    } else if (islazyLoad) {
      option._loading = true;

      const fn = this.loadChildrenFn(option);

      if ((fn as Promise<CascaderItem[]>).then) {
        (fn as Promise<CascaderItem[]>).then((res) => {
          this.columnList.splice(colIndex + 1); // 防止多个同时懒加载，造成多余的添加
          option.children = res || [];
          option._loading = false;
          this.columnList.push(res || []);
          this.openDrawer.next();

          if (this.isMultiple) {
            this.updateOptionCheckedStatus(option.value, option.checked, true, true, !reload);
          }
          if (reload) {
            if (!this.isMultiple) {
              this.updateOptionByValue();
            }
            this.updateShowText.next();
          }
        });
      } else {
        (fn as Observable<CascaderItem[]>).subscribe((res) => {
          this.columnList.splice(colIndex + 1); // 防止多个同时懒加载，造成多余的添加
          option.children = res || [];
          option._loading = false;
          this.columnList.push(res || []);
          this.openDrawer.next();

          if (this.isMultiple) {
            this.updateOptionCheckedStatus(option.value, option.checked, true, true, !reload);
          }

          if (reload) {
            if (!this.isMultiple) {
              this.updateOptionByValue();
            }
            this.updateShowText.next();
          }
        });
      }
    }
  }

  clearTargetActive(option: CascaderItem): void {
    if (!option) {
      return;
    }
    option.active = false;
    if (option.children) {
      this.clearTargetActive(option.children.find((t) => t.active));
    }
  }

  setCurrentValue(): void {
    this.currentValue = this.columnList.map((listItem) => listItem.find((optionItem) => optionItem.active)?.value);
  }

  updateOptionByValue(): void {
    this.resetNodeStatus();
    this.columnList = [this.options];
    for (let index = 0; index < this.currentValue.length; index++) {
      const target = this.columnList[index]?.find((listItem) => listItem.value === this.currentValue[index]);

      if (target) {
        target.active = true;
        if (target.children && target.children.length) {
          // 有子菜单展开子菜单
          this.columnList.push(target.children);
        } else if (this.isLazyLoad) {
          // 懒加载没有子菜单的情况下，非叶子节点执行展开，叶子节点执行选中
          this.openColumn(target, index, !target.isLeaf, !target.isLeaf);
          break;
        }
      } else {
        break;
      }
    }
  }

  lazyloadMultipleChild(target: CascaderItem, index: number) {
    if (!this.lazyloadCache[target.value]) {
      this.lazyloadCache[target.value] = true;
      this.openColumn(target, index, true, true);
    }
  }

  resetNodeStatus(option: CascaderItem[] = this.options): void {
    option.forEach((item) => {
      item.active = false;
      item.checked = false;
      item.halfChecked = false;
      if (item.children) {
        this.resetNodeStatus(item.children);
      }
    });
  }

  // 在多选模式下，更新节点树的checked状态
  updateOptionCheckedStatus(targetValue: string | number, checked: boolean, upward = true, downward = true, isEmit = true): void {
    let targetNode = this.options.find((t) => t.value === targetValue);
    // 当主下拉列表包含了目标，即目标无父节点
    if (targetNode) {
      targetNode.checked = checked;
      targetNode.halfChecked = false;
      if (targetNode.children && downward) {
        this.updateChildrenChecked(targetNode, checked, isEmit);
      }
    } else {
      // 当存在父节点时，需要检查同级节点来确定父节点状态
      const parentNode = this.getParentNode(targetValue);
      targetNode = parentNode.children.find((t) => t.value === targetValue);

      targetNode.checked = checked;
      targetNode.halfChecked = false;
      if (upward) {
        this.updateParentChecked(parentNode, isEmit);
      }
      if (targetNode.children && downward) {
        this.updateChildrenChecked(targetNode, checked, isEmit);
      }
    }
  }

  // 子节点按父节点状态更新
  updateChildrenChecked(node: CascaderItem, checked: boolean, isEmit: boolean) {
    let hasDisable = false;
    node.children.forEach((child) => {
      if (!child.disabled) {
        child.checked = checked;
        child.halfChecked = false;
        if (child.children && child.children.length) {
          if (this.canSelectParent) {
            this.updateTagList.next({
              isAdd: checked,
              option: child,
              isEmit,
            });
          }
          this.updateChildrenChecked(child, checked, isEmit);
        } else {
          this.updateTagList.next({
            isAdd: checked,
            option: child,
            isEmit,
          });
        }
      } else {
        hasDisable = true;
      }
    });

    if (hasDisable && !this.canSelectParent) {
      this.updateParentChecked(node, isEmit);
    }
  }

  // 父节点按所有子节点状态更新
  updateParentChecked(node: CascaderItem, isEmit: boolean) {
    const checkedChild = node.children.find((t) => t.checked);
    const halfcheckedChild = node.children.find((t) => t.halfChecked);
    const uncheckedChild = node.children.find((t) => !t.halfChecked && !t.checked);

    if (halfcheckedChild || (checkedChild && uncheckedChild)) {
      node.checked = false;
      node.halfChecked = true;
    } else if (!checkedChild && !halfcheckedChild) {
      node.checked = false;
      node.halfChecked = false;
    } else {
      node.checked = true;
      node.halfChecked = false;
    }

    if (this.canSelectParent) {
      this.updateTagList.next({
        isAdd: node.checked,
        option: node,
        isEmit,
      });
    }

    // 如果此节点非根节点，则继续找它的父节点进行更新
    if (!node.isRoot) {
      this.updateParentChecked(this.getParentNode(node.value), isEmit);
    }
  }

  // 获取父节点
  getParentNode(childValue: string | number): CascaderItem {
    const queue = [...this.options];
    let cur: CascaderItem;
    while (queue.length) {
      cur = queue.shift();
      if (cur.children && cur.children.find((t) => t.value === childValue)) {
        break;
      } else if (cur.children) {
        queue.push(...cur.children);
      }
    }
    return cur;
  }

  getMultipleValue(value, option: CascaderItem[]): void {
    const isNoRelation = !this.checkboxRelation.downward || !this.checkboxRelation.upward;
    option.forEach((item) => {
      const _value = [...value];
      _value.push(item.value);
      if (item.children && item.children.length && (item.checked || item.halfChecked)) {
        this.getMultipleValue(_value, item.children);
        if (isNoRelation) {
          this.multipleValue.push(_value);
        }
      } else if (item.checked) {
        this.multipleValue.push(_value);
      } else if (isNoRelation && item.children?.length) {
        this.getMultipleValue(_value, item.children);
      }
    });
  }

  closeAllDropdown(): void {
    this.closeMianDropdown.next();
  }

  // 搜索功能
  searchByString(str: string, currentlabel?: string, currentValue: Array<string | number> = [], list = this.options): void {
    list.forEach((item) => {
      const label = currentlabel ? currentlabel + ' / ' + item.label : item.label;
      const valueList = [...currentValue, item.value];
      if (item.children && item.children.length) {
        this.searchByString(str, label, valueList, item.children);
      } else {
        if (!item.disabled && label.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
          this.searchResultList.push({
            label,
            valueList,
            checked: item.checked,
          });
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.closeMianDropdown.complete();
    this.currentValueChange.complete();
    this.updateTagList.complete();
    this.resetStatus.complete();
    this.openDrawer.complete();
  }
}
