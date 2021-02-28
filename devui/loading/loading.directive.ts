import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostBinding,
  Injector,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef, ViewContainerRef, ViewRef
} from '@angular/core';
import { forkJoin, from, Observable, Subscription, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingBackdropComponent } from './loading-backdrop.component';
import { LoadingComponent } from './loading.component';
import { LoadingType } from './loading.types';
@Directive({
  selector: '[dLoading]',
  exportAs: 'dLoading'
})
export class LoadingDirective implements OnChanges {
  @Input() message: string;
  @Input() backdrop: boolean;
  @Input() loadingTemplateRef: TemplateRef<any>;
  @Input() positionType: string;
  @Input() view: {
    top?: string;
    left?: string;
  };
  @HostBinding('style.position')
  position: string;

  @Input() showLoading;

  @Input() loading: LoadingType;
  @Input() zIndex: number ;
  backdropRef: ComponentRef<any>;
  loadingRef: ComponentRef<any>;
  active = true;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private triggerElementRef: ElementRef,
    private viewContainerRef: ViewContainerRef,
    private injector: Injector,
    private elementRef: ElementRef
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['showLoading'] || changes['loading'] || changes['backdrop'] || changes['loadingTemplateRef']
      || changes['message'] || changes['positionType'] || changes['view']  || changes['zIndex']) {
      if (this.showLoading !== undefined) {
        this.showLoadingChangeEvent(this.showLoading);
      }
      if (this.loading !== undefined) {
        this.loadingChangeEvent(this.loading);
      }
    }
  }

  loadingChangeEvent(loading) {
    if (loading instanceof Subscription) {
      this.startLoading();
      loading.add(() => this.endLoading());
      return;
    }
    const loadingArr = [].concat(loading).map(item => {
      if (item instanceof Observable) {
        return item;
      }
      return from(item);
    });

    if (loadingArr.length > 0) {
      this.startLoading();
      forkJoin(loadingArr)
        .pipe(
          catchError(error => {
            return throwError(error);
          })
        )
        .subscribe({
          next: null,
          error: () => {
            this.endLoading();
          },
          complete: () => {
            this.endLoading();
          }
        }

        );
    }
  }

  showLoadingChangeEvent(showLoading) {
    if (showLoading === true) {
      this.startLoading();
    } else {
      this.endLoading();
    }
  }
  private startLoading() {
    if (!this.loadingRef) {

      this.position = this.positionType || 'relative';

      if (this.backdrop) {
        this.createLoadingBackdrop();
      }
      this.loadingRef = this.viewContainerRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(LoadingComponent),
        null,
        this.injector
      );

      this.insert(this.loadingRef.hostView);

      Object.assign(this.loadingRef.instance, {
        message: this.message,
        loadingTemplateRef: this.loadingTemplateRef,
        top: this.view ? this.view.top : '50%',
        left: this.view ? this.view.left : '50%',
        isCustomPosition: !!this.view,
        zIndex: this.zIndex ? this.zIndex : '',
      });
    }
  }

  private endLoading() {
    if (this.loadingRef) {
      this.loadingRef.destroy();
      this.loadingRef = null;
    }

    if (this.backdropRef) {
      this.backdropRef.destroy();
      this.backdropRef = null;
    }
    this.position = '';
  }

  private createLoadingBackdrop() {
    this.backdropRef =
      !this.backdropRef &&
      this.viewContainerRef.createComponent(
        this.componentFactoryResolver.resolveComponentFactory(LoadingBackdropComponent),
        null,
        this.injector
      );
    this.insert(this.backdropRef.hostView);

    Object.assign(this.backdropRef.instance, {
      triggerElementRef: this.triggerElementRef,
      backdrop: this.backdrop,
      zIndex: this.zIndex ? this.zIndex : ''
    });
  }

  private insert(viewRef: ViewRef): ViewRef {
    (viewRef as EmbeddedViewRef<any>).rootNodes.forEach(node => this.elementRef.nativeElement.appendChild(node));
    return viewRef;
  }
}
