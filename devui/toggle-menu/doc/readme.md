# toggle-menu 组件使用指南

## 组件介绍

toggle-menu 是一个将下拉列表拆分成多个独立功能的组件。通过不同的组合方式来实现各类型包含下拉列表功能的组件，从而避免重复开发，保持一致性。

## 基本组成

**d-toggle-menu-container** 全局容器，负责控制下拉列表展开关闭、键盘事件监听、append to body。
**d-toggle-menu-placeholder** 占位文字
**d-toggle-menu-search** 搜索组件
**d-toggle-menu-input Input** 选中内容单行显示，支持使用模板
**d-toggle-menu-label** 选中内容标签化显示
**d-toggle-menu-operation** 操作按钮容器，目前支持清空和显示下拉列表展开关闭状态图标。
**d-toggle-menu-list** 通用列表，作为下拉列表主体展示内容，可以单独作为列表使用。
**d-toggle-menu-list-item** 列表单项组件，支持使用模板

## select 组件使用参考

参见如下代码，d-toggle-menu-container 中可以按需 d-toggle-menu-placeholder、d-toggle-menu-input、d-toggle-menu-label、d-toggle-menu-list 等组件。d-toggle-menu-list 通过模板形式调用 d-toggle-menu-list-item 组件，除了插入 d-toggle-menu-container 也可以单独使用，例如 auto-complete 中的下拉列表。

```html
<d-toggle-menu-container
  [isOpen]="isOpen"
  [appendToBody]="appendToBody"
  [appendToBodyDirections]="appendToBodyDirections"
  [selectWrapper]="selectWrapperItem"
  [width]="width"
  [size]="size"
  [disabled]="disabled"
  [showAnimation]="showAnimation"
  [toggleOnFocus]="toggleOnFocus"
  (passEvent)="passEvent($event)"
  (toggleChange)="toggleChangeFn($event)"
>
  <d-toggle-menu-placeholder *ngIf="isPlaceholderShow" [placeholder]="placeholder"></d-toggle-menu-placeholder>
  <d-toggle-menu-input
    *ngIf="!isPlaceholderShow && !isMultiple"
    [value]="value"
    [inputValue]="inputValue"
    [filterKey]="filterKey"
    [disabled]="disabled"
    [readonly]="readonly"
    [isDisabledCustomTemplate]="
        !(extraConfig?.labelization?.enable && multiple) &&
        !(!extraConfig?.labelization?.enable && extraConfig?.selectedItemWithTemplate?.enable && (inputItemTemplate || itemTemplate))
      "
    [customTemplate]="(extraConfig?.selectedItemWithTemplate?.enable && inputItemTemplate) || itemTemplate"
  ></d-toggle-menu-input>
  <d-toggle-menu-label
    *ngIf="!isPlaceholderShow && isMultiple"
    [mode]="extraConfig.labelization.overflow"
    [multiItems]="multiItems"
    [disabled]="disabled"
    [optionDisabledKey]="optionDisabledKey"
    [maxWidth]="extraConfig?.labelization?.labelMaxWidth"
    [maxHeight]="extraConfig?.labelization?.containerMaxHeight || extraConfig?.labelization?.containnerMaxHeight"
    [valueParser]="valueParser"
    (removeChange)="removeItem($event)"
  ></d-toggle-menu-label>
  <d-toggle-menu-operation
    [controlConfig]="{ chevron: true }"
    [showAnimation]="showAnimation"
    [chevronStatus]="isOpen"
  ></d-toggle-menu-operation>
  <d-toggle-menu-list
    [eventHandle]="inputEvent"
    [options]="listData"
    [value]="value"
    [optionDisabledKey]="optionDisabledKey"
    [optionImmutableKey]="optionImmutableKey"
    [size]="size"
    [isFiltering]="searchInputValue?.length"
    [virtualScroll]="virtualScroll"
    [enableLazyLoad]="enableLazyLoad"
    [listItemTemplate]="listItem"
    [loadingTemplateRef]="loadingTemplateRef"
    [noResultItemTemplate]="noResultItemTemplate"
    [customViewTemplate]="customViewTemplate"
    [customViewDirection]="customViewDirection"
    [scrollHeight]="scrollHight"
    [templateItemSize]="templateItemSize"
    [multiple]="multiple"
    [multiItems]="multiItems"
    [isSelectAll]="isSelectAll"
    [keepMultipleOrder]="keepMultipleOrder"
    (toggleChange)="toggleChangeFn($event)"
    (valueChange)="setValue($event)"
    (loadMore)="loadMoreFn($event)"
  >
    <d-toggle-menu-search
      *ngIf="isSearch"
      [inputValue]="inputValue"
      [searchPlaceholder]="searchPlaceholder"
      [searchFn]="searchFn"
      (searchInputValueChange)="searchInputValueChange($event)"
    ></d-toggle-menu-search>
    <ng-template
      #listItem
      let-item="item"
      let-index="index"
      let-selectIndex="selectIndex"
      let-activeIndex="activeIndex"
      let-choose="choose"
    >
      <d-toggle-menu-list-item
        [item]="item"
        [index]="index"
        [selectIndex]="selectIndex"
        [activeIndex]="activeIndex"
        [formatter]="formatter"
        [filterKey]="filterKey"
        [optionDisabledKey]="optionDisabledKey"
        [highlightItemClass]="highlightItemClass"
        [multiple]="multiple"
        [customTemplate]="(extraConfig?.selectedItemWithTemplate?.enable && inputItemTemplate) || itemTemplate"
        [color]="color"
        (chooseItem)="choose($event)"
      ></d-toggle-menu-list-item>
    </ng-template>
  </d-toggle-menu-list>
</d-toggle-menu-container>
```
