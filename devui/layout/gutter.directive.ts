import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBreakpoints, DResponseParameter } from './layout.types';
import { DScreenMediaQueryService } from './screen-media-query.service';

@Directive({
  selector: `[dGutter]`,
})

export class DGutterDirective implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private executedGutter: [number, number] = [null, null];

  @Input() dGutter: DResponseParameter<number | [number, number]>;
  @Input() dGutterDirection: 'vertical' | 'horizontal';
  @Input() dGutterNoOuter: DResponseParameter<boolean>;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private screenQueryService: DScreenMediaQueryService
  ) { }

  ngOnInit(): void {
    this.screenQueryService.getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint }) => {
        this.updateGutter(currentPoint);
      });
  }

  private getCurrentGutter(currentPoint): [number, number] {
    let finalGutter: [number, number] = [null, null];
    if (Array.isArray(this.dGutter) || typeof this.dGutter === 'number') {
      finalGutter = this._transGutterToArray(this.dGutter);
    } else {
      for (const point of DBreakpoints) {
        if (this.dGutter[point] !== undefined) {
          finalGutter = this._transGutterToArray(this.dGutter[point]);
        }
        if (currentPoint === point) {
          break;
        }
      }
    }

    return finalGutter;
  }

  private _transGutterToArray(gutter): [number, number] {
    let finalGutter = gutter;
    if (typeof gutter === 'number') {
      finalGutter = [gutter, null];
    }
    if (this.dGutterDirection === 'vertical') {
      finalGutter = finalGutter.reverse() as [number, number];
    }

    return finalGutter;
  }

  updateGutter(currentPoint) {
    const finalGutter = this.getCurrentGutter(currentPoint);

    this.updateChildrenGutter(finalGutter);
    this.updateParentGutter(finalGutter);

    this.executedGutter = finalGutter;
  }

  updateChildrenGutter(gutter: [number, number]) {
    const items = this.elementRef.nativeElement.children;

    for (let i = 0; i < items.length; i++) {
      if (gutter[0] !== null) {
        this.renderer.setStyle(items[i], 'padding-left', gutter[0] / 2 + 'px');
        this.renderer.setStyle(items[i], 'padding-right', gutter[0] / 2 + 'px');
      } else if (this.executedGutter[0] !== null) {
        this.renderer.removeStyle(items[i], 'padding-left');
        this.renderer.removeStyle(items[i], 'padding-right');
      }
      if (gutter[1] !== null) {
        this.renderer.setStyle(items[i], 'padding-top', gutter[1] / 2 + 'px');
        this.renderer.setStyle(items[i], 'padding-bottom', gutter[1] / 2 + 'px');
      } else if (this.executedGutter[1] !== null) {
        this.renderer.removeStyle(items[i], 'padding-top');
        this.renderer.removeStyle(items[i], 'padding-bottom');
      }
    }
  }

  updateParentGutter(gutter: [number, number]) {
    if (this.dGutterNoOuter) {
      const element = this.elementRef.nativeElement;
      if (gutter[0] !== null) {
        this.renderer.setStyle(element, 'margin-left', -gutter[0] / 2 + 'px');
        this.renderer.setStyle(element, 'margin-right', -gutter[0] / 2 + 'px');
      } else if (this.executedGutter[0] !== null) {
        this.renderer.removeStyle(element, 'margin-left');
        this.renderer.removeStyle(element, 'margin-right');
      }
      if (gutter[1] !== null) {
        this.renderer.setStyle(element, 'margin-top', -gutter[1] / 2 + 'px');
        this.renderer.setStyle(element, 'margin-bottom', -gutter[1] / 2 + 'px');
      } else if (this.executedGutter[1] !== null) {
        this.renderer.removeStyle(element, 'margin-top');
        this.renderer.removeStyle(element, 'margin-bottom');
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
