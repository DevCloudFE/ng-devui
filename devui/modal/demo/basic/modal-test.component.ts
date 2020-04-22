import { Component, Input } from '@angular/core';
@Component({
    templateUrl: './modal-test.component.html'
})
export class ModalTestComponent {
    @Input() data: any;
    @Input() handler: Function;
    buttonsObj: any = 'id?: string; cssClass?: string; text: string; handler: ($event: Event) => void;';

    constructor() {
    }

    close($event) {
        this.handler($event);
    }

    onClick(event) {
    }
}
