/**
 * Created by orehman on 2/22/2017.
 */

import { ElementRef } from '@angular/core';

export class Utils {
    /**
     * Polyfill for element.matches.
     * See: https://developer.mozilla.org/en/docs/Web/API/Element/matches#Polyfill
     * element
     */
    public static matches(element: any, selectorName: string): boolean {

        const proto: any = Element.prototype;

        const func =
            proto['matches'] ||
            proto.matchesSelector ||
            proto.mozMatchesSelector ||
            proto.msMatchesSelector ||
            proto.oMatchesSelector ||
            proto.webkitMatchesSelector ||
            function (s) {
                const matches = (this.document || this.ownerDocument).querySelectorAll(s);
                let i = matches.length;
                while (--i >= 0 && matches.item(i) !== this) {
                }
                return i > -1;
            };

        return func.call(element, selectorName);
    }

    /**
     * Applies the specified css class on nativeElement
     * elementRef
     * className
     */
    public static addClass(elementRef: ElementRef | any, className: string) {
        const e = this.getElementWithValidClassList(elementRef);

        if (e) {
            e.classList.add(className);
        }
    }

    /**
     * Removes the specified class from nativeElement
     * elementRef
     * className
     */
    public static removeClass(elementRef: ElementRef | any, className: string) {

        const e = this.getElementWithValidClassList(elementRef);

        if (e) {
            e.classList.remove(className);
        }
    }

    /**
     * Gets element with valid classList
     *
     * elementRef
     * @returns ElementRef | null
     */
    private static getElementWithValidClassList(elementRef: ElementRef) {

        const e = elementRef instanceof ElementRef ? elementRef.nativeElement : elementRef;

        if (e.classList !== undefined && e.classList !== null) {
            return e;
        }

        return null;
    }

    public static createPlaceholder(): any {
        const placeholder = document.createElement('li');
        placeholder.style.width = '100px';
        placeholder.style.height = '30px';
        placeholder.style.border = '2px solid red';
        return placeholder;
    }
}
