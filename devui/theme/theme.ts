export type ThemeId = string;

export class Theme {
  id: ThemeId;
  name: string;
  cnName?: string;
  data: {
    [cssVarName: string]: string;
  };
  extends?: ThemeId;
  isDark?: boolean;
  isPreview?: boolean;
  isExtendable?: boolean;
  extra?: {
    appendClass?: Array<string>;
    cssVariables?: {
      [cssVarName: string]: string;
    };
    [prop: string]: any;
  } | any;

  constructor(theme: {
    id: ThemeId;
    name: string;
    cnName?: string;
    data: {
      [cssVarName: string]: string;
    };
    extends?: ThemeId;
    isDark?: boolean;
    isPreview?: boolean;
    isExtendable?: boolean;
  }) {
    this.id = theme.id;
    this.name = theme.name;
    this.cnName = theme.cnName || this.name;
    this.data = theme.data;
    this.extends = theme.extends || null;
    this.isDark = theme.isDark || undefined;
    this.isPreview = theme.isPreview || false;
    this.isExtendable = theme.isExtendable || true;
  }
}
