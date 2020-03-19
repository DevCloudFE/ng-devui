import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'd-status',
    templateUrl: './status.component.html',
    styleUrls: ['./status.component.scss']
})

export class StatusComponent implements OnInit {

    private _type: String;
    classMap = {};

    @Input()
    get type() {
        return this._type;
    }

    set type(value: String) {
        this._type = value;
        this.setClassMap();
    }

    setClassMap() {
        this.classMap = 'd-status-bg-' + this.type;
    }

    constructor() { }

    ngOnInit() { }
}
