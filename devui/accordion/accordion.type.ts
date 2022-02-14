import { TemplateRef } from '@angular/core';

/* 基础数据类型 */
type AccordionMenuItemLinkType = 'routerLink' | 'hrefLink' | string;
export interface AccordionBase {
  title: string;
  disabled?: boolean;
  [prop: string]: any;
}
interface IAccordionActiveable {
  active?: boolean;
}
interface IAccordionFoldable<T> {
  open?: boolean;
  loading?: boolean;
  children?: Array<T>;
}

interface IAccordionLinkable {
  link?: string;
  target?: boolean;
  linkType?: AccordionMenuItemLinkType;
}
export interface AccordionBaseItem
  extends AccordionBase,
  IAccordionActiveable {
}
export interface AccordionBaseMenu<T>
  extends AccordionBase,
  IAccordionFoldable<T> {
}

export interface AccordionLinkableItem
  extends AccordionBase,
  IAccordionActiveable,
  IAccordionLinkable {
}
export interface AccordionMenuItem
  extends AccordionBase,
  IAccordionActiveable,
  IAccordionFoldable<AccordionMenuItem>,
  IAccordionLinkable {
}

export type AccordionMenuType = Array<AccordionMenuItem>;

/* 基础事件类型 */
export interface AccordionMenuToggleEvent {
  item: any;
  open: boolean;
  parent: any;
  event: MouseEvent;
}
export interface AccordionItemClickEvent {
  item: any;
  prevActiveItem?: any;
  parent: any;
  event: MouseEvent;
}

/* 通用公共配置数据类型 */
interface AccordionMenuKeyGroup {
  titleKey?: string;
  activeKey?: string;
  disabledKey?: string;
  openKey?: string;
  loadingKey?: string;
  childrenKey?: string;
  linkKey?: string;
  linkTargetKey?: string;
  linkTypeKey?: string;
}

type AccordionTemplateRefArray = 'itemTemplate' | 'menuItemTemplate' | 'noContentTemplate' | 'loadingTemplate' | 'innerListTemplate';
type AccordionTemplateRefGroup = {
  [p in AccordionTemplateRefArray]: TemplateRef<any>
};
interface AccordionConfigOptions {
  restrictOneOpen?: boolean;
  autoOpenActiveMenu?: boolean;
  showNoContent?: boolean;
  linkDefaultTarget?: string;
  i18nCommonText?: any;
  i18nText?: any;
  linkType: 'routerLink' | 'hrefLink' | 'dependOnLinkTypeKey' | '' | string;
}
export interface AccordionOptions
  extends AccordionConfigOptions,
  AccordionMenuKeyGroup,
  AccordionTemplateRefGroup {
}

/* 废弃接口 */
/** @deprecated  merge into `AccordionMenuItem`*/
export interface AccordionSubMenuItem {
  title: string;
  active?: boolean;
  disabled?: boolean;
  [prop: string]: any;
}
/** @deprecated  use `AccordionLinkableItem` instead*/
export interface AccordionSubMenuItemHrefLink {
  title: string;
  link: string;
  target?: string;
  active?: boolean;
  disabled?: boolean;
  [prop: string]: any;
}
/** @deprecated  use `AccordionLinkableItem` instead*/
export interface AccordionSubMenuItemRouterLink {
  title: string;
  link: string;
  target?: string;
  active?: boolean;
  disabled?: boolean;
  [prop: string]: any;
}
/** @deprecated  use `AccordionLinkableItem` instead*/
export interface AccordionSubMenuItemDynamicLink  {
  title: string;
  link: string;
  linkType: 'routerLink' | 'hrefLink' | string;
  target?: string;
  active?: boolean;
  disabled?: boolean;
  [prop: string]: any;
}
