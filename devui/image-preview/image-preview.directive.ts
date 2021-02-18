import { Directive, ElementRef, HostBinding, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalService } from 'ng-devui/modal';
import { Subject } from 'rxjs';
import { DImagePreviewComponent } from './image-preview.component';
@Directive({
  selector: '[dImagePreview]',
})
export class ImagePreviewDirective implements OnInit, OnDestroy {

  constructor(
    private elementRef: ElementRef,
    private modalService: ModalService
    ) { }

  @Input() customSub: Subject<HTMLElement>;
  @Input() disableDefault = false;
  // TODO: 提供用户可定制选择器
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
      showAnimate: false,
      data: {
        targetImage: imageHTMLElement,
        images: Array.from(this.elementRef.nativeElement.querySelectorAll('img')),
        onClose: () => {
          modalRef.modalInstance.hide();
        },
      },
    });
  }

}
