import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBreakpoints, DResponseParameter } from './layout.types';
import { DScreenMediaQueryService } from './screen-media-query.service';

@Directive({
    selector: `[dSpace]`,
    standalone: false
})
export class DSpaceDirective implements OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>();
  private executedSpace: [number, number] = [null, null];

  @Input() dSpace: DResponseParameter<number | [number, number]>;
  @Input() dSpaceDirection: DResponseParameter<'vertical' | 'horizontal'>;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private screenQueryService: DScreenMediaQueryService) {}

  ngAfterViewInit(): void {
    this.screenQueryService
      .getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint }) => {
        this.updateSpace(currentPoint);
      });
  }

  private getCurrentSpace(currentPoint): [number, number] {
    let finalSpace: [number, number] = [null, null];
    if (Array.isArray(this.dSpace) || typeof this.dSpace === 'number') {
      finalSpace = this._transSpaceToArray(this.dSpace);
    } else {
      for (const point of DBreakpoints) {
        if (this.dSpace[point] !== undefined) {
          finalSpace = this._transSpaceToArray(this.dSpace[point]);
        }
        if (currentPoint === point) {
          break;
        }
      }
    }

    return finalSpace;
  }

  private _transSpaceToArray(space): [number, number] {
    let finalSpace = space;
    if (typeof space === 'number') {
      finalSpace = [space, null];
    }
    if (this.dSpaceDirection === 'horizontal') {
      finalSpace = finalSpace.reverse() as [number, number];
    }

    return finalSpace;
  }

  updateSpace(currentPoint) {
    const finalSpace = this.getCurrentSpace(currentPoint);

    const items = this.elementRef.nativeElement.children;

    for (let i = 0; i < items.length - 1; i++) {
      if (finalSpace[0] !== null) {
        this.renderer.setStyle(items[i], 'margin-bottom', finalSpace[0] + 'px');
      } else if (this.executedSpace[0] !== null) {
        this.renderer.removeStyle(items[i], 'margin-bottom');
      }
      if (finalSpace[1] !== null) {
        this.renderer.setStyle(items[i], 'margin-right', finalSpace[1] + 'px');
      } else if (this.executedSpace[1] !== null) {
        this.renderer.removeStyle(items[i], 'margin-right');
      }
    }

    this.executedSpace = finalSpace;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
