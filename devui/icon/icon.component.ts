import { NgTemplateOutlet } from '@angular/common';
import { Component, Directive, ElementRef, HostBinding, Input, NgZone, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'd-icon',
  standalone: true,
  imports: [NgTemplateOutlet],
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

@Directive({
  selector: `d-icon-link, [dIconLink]`,
  standalone: true
})
export class IconLinkDirective {
  @HostBinding('class.devui-icon-link') default = true;
}


@Directive({
  selector: `d-icon-hover, [dIconHover]`,
  standalone: true
})
export class IconHoverDirective {
  @HostBinding('class.devui-icon-hover') default = true;
}
