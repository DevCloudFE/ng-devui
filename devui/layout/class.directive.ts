import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DBreakpoints, DResponseParameter } from './layout.types';
import { DScreenMediaQueryService } from './screen-media-query.service';

@Directive({
  selector: `[dClass]`,
})

export class DClassDirective implements OnInit, OnDestroy {
  @Input() dClass: DResponseParameter<string[]>;

  private destroy$ = new Subject<void>();
  private executedClassList: string[] = [];

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private screenQueryService: DScreenMediaQueryService
  ) { }

  ngOnInit(): void {
    this.screenQueryService.getPoint()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ currentPoint }) => {
        this.updateClass(currentPoint);
      });
  }

  /* TODO: 参数需要优化，不仅可以设置断点，还可以设置通用 */
  updateClass(currentPoint) {
    let finalClassList = [];

    if (!Array.isArray(this.dClass)) {
      for (const point of DBreakpoints) {
        if (this.dClass[point]) {
          finalClassList = [...finalClassList, ...this.dClass[point]];
        }
        if (currentPoint === point) {
          break;
        }
      }
    } else if (this.dClass) {
      finalClassList = [...this.dClass];
    }

    this.executedClassList.forEach(className => {
      this.renderer.removeClass(this.elementRef.nativeElement, className);
    });

    finalClassList.forEach(className => {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    });

    this.executedClassList = finalClassList;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
