import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { updateClassList } from './layout-utils';
import { DResponseParameter } from './layout.types';

@Component({
    selector: 'd-col',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <ng-content></ng-content>
  `,
    styles: [`
    :host.d-col {
      padding: 0;
    }
  `],
    standalone: false
})
export class DColComponent implements OnInit, OnChanges {

  /* TODO: d-hide如何对外提供 */

  @HostBinding('class.d-col') dCol = true;

  @Input() dSpan: DResponseParameter<number | 'auto'> = 'auto';
  @Input() dOffset: DResponseParameter<number>;
  @Input() dPush: DResponseParameter<number>;
  @Input() dPull: DResponseParameter<number>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {
    updateClassList(this, this.elementRef, this.renderer);
  }

  ngOnChanges(): void {
    updateClassList(this, this.elementRef, this.renderer);
  }
}
