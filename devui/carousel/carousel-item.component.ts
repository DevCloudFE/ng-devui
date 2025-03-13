import { Component } from '@angular/core';

@Component({
    selector: 'd-carousel-item',
    template: `<ng-content></ng-content>`,
    preserveWhitespaces: false,
    standalone: false
})
export class CarouselItemComponent {}
