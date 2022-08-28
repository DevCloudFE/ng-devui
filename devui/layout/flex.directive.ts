import { Directive, ElementRef, HostBinding, Input, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { updateClassList } from './layout-utils';
import { DAlign, DAlignSelf, DBreakpoints, DJustify, DResponseParameter } from './layout.types';
import { DScreenMediaQueryService } from './screen-media-query.service';

@Directive({
  selector: `[dFlex], d-row, d-col`,
})

export class DFlexDirective implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class.dl-flex-row') get flexRow() {
    return this.dFlexContainer === 'row';
  }
  @HostBinding('class.dl-flex-column') get flexColumn() {
    return this.dFlexContainer === 'column';
  }
  @HostBinding('class.dl-d-flex') get flex() {
    return !!this.dFlexContainer;
  }

  @Input() dFlex: DResponseParameter<number | string>;

  /* TODO: 这个也需要响应式 */
  @Input() dFlexContainer: 'row' | 'column';

  @Input() dOrder: DResponseParameter<number>;
  @Input() dAlign: DResponseParameter<DAlign>;
  @Input() dAlignSelf: DResponseParameter<DAlignSelf>;
  @Input() dJustify: DResponseParameter<DJustify>;

  /* TODO：实现这个特性 */
  @Input() dFlexWrap: DResponseParameter<string>;

  private destroy$ = new Subject();

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private screenQueryService: DScreenMediaQueryService
  ) { }
  parseFlex(flex: any): string {
    if (typeof flex === 'number') {
      return `${flex}`;
    } else if (typeof flex === 'string') {
      if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
      }
    }
    return flex;
  }

  updateFlex(currentPoint) {
    let finalFlex: number | string = '';
    if (this.dFlex) {
      if (typeof this.dFlex === 'object') {
        for (const point of DBreakpoints) {
          if (this.dFlex[point]) {
            finalFlex = this.dFlex[point];
          }
          if (currentPoint === point) {
            break;
          }
        }
      } else {
        finalFlex = this.dFlex;
      }
    }
    this.renderer.setStyle(this.elementRef.nativeElement, 'flex', this.parseFlex(finalFlex));
  }

  ngOnInit(): void {
    this.screenQueryService.getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint }) => {
        this.updateFlex(currentPoint);
      });
    updateClassList(this, this.elementRef, this.renderer);
  }

  ngOnChanges(): void {
    updateClassList(this, this.elementRef, this.renderer);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
