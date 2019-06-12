export interface AccordionMenuItem {
    title: string;
    open?: boolean;
    loading?: boolean;
    disabled?: boolean;
    children?: Array<AccordionSubMenuItem>
        | Array<AccordionSubMenuItemHrefLink>
        | Array<AccordionSubMenuItemRouterLink>
        | Array<AccordionSubMenuItemDynamicLink>;
    [prop: string]: any;
}
export interface AccordionSubMenuItem {
    title: string;
    active?: boolean;
    disabled?: boolean;
    [prop: string]: any;
}
export interface AccordionSubMenuItemHrefLink {
    title: string;
    link: string;
    target?: string;
    active?: boolean;
    disabled?: boolean;
    [prop: string]: any;
}
export interface AccordionSubMenuItemRouterLink  {
    title: string;
    link: string;
    target?: string;
    active?: boolean;
    disabled?: boolean;
    [prop: string]: any;
}

export interface AccordionSubMenuItemDynamicLink {
    title: string;
    link: string;
    linkType: 'routerLink' | 'hrefLink' | string;
    target?: string;
    active?: boolean;
    disabled?: boolean;
    [prop: string]: any;
}
export type AccordionMenuType = Array<AccordionMenuItem>;
