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
  TemplateRef,
  ViewContainerRef,
  ViewRef,
} from '@angular/core';
import { Observable, Subscription, forkJoin, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadingBackdropComponent } from './loading-backdrop.component';
import { LoadingComponent } from './loading.component';
import { ILoadingViewPosition, LoadingStyle, LoadingType } from './loading.types';
@Directive({
  selector: '[dLoading]',
  exportAs: 'dLoading',
})
export class LoadingDirective implements OnChanges {
  @Input() backdrop: boolean;
  @Input() message: string;
  @Input() positionType: string;
  @Input() showLoading: boolean;
  @Input() view: ILoadingViewPosition;
  @Input() zIndex: number;
  @Input() loading: LoadingType | boolean;
  @Input() loadingStyle: LoadingStyle = 'default';
  @Input() loadingTemplateRef: TemplateRef<any>;
  @HostBinding('style.position') position: string;
  active = true;
  backdropRef: ComponentRef<any>;
  loadingRef: ComponentRef<any>;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private injector: Injector,
    private triggerElementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { backdrop, loading, loadingTemplateRef, message, positionType, showLoading, view, zIndex } = changes;
    const changeArr = [backdrop, loading, loadingTemplateRef, message, positionType, showLoading, view, zIndex];
    if (changeArr.find((item) => item !== undefined)) {
      // loading 兼容showLoading, 赋值类型为 boolean 时触发显示
      const isBoolean = typeof this.loading === 'boolean';
      const flag = isBoolean ? this.loading : undefined;
      const isLoading = this.showLoading !== undefined ? this.showLoading : flag;
      if (isLoading !== undefined) {
        this.showLoadingChangeEvent(isLoading as boolean);
      }
      if (!isBoolean && this.loading) {
        this.loadingChangeEvent(this.loading as LoadingType);
      }
    }
  }

  loadingChangeEvent(loading: LoadingType): void {
    if (loading instanceof Subscription) {
      this.startLoading();
      loading.add(() => this.endLoading());
      return;
    }
    const loadingArr = [].concat(loading).map((item) => (item instanceof Observable ? item : from(item)));
    if (loadingArr.length > 0) {
      this.startLoading();
      forkJoin(loadingArr)
        .pipe(catchError((error) => throwError(error)))
        .subscribe({
          next: null,
          error: () => this.endLoading(),
          complete: () => this.endLoading(),
        });
    }
  }

  showLoadingChangeEvent(showLoading: boolean): void {
    if (showLoading === true) {
      this.startLoading();
    } else {
      this.endLoading();
    }
  }

  private startLoading(): void {
    this.position = this.positionType || 'relative';

    if (this.backdrop && !this.backdropRef) {
      this.createLoadingBackdrop();
    }

    if (!this.backdrop && this.backdropRef) {
      this.backdropRef.destroy();
      this.backdropRef = null;
    }

    if (!this.loadingRef) {
      this.loadingRef = this.viewContainerRef.createComponent(LoadingComponent, { index: null, injector: this.injector });

      this.insert(this.loadingRef.hostView);
    }

    Object.assign(this.loadingRef.instance, {
      message: this.message,
      loadingTemplateRef: this.loadingTemplateRef,
      top: this.view ? this.view.top : '50%',
      left: this.view ? this.view.left : '50%',
      isCustomPosition: !!this.view,
      zIndex: this.zIndex ? this.zIndex : '',
      loadingStyle: this.loadingStyle,
    });
  }

  private endLoading(): void {
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

  private createLoadingBackdrop(): void {
    this.backdropRef =
      !this.backdropRef && this.viewContainerRef.createComponent(LoadingBackdropComponent, { index: null, injector: this.injector });

    this.insert(this.backdropRef.hostView);

    Object.assign(this.backdropRef.instance, {
      triggerElementRef: this.triggerElementRef,
      backdrop: this.backdrop,
      zIndex: this.zIndex ? this.zIndex : '',
    });
  }

  private insert(viewRef: ViewRef): ViewRef {
    (viewRef as EmbeddedViewRef<any>).rootNodes.forEach((node) => this.elementRef.nativeElement.appendChild(node));
    return viewRef;
  }
}
