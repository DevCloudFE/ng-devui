import { Component } from '@angular/core';

@Component({
    selector: 'd-panel-header',
    template: `<ng-content></ng-content>`,
    preserveWhitespaces: false,
    standalone: false
})
export class PanelHeaderComponent { }
