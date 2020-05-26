import { Directive, ElementRef, HostListener, HostBinding, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'ng-devui/modal';
import { DImagePreviewComponent } from './image-preview.component';
import { Subject } from 'rxjs';
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
