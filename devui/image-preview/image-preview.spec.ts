import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { createMouseEvent } from '../utils/testing/event-helper';
import { ImagePreviewModule } from './image-preview.module';
@Component({
  template: `
    <div dImagePreview>
      <img *ngFor="let imgUrl of imgUrls" src="{{ imgUrl }}" />
    </div>
  `,
})
class TestImagePreviewComponent {
  imgUrls = ['/components/assets/overview/banner/18.png', '/components/assets/overview/banner/19.png'];
}

describe('image-preview', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<TestImagePreviewComponent>;
    let debugEl: DebugElement;
    let component: TestImagePreviewComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ImagePreviewModule, NoopAnimationsModule],
        declarations: [TestImagePreviewComponent],
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(TestImagePreviewComponent);
      debugEl = fixture.debugElement;
      component = fixture.componentInstance;
    });

    afterEach(() => {
      const imagePreviewEls = document.getElementsByTagName('d-image-preview');
      const dModalEls = document.getElementsByTagName('d-modal');
      for (let i = 0; i < imagePreviewEls.length; i++) {
        imagePreviewEls[i].parentNode.removeChild(imagePreviewEls[i]);
      }

      for (let i = 0; i < dModalEls.length; i++) {
        dModalEls[i].parentNode.removeChild(dModalEls[i]);
      }
    });

    it('should created correctly', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('should click the first image to open the preview modal and can be close', fakeAsync(() => {
      fixture.detectChanges();
      const container = debugEl.query(By.css('.devui-image-preview-container'));
      expect(container).not.toEqual(null);

      const imageEleRef = debugEl.query(By.css('img'));
      imageEleRef.nativeElement.dispatchEvent(new Event('click', { bubbles: true }));
      fixture.detectChanges();

      const previewImgEle = document.querySelector('img.devui-image-preview-main-image');
      expect(previewImgEle).not.toEqual(null);

      expect(previewImgEle.getAttribute('src')).toEqual(component.imgUrls[0]);

      const closeButtonEle = document.querySelector('button.devui-image-preview-close-btn');
      closeButtonEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      tick();
      const modalEle = document.querySelector('div.modal-backdrop') as HTMLElement;
      expect(getComputedStyle(modalEle, null).opacity).toEqual('0');
    }));

    it('should click the opt buttons to operate preview image', () => {
      fixture.detectChanges();

      const imageEleRef = debugEl.query(By.css('img'));
      imageEleRef.nativeElement.dispatchEvent(new Event('click', { bubbles: true }));
      fixture.detectChanges();

      const previewImgEle = document.querySelector('img.devui-image-preview-main-image');
      expect(previewImgEle).not.toEqual(null);
      expect(previewImgEle.getAttribute('src')).toEqual(component.imgUrls[0]);

      const buttons = document.querySelectorAll('.devui-image-preview-toolbar > button');

      // zoom-in
      const zoomInBtnEle = buttons[0];
      zoomInBtnEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect((previewImgEle as HTMLElement).style.transform.indexOf('scale(1.25)')).not.toEqual(-1);

      // zoom-out
      const zoomOutBtnEle = buttons[1];
      zoomOutBtnEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect((previewImgEle as HTMLElement).style.transform.indexOf('scale(1)')).not.toEqual(-1);

      // rotate
      const rotateBtnEle = buttons[2];
      rotateBtnEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect((previewImgEle as HTMLElement).style.transform.indexOf('rotate(-0.25turn)')).not.toEqual(-1);

      // pre
      const preBtnEle = buttons[3];
      preBtnEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(previewImgEle.getAttribute('src')).toEqual(component.imgUrls[1]);

      // next
      const nextBtnEle = buttons[4];
      nextBtnEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(previewImgEle.getAttribute('src')).toEqual(component.imgUrls[0]);

      // original
      const originalBtnEle = buttons[6];
      originalBtnEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();

      // best
      const bestBtnEle = buttons[5];
      bestBtnEle.dispatchEvent(new Event('click'));
      fixture.detectChanges();
      expect(getComputedStyle(previewImgEle).getPropertyValue('max-width').indexOf('90%')).not.toEqual(-1);

      // mouse zoom-in
      previewImgEle.dispatchEvent(new WheelEvent('mousewheel', { deltaY: 10 }));
      fixture.detectChanges();
      expect((previewImgEle as HTMLElement).style.transform.indexOf('scale(1.2)')).not.toEqual(-1);

      // mouse zoom-out
      previewImgEle.dispatchEvent(new WheelEvent('mousewheel', { deltaY: -10 }));
      fixture.detectChanges();
      expect((previewImgEle as HTMLElement).style.transform.indexOf('scale(1)')).not.toEqual(-1);

      // mouse drag to move the image
      previewImgEle.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      fixture.detectChanges();

      document.dispatchEvent(createMouseEvent('mousemove', 200, 200));
      document.dispatchEvent(createMouseEvent('mouseup'));
      fixture.detectChanges();
    });
  });
});
