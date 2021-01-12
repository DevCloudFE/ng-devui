import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'ng-devui/button';
import { DrawerModule, DrawerService, IDrawerOpenResult, IDrawerOptions } from 'ng-devui/drawer';
import { DrawerContentComponent } from './demo/drawerContent/drawer-content.component';
@Component({
  selector: 'd-basic',
  template: `
    <div class="placeHolder"></div>
    <d-button>close</d-button>
  `,
  styles: [`
    .placeHolder {
      height: 2000px;
    }
  `]
})
class TestDrawerComponent {
  onClose = jasmine.createSpy('onClose');
  results: IDrawerOpenResult;
  drawerOptions: IDrawerOptions = {
    drawerContentComponent: DrawerContentComponent,
    width: '900px',
    zIndex: 1000,
    isCover: true,
    backdropCloseable: true,
    escKeyCloseable: true,
    position: 'right',
    onClose: () => {
      this.onClose();
    },
    data: {
      text: 'hello',
      name: 'tom1',
      items: [
        'This is item 1',
        'This is item 2',
        'This is item 3',
        'This is item 4',
        'This is item 5',
      ]
    }
  };
  constructor(private drawerService: DrawerService) {

  }
  openDrawer() {
    this.results = this.drawerService.open(this.drawerOptions);
  }

  closeDrawer() {
    this.results.drawerInstance.hide();
  }
}

describe('Drawer', () => {
  let fixture: ComponentFixture<TestDrawerComponent>;
  let debugEl: DebugElement;
  let component: TestDrawerComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DrawerModule, ButtonModule, NoopAnimationsModule],
      declarations: [TestDrawerComponent, DrawerContentComponent]
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        
      }
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestDrawerComponent);
    debugEl = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    const drawerEl = document.getElementsByTagName('d-drawer');
    for (let i = 0; i < drawerEl.length; i++) {
      drawerEl[i].parentNode.removeChild(drawerEl[i]);
    }
  });

  it('should create with correct styles', fakeAsync(() => {
    expect(component).toBeTruthy();
    component.openDrawer();
    fixture.detectChanges();

    const bodyElement = document.querySelector('body') as HTMLElement;
    expect(bodyElement.className).toContain('devui-body-scrollblock');

    const drawerElement = document.querySelector('.drawer') as HTMLElement;
    expect(drawerElement.style.zIndex).toBe('1000');

    const drawerNavElement = document.querySelector('.drawer-nav') as HTMLElement;
    expect(drawerNavElement.style.width).toBe('900px');

    const backdropElement = document.querySelector('.overlay-wrapper') as HTMLElement;
    expect(backdropElement.clientWidth).toBeGreaterThan(0);

    component.closeDrawer();
    tick();
    fixture.detectChanges();
    flush();
    expect(bodyElement.className).not.toContain('devui-body-scrollblock');
  }));

  it('should create with different styles', fakeAsync(() => {
    component.drawerOptions.position = 'left';
    component.drawerOptions.isCover = false;
    component.openDrawer();
    fixture.detectChanges();

    const backdropElement = document.querySelector('.overlay-wrapper') as HTMLElement;
    expect(backdropElement.clientWidth).toBe(0);

    const drawerElement = document.querySelector('.drawer') as HTMLElement;
    expect(drawerElement.style.left).toBe('0px');

    component.closeDrawer();
    tick();
    fixture.detectChanges();
    flush();
  }));

  it('should public function work fine', fakeAsync(() => {
    component.openDrawer();
    fixture.detectChanges();

    const drawerOpenResult = component.results;
    drawerOpenResult.drawerInstance.setFullScreen(true);
    fixture.detectChanges();

    const drawerNavElement = document.querySelector('.drawer-nav') as HTMLElement;
    expect(drawerNavElement.style.width).toBe('100%');

    drawerOpenResult.drawerInstance.toggleFullScreen();
    fixture.detectChanges();
    expect(drawerNavElement.style.width).toBe('900px');

    drawerOpenResult.drawerInstance.setWidth('600px');
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(drawerNavElement.style.width).toBe('600px');

    component.closeDrawer();
    tick();
    fixture.detectChanges();
    flush();
  }));

  it('should afterOpened&beforeHidden work fine', fakeAsync(() => {
    let afterOpenedFlag = false;
    let beforeHiddenFlag = false;

    function afterOpened() {
      afterOpenedFlag = true;
    }

    function beforeHidden(): Promise<boolean> {
      return new Promise((resolve) => {
        beforeHiddenFlag = true;
        resolve(true);
      });
    }

    component.drawerOptions.afterOpened = () => afterOpened();
    component.drawerOptions.beforeHidden = () => beforeHidden();

    component.openDrawer();
    fixture.detectChanges();
    tick();
    expect(afterOpenedFlag).toBe(true, 'afterOpened');

    component.closeDrawer();
    tick();
    fixture.detectChanges();
    flush();
    expect(beforeHiddenFlag).toBe(true, 'beforeHidden');
  }));

  it('should destroyOnHide work fine', fakeAsync(() => {
    component.drawerOptions.destroyOnHide = false;
    component.openDrawer();
    fixture.detectChanges();

    component.closeDrawer();
    tick();
    fixture.detectChanges();

    expect(document.querySelector('d-drawer')).toBeTruthy();

    component.results.drawerInstance.destroy();
    tick();
    fixture.detectChanges();
    expect(document.querySelector('d-drawer')).toBeNull();
  }));
});
