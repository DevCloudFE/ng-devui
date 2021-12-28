import { InjectionToken } from '@angular/core';
export interface IShowAnimationConfig {
  showAnimation?: boolean;
}
export type GlobalConfig = IShowAnimationConfig;

export interface TooltipConfig extends IShowAnimationConfig {
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}
export type PanelConfig = IShowAnimationConfig;
export type ModalConfig = IShowAnimationConfig;
export type DropdownConfig = IShowAnimationConfig;
export type AccordionConfig = IShowAnimationConfig;
export type TwodatepickerConfig = IShowAnimationConfig;
export type PopoverConfig = IShowAnimationConfig;
export type SelectConfig = IShowAnimationConfig;
export type TreeselectConfig = IShowAnimationConfig;
export type PopperConfig = IShowAnimationConfig;
export type TreeConfig = IShowAnimationConfig;
export type EditableselectConfig = IShowAnimationConfig;
export type AutocompleteConfig = IShowAnimationConfig;
export type MultiautocompleteConfig = IShowAnimationConfig;
export type DatepickerConfig = IShowAnimationConfig;
export type CascaderConfig = IShowAnimationConfig;
export type TagsinputConfig = IShowAnimationConfig;
export type TimepickerConfig = IShowAnimationConfig;
export type CheckboxConfig = IShowAnimationConfig;
export interface DevUIGlobalConfig {
  tooltip?: TooltipConfig;
  dropdown?: DropdownConfig;
  accordion?: AccordionConfig;
  popover?: PopoverConfig;
  select?: SelectConfig;
  modal?: ModalConfig;
  treeselect?: TreeselectConfig;
  popper?: PopperConfig;
  tree?: TreeConfig;
  editableselect?: EditableselectConfig;
  autocomplete?: AutocompleteConfig;
  multiautocomplete?: MultiautocompleteConfig;
  datepicker?: DatepickerConfig;
  daterangepicker?: DatepickerConfig;
  datepickerappendtobody?: DatepickerConfig;
  twodatepicker?: DatepickerConfig;
  cascader?: CascaderConfig;
  tagsinput?: TagsinputConfig;
  timepicker?: TimepickerConfig;
  checkbox?: CheckboxConfig;
  checkboxgroup?: CheckboxConfig;
  panel?: PanelConfig;
  global?: GlobalConfig;
}


export type DevUIGlobalConfigKey = keyof DevUIGlobalConfig;
export type DevUIGlobalInsideConfigKey = keyof DevUIGlobalConfig['global'];

export const DevUIGlobalConfigToken = new InjectionToken<DevUIGlobalConfig>('DevUI_global_config');
