import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'ng-devui/modal';
import { Subject } from 'rxjs';
import { DImagePreviewComponent, IImagePreviewToolbar } from './image-preview.component';
@Directive({
  selector: '[dImagePreview]',
})
export class ImagePreviewDirective implements OnInit, OnDestroy {
  @Input() customSub: Subject<HTMLElement>;
  @Input() disableDefault = false;
  @Input() toolbar: IImagePreviewToolbar;
  @Input() zIndex: number;
  @Input() backDropZIndex: number;

  @HostBinding('class.devui-image-preview-container')
  get defaultClasses() {
    return !this.disableDefault;
  }

  @HostListener('click', ['$event'])
  onClick($event) {
    if (this.disableDefault) {
      return;
    }
    const target = $event.target;
    if (target && target.nodeName.toLowerCase() === 'img') {
      this.imagePreView(target as HTMLElement);
    }
  }

  constructor(private elementRef: ElementRef, private modalService: ModalService) {}

  ngOnInit(): void {
    if (this.customSub) {
      this.customSub.subscribe((target) => {
        this.imagePreView(target);
      });
    }
  }

  ngOnDestroy(): void {
    if (this.customSub) {
      this.customSub.unsubscribe();
    }
  }

  imagePreView(imageHTMLElement: HTMLElement) {
    const modalRef = this.modalService.open({
      id: 'devui-image-preview-modal',
      component: DImagePreviewComponent,
      zIndex: this.zIndex,
      backDropZIndex: this.backDropZIndex,
      showAnimation: false,
      data: {
        targetImage: imageHTMLElement,
        toolbar: this.toolbar,
        images: Array.from(this.elementRef.nativeElement.querySelectorAll('img')),
        onClose: () => {
          modalRef.modalInstance.hide();
        },
      },
    });
  }
}
