import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CarouselComponent } from './carousel.component';
import { CarouselModule } from './carousel.module';
@Component({
  template: `
    <section>
    <d-carousel #carousel="dCarousel" [autoplay]="autoplay" [autoplaySpeed]="autoplaySpeed" [height]="height" [dotTrigger]="dotTrigger"
     [activeIndex]="activeIndex" [arrowTrigger]="arrowTrigger">
      <d-carousel-item *ngFor="let i of array">{{ 'page ' + i }}</d-carousel-item>
    </d-carousel>
  </section>
  `,
  styles: [
    `
    d-carousel-item {
      text-align: center;
      line-height: 200px;
      background: var(--devui-global-bg, #f5f5f5);
    }
    `
  ]
})
class TestCarouselComponent {
  array = [1, 2, 3, 4];
  height = '200px';
  dotTrigger = 'hover';
  arrowTrigger = 'always';
  activeIndex = 0;
  autoplay = false;
  autoplaySpeed = 500;
  @ViewChild('carousel') carousel: CarouselComponent;
}

describe('CarouselComponent', () => {
  let testComponent: TestCarouselComponent;
  let fixture: ComponentFixture<TestCarouselComponent>;
  let carouselElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CarouselModule],
      declarations: [ TestCarouselComponent ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCarouselComponent);
    testComponent = fixture.componentInstance;
    carouselElement = fixture.debugElement.query(By.directive(CarouselComponent)).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });

  it('should change arrowTrigger', () => {
    expect(carouselElement.querySelector('.devui-carousel-arrow')).not.toBeNull();
    testComponent.arrowTrigger = 'never';
    fixture.detectChanges();
    expect(carouselElement.querySelector('.devui-carousel-arrow')).toBeNull();
    const containerElement = carouselElement.querySelector('.devui-carousel-container');
    containerElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
  });

  it('should change activeIndex', () => {
    testComponent.activeIndex = 1;
    fixture.detectChanges();
    const itemContainerElement = carouselElement.querySelector('.devui-carousel-item-container');
    const left = getComputedStyle(itemContainerElement).getPropertyValue('left');
    expect(Number.parseFloat(left)).toBeCloseTo(-itemContainerElement.clientWidth / 4, 0);
  });

  it('should change prev page', fakeAsync(() => {
    (<HTMLElement>carouselElement.querySelector('.arrow-left')).click();
    fixture.detectChanges();
    tick(500);
    const itemContainerElement = carouselElement.querySelector('.devui-carousel-item-container');
    const left = getComputedStyle(itemContainerElement).getPropertyValue('left');
    expect(Number.parseFloat(left)).toBeCloseTo(-itemContainerElement.clientWidth * 0.75, 0);
  }));

  it('should change next page', () => {
    (<HTMLElement>carouselElement.querySelector('.arrow-right')).click();
    fixture.detectChanges();
    const itemContainerElement = carouselElement.querySelector('.devui-carousel-item-container');
    const left = getComputedStyle(itemContainerElement).getPropertyValue('left');
    expect(Number.parseFloat(left)).toBeCloseTo(-itemContainerElement.clientWidth / 4, 0);
  });

  it('should change last next page', fakeAsync(() => {
    testComponent.activeIndex = 3;
    fixture.detectChanges();
    (<HTMLElement>carouselElement.querySelector('.arrow-right')).click();
    fixture.detectChanges();
    tick(500);
    const itemContainerElement = carouselElement.querySelector('.devui-carousel-item-container');
    expect(getComputedStyle(itemContainerElement).getPropertyValue('left')).toEqual('0px');
  }));

  it('should change to right index', fakeAsync(() => {
    testComponent.carousel.goTo(0);
    fixture.detectChanges();
    expect(testComponent.carousel.activeIndex).toEqual(0);
    testComponent.activeIndex = 1;
    fixture.detectChanges();
    testComponent.carousel.goTo(-1);
    fixture.detectChanges();
    expect(testComponent.carousel.activeIndex).toEqual(0);
    testComponent.carousel.goTo(4);
    fixture.detectChanges();
    expect(testComponent.carousel.activeIndex).toEqual(3);
  }));

  it('should change page when trigger dots', fakeAsync(() => {
    const dotItemElement = carouselElement.querySelectorAll('.dot-item')[2];
    dotItemElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(testComponent.carousel.activeIndex).toEqual(2);
  }));

  it('should can be change page when hover', () => {
    testComponent.arrowTrigger = 'hover';
    fixture.detectChanges();
    const containerElement = carouselElement.querySelector('.devui-carousel-container');
    containerElement.dispatchEvent(new Event('mouseenter'));
    fixture.detectChanges();
    expect(carouselElement.querySelector('.devui-carousel-arrow')).not.toBeNull();
    containerElement.dispatchEvent(new Event('mouseleave'));
    fixture.detectChanges();
    expect(carouselElement.querySelector('.devui-carousel-arrow')).toBeNull();
  });

  it('should can be autoplay', fakeAsync(() => {
    testComponent.autoplay = true;
    testComponent.autoplaySpeed = 500;
    fixture.detectChanges();
    tick(500);
    expect(testComponent.carousel.activeIndex).toEqual(1);
    testComponent.autoplaySpeed = null;
    fixture.detectChanges();
  }));

  it('should can be change items', () => {
    testComponent.array = [1, 2, 3];
    fixture.detectChanges();
    expect(carouselElement.querySelectorAll('d-carousel-item').length).toEqual(3);
  });
});
