/* tslint:disable: no-empty-interface*/
import { InjectionToken } from '@angular/core';

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
export interface IShowAnimationConfig {
  showAnimation?: boolean;
}
export interface GlobalConfig extends IShowAnimationConfig {}

export interface TooltipConfig extends IShowAnimationConfig {
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}
export interface PanelConfig extends IShowAnimationConfig {}
export interface ModalConfig extends IShowAnimationConfig {}
export interface DropdownConfig extends IShowAnimationConfig {}
export interface AccordionConfig extends IShowAnimationConfig {}
export interface TwodatepickerConfig extends IShowAnimationConfig {}
export interface PopoverConfig extends IShowAnimationConfig {}
export interface SelectConfig extends IShowAnimationConfig {}
export interface TreeselectConfig extends IShowAnimationConfig {}
export interface PopperConfig extends IShowAnimationConfig {}
export interface TreeConfig extends IShowAnimationConfig {}
export interface EditableselectConfig extends IShowAnimationConfig {}
export interface AutocompleteConfig extends IShowAnimationConfig {}
export interface MultiautocompleteConfig extends IShowAnimationConfig {}
export interface DatepickerConfig extends IShowAnimationConfig {}
export interface CascaderConfig extends IShowAnimationConfig {}
export interface TagsinputConfig extends IShowAnimationConfig {}
export interface TimepickerConfig extends IShowAnimationConfig {}
export interface CheckboxConfig extends IShowAnimationConfig {}

export type DevUIGlobalConfigKey = keyof DevUIGlobalConfig;
export type DevUIGlobalInsideConfigKey = keyof DevUIGlobalConfig['global'];

export const DevUIGlobalConfigToken = new InjectionToken<DevUIGlobalConfig>('DevUI_global_config');
