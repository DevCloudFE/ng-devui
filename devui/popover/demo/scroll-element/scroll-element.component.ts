import { Component } from '@angular/core';
@Component({
    selector: 'd-scroll-element',
    templateUrl: './scroll-element.component.html'
})
export class ScrollElementComponent {
    scrollElement: Element = document.querySelector('.doc-viewer-container');
    constructor() {
    }
}
