import { TemplateRef } from '@angular/core';

export interface MenuConfig {
    name: string;
    link: string;
    linkType?: 'hrefLink' | 'routerLink';
    target?: string;
}
export interface SourceConfig {
    title: string;
    link?: string;
    showMenu?: boolean;
    isSearch?: boolean;
    target?: string;
    menuList?: Array<MenuConfig>;
    customMenuTemplate?: TemplateRef<any>;
    noNavigation?: boolean;
    linkType?: 'hrefLink' | 'routerLink';
}
