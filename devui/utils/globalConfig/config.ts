import { InjectionToken } from '@angular/core';
import { AppendToBodyScrollStrategyType } from '../cdk-overlay-config.type';
export interface IGlobalConfig {
  showAnimation?: boolean;
  showGlowStyle?: boolean;
  bodyScrollable?: boolean;
  styleType?: 'default' | 'gray';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  appendToBodyScrollStrategy?: AppendToBodyScrollStrategyType;
}
export type GlobalConfig = IGlobalConfig;
export interface TooltipConfig extends IGlobalConfig {
  mouseEnterDelay?: number;
  mouseLeaveDelay?: number;
}
export type PanelConfig = IGlobalConfig;
export type ModalConfig = IGlobalConfig;
export type DropdownConfig = IGlobalConfig;
export type AccordionConfig = IGlobalConfig;
export type TwodatepickerConfig = IGlobalConfig;
export type PopoverConfig = IGlobalConfig;
export type SelectConfig = IGlobalConfig;
export type TreeselectConfig = IGlobalConfig;
export type PopperConfig = IGlobalConfig;
export type TreeConfig = IGlobalConfig;
export type EditableselectConfig = IGlobalConfig;
export type AutocompleteConfig = IGlobalConfig;
export type MultiautocompleteConfig = IGlobalConfig;
export type DatepickerConfig = IGlobalConfig;
export type CascaderConfig = IGlobalConfig;
export type TagsinputConfig = IGlobalConfig;
export type TimepickerConfig = IGlobalConfig;
export type CheckboxConfig = IGlobalConfig;
export type TypographyConfig = IGlobalConfig;
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
  typography?: TypographyConfig;
  global?: GlobalConfig;
}
export type DevUIGlobalConfigKey = keyof DevUIGlobalConfig;
export type DevUIGlobalInsideConfigKey = keyof DevUIGlobalConfig['global'];
export const DevUIGlobalConfigToken = new InjectionToken<DevUIGlobalConfig>('DevUI_global_config');
