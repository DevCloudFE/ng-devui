import { Component, ElementRef, Input, NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'd-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class IconComponent implements OnInit, OnDestroy {

  @Input() icon: string | TemplateRef<any>;
  @Input() operable = false;
  @Input() disabled = false;
  @Input() rotate: number | 'infinite';
  @Input() color: string;
  private destroy$ = new Subject<void>();
  get template() {
    return this.icon instanceof TemplateRef ? this.icon : null;
  }

  constructor(private ngZone: NgZone, private elementRef: ElementRef) { }
  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click', { capture: true })
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          if (this.disabled) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        });
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
