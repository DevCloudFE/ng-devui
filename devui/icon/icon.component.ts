import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Directive,
  ElementRef,
  HostBinding,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { fromEvent, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'd-icon',
  standalone: true,
  imports: [NgTemplateOutlet],
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnChanges, OnInit, OnDestroy {

  @Input() icon!: string | TemplateRef<any>;
  @Input() operable = false;
  @Input() disabled = false;
  @Input() rotate?: number | 'infinite';
  @Input() color?: string;
  protected iconTemplate?: TemplateRef<any>;
  protected iconName?: string;
  private destroy$ = new Subject<void>();

  private ngZone = inject(NgZone);
  private elementRef = inject(ElementRef);
  private cdf = inject(ChangeDetectorRef);

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.icon) {
      this.setIcon();
    }
  }

  private setIcon() {
    if (this.icon instanceof TemplateRef) {
      this.iconTemplate = this.icon;
    } else {
      this.iconName = this.icon;
    }
    this.cdf.detectChanges();
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
