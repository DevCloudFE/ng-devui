import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, HostListener, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { merge } from 'lodash-es';
import { Subscription } from 'rxjs';
import { TransformableElement } from './transformable-element';

export interface IImagePreviewToolbar {
  zoomIn?: boolean;
  zoomOut?: boolean;
  rotate?: boolean;
  prev?: boolean;
  next?: boolean;
  index?: boolean;
  scaleBest?: boolean;
  scaleOriginal?: boolean;
  originnalImage?: boolean;
  download?: boolean;
}

@Component({
  selector: 'd-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class DImagePreviewComponent implements OnInit, OnDestroy {
  @Input() set data(data) {
    this._data = data;
    this.images = data.images;
    this.onClose = data.onClose;
    this.targetImageIndex = this.images.indexOf(data.targetImage);
    this.totalImageNum = this.images.length;
    merge(this.toolbar, data.toolbar || {});
  }

  get data() {
    return this._data;
  }

  get targetImageSrc(): string {
    // 防止targetImageIndex出现-1的情况
    const idx = (this.targetImageIndex >= 0 && this.targetImageIndex) || 0;
    return this.images[idx].getAttribute('src');
  }

  toolbar: IImagePreviewToolbar = {
    zoomIn: true,
    zoomOut: true,
    rotate: true,
    prev: true,
    next: true,
    index: true,
    scaleBest: true,
    scaleOriginal: true,
    originnalImage: true,
    download: true,
  };
  transformableImageElementRef: TransformableElement;
  images: HTMLElement[];
  isOptimal = true;
  targetImageIndex: number;
  totalImageNum: number;
  disabledZoomIn = false;
  disabledZoomOut = false;
  showInput = false;
  i18nText: I18nInterface['imagePreview'];
  i18nSubscription: Subscription;
  document: Document;
  onClose: () => void;

  _data: any;

  constructor(private elementRef: ElementRef, private i18n: I18nService, @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  @HostListener('click', ['$event'])
  click($event) {
    if ($event.target.classList.contains('devui-image-preview-wrapper')) {
      this.onClose();
    }
  }

  @HostListener('touchstart', ['$event'])
  touchstart($event) {
    $event.clientX = $event.changedTouches[0].clientX;
    $event.clientY = $event.changedTouches[0].clientY;
    this.transformableImageElementRef.mouseDown($event);
  }

  @HostListener('touchmove', ['$event'])
  touchmove($event) {
    $event.clientX = $event.changedTouches[0].clientX;
    $event.clientY = $event.changedTouches[0].clientY;
    this.transformableImageElementRef.mouseMove($event);
  }

  @HostListener('touchend', ['$event'])
  touchend($event) {
    this.transformableImageElementRef.mouseDown($event);
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
    this.disabledZoomOut = false;
    this.disabledZoomIn = this.transformableImageElementRef.zoomIn();
  }

  zoomOut() {
    this.disabledZoomIn = false;
    this.disabledZoomOut = this.transformableImageElementRef.zoomOut();
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

  getOriginalImage(isDownload = false) {
    if (!this.targetImageSrc) {
      return;
    }
    if (!isDownload && this.targetImageSrc.startsWith('data:image')) {
      const img = this.images[this.targetImageIndex] as HTMLImageElement;
      const win = window.open();
      const content = `
        <html style="height: 100%;">
          <head>
            <meta name="viewport" content="width=device-width, minimum-scale=0.1">
            <title>base64 Image (${img.naturalWidth}×${img.naturalHeight})</title>
          </head>
          <body style="margin: 0px; background: #0e0e0e; height: 100%; display:flex; align-items:"center">
            <img style="display: block;-webkit-user-select: none;margin: auto;" src="${this.targetImageSrc}">
          </body>
        </html>`;
      win.document.body.outerHTML = content;
      win.opener = null;
    } else {
      const a = document.createElement('a');
      const event = new MouseEvent('click');
      a.href = this.targetImageSrc;
      a.rel = 'noopener';
      if (isDownload) {
        a.download = '';
      } else {
        a.target = '_blank';
      }
      a.dispatchEvent(event);
      a.remove();
    }
  }

  inputChange($event) {
    if (!isNaN($event) && $event && $event >= 1 && $event <= this.totalImageNum) {
      this.targetImageIndex = $event - 1;
    }
  }

  private addFullScreenStyle() {
    this.document.querySelector('body').classList.add('devui-fullscreen');
  }

  private removeFullScreenStyle() {
    this.document.querySelector('body').classList.remove('devui-fullscreen');
  }

  private getImgElement(): HTMLElement {
    return this.elementRef.nativeElement.querySelector('.devui-image-preview-main-image');
  }
}
