import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'd-loading-backdrop',
  template: `<div
    class="devui-loading-backdrop"
    [ngStyle]="{ 'z-index': zIndex }"
    [ngClass]="{ 'devui-loading-full': targetName === 'BODY' }"
    *ngIf="backdrop"
  ></div>`,
  styleUrls: ['./loading-backdrop.component.scss'],
  preserveWhitespaces: false,
})
export class LoadingBackdropComponent implements OnInit, OnChanges {
  @Input() backdrop = true;
  @Input() target: Element;
  @Input() zIndex: number;
  targetName: string;

  ngOnInit() {
    if (this.target) {
      this.targetName = this.target.nodeName;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.target) {
      if (this.target) {
        this.targetName = this.target.nodeName;
      }
    }
  }
}
