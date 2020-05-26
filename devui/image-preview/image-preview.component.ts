import { Component, OnInit, Input, ElementRef, HostListener, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { I18nService, I18nInterface } from 'ng-devui/i18n';
import { TransformableElement } from './transformable-element';

@Component({
  selector: 'd-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DImagePreviewComponent implements OnInit, OnDestroy {
  _data: any;
  @Input()
  set data(data) {
    this._data = data;
    this.images = data.images;
    this.onClose = data.onClose;
    this.targetImageIndex = this.images.indexOf(data.targetImage);
    this.totalImageNum = this.images.length;
  }
  get data() {
    return this._data;
  }

  transformableImageElementRef: TransformableElement;
  images: HTMLElement[];
  isOptimal = true;
  targetImageIndex: number;
  totalImageNum: number;

  onClose: () => void;

  i18nText: I18nInterface['imagePreview'];
  i18nSubscription: Subscription;

  get targetImageSrc(): string {
    return this.images[this.targetImageIndex].getAttribute('src');
  }

  constructor(
    private elementRef: ElementRef,
    private i18n: I18nService
    ) { }

  @HostListener('click', ['$event'])
  click($event) {
    if ($event.target.classList.contains('devui-image-preview-wrapper')) {
      this.onClose();
    }
  }

  @HostListener('window:keydown.ArrowLeft', [])
  arrowLeft() {
    this.pre();
  }

  @HostListener('window:keydown.ArrowRight', [])
  arrowRight() {
    this.next();
  }

  ngOnInit() {
    this.addFullScreenStyle();
    this.transformableImageElementRef = new TransformableElement(this.getImgElement(), {});
    this.setI18nText();
  }

  setI18nText() {
    this.i18nText = this.i18n.getI18nText().imagePreview;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nText = data.imagePreview;
    });
  }

  ngOnDestroy() {
    this.removeFullScreenStyle();
    this.transformableImageElementRef.removeElementListener();
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();
    }
  }

  pre() {
    this.targetImageIndex = (this.targetImageIndex - 1 + this.totalImageNum) % this.totalImageNum;
  }

  next() {
    this.targetImageIndex = (this.targetImageIndex + 1) % this.totalImageNum;
  }

  zoomIn() {
    this.transformableImageElementRef.zoomIn();
  }

  zoomOut() {
    this.transformableImageElementRef.zoomOut();
  }

  rotate() {
    this.transformableImageElementRef.rotate();
  }

  setScaleBest() {
    this.transformableImageElementRef.setBestScale();
    this.isOptimal = true;
  }

  setScaleOriginal() {
    this.transformableImageElementRef.setOriginalScale();
    this.isOptimal = false;
  }

  private addFullScreenStyle() {
    document.querySelector('body').classList.add('devui-fullscreen');
  }

  private removeFullScreenStyle() {
    document.querySelector('body').classList.remove('devui-fullscreen');
  }

  private getImgElement(): HTMLElement {
    return this.elementRef.nativeElement.querySelector('.devui-image-preview-main-image');
  }
}
