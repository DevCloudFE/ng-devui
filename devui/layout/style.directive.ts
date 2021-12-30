import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBreakpoints, DResponseParameter } from './layout.types';
import { DScreenMediaQueryService } from './screen-media-query.service';

@Directive({
  selector: `[dStyle]`,
})

export class DStyleDirective implements OnInit, OnDestroy {
  @Input() dStyle: DResponseParameter<Object>;

  private destroy$ = new Subject();
  private styleObject = {};

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private screenQueryService: DScreenMediaQueryService
  ) { }

  ngOnInit(): void {
    this.screenQueryService.getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint }) => {
        this.updateStyle(currentPoint);
      });
  }

  updateStyle(currentPoint) {
    let finalStyleObject = {};
    let isResponse = false;

    if (this.dStyle) {
      for (const point of DBreakpoints) {
        if (this.dStyle[point]) {
          finalStyleObject = { ...finalStyleObject, ...this.dStyle[point] };
          isResponse = true;
        }
        if (currentPoint === point) {
          break;
        }
      }

      if (!isResponse) {
        finalStyleObject = { ...this.dStyle };
      }
    }

    Object.keys(this.styleObject).forEach(key => {
      this.renderer.removeStyle(this.elementRef.nativeElement, key);
    });

    Object.keys(finalStyleObject).forEach(key => {
      this.renderer.setStyle(this.elementRef.nativeElement, key, finalStyleObject[key]);
    });

    this.styleObject = finalStyleObject;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
