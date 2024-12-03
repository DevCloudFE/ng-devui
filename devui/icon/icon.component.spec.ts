import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { IconGroupComponent } from './icon-group.component';
import { IconComponent } from './icon.component';
import { IconModule } from './icon.module';

@Component({
  template: ` <d-icon-group>
      <d-icon [icon]="icon" [operable]="operable" [disabled]="disabled" [rotate]="rotate" [color]="color"></d-icon>
    </d-icon-group>
    <ng-template #iconTemplate>
      <svg></svg>
    </ng-template>`,
  standalone: true,
  imports: [IconModule],
})
class TestIconComponent {
  icon: string | TemplateRef<any> = '';
  operable = false;
  disabled = false;
  rotate?: number | 'infinite';
  color?: string;
  @ViewChild('iconTemplate', { static: true }) iconTemplate: TemplateRef<any>;
}

describe('dIcon', () => {
  let component: TestIconComponent;
  let fixture: ComponentFixture<TestIconComponent>;
  let iconGroupHostComponent: DebugElement;
  let iconHostComponent: DebugElement;
  let iconContainerElement: DebugElement;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestIconComponent);
    component = fixture.componentInstance;
    iconGroupHostComponent = fixture.debugElement.query(By.directive(IconGroupComponent));
    iconHostComponent = fixture.debugElement.query(By.directive(IconComponent));
    iconContainerElement = iconHostComponent.children[0];
    fixture.detectChanges();
  });

  describe('icon default behaviour', () => {
    it('icon should be created successfully', () => {
      expect(component).toBeTruthy();
      expect(iconGroupHostComponent).toBeTruthy();
      expect(iconHostComponent).toBeTruthy();
    });

    it('icon should have correct default classList', () => {
      expect(iconContainerElement.classes['devui-icon-container']).toBeTrue();
    });
  });

  describe('icon disabled', () => {
    beforeEach(() => {
      component.disabled = true;
      fixture.detectChanges();
    });

    it('icon should have apply class', () => {
      expect(iconContainerElement.classes.disabled).toBeTrue();
    });
  });

  describe('icon operable', () => {
    beforeEach(() => {
      component.operable = true;
      fixture.detectChanges();
    });

    it('icon should have apply class', () => {
      expect(iconContainerElement.classes['devui-icon-can-interactive']).toBeTrue();
    });
  });

  describe('icon input is string', () => {
    let iElement: DebugElement;
    beforeEach(() => {
      component.icon = 'icon-setting';
      fixture.detectChanges();
      iElement = iconContainerElement.children[0];
    });

    it('icon should have correct class', () => {
      expect(iElement.classes['devui-icon']).toBeTrue();
      expect(iElement.classes['icon-setting']).toBeTrue();
    });

    describe('icon rotate', () => {
      it('icon should have infinite class when rotate is infinite', () => {
        component.rotate = 'infinite';
        fixture.detectChanges();
        expect(iElement.classes['devui-icon-spin']).toBeTrue();
      });

      it('icon should have correct rotate style when rotate is number', () => {
        component.rotate = 45;
        fixture.detectChanges();
        expect(iElement.styles.transform).toEqual('rotate(45deg)');
      });
    });

    describe('icon color', () => {
      beforeEach(() => {
        component.color = 'blue';
        fixture.detectChanges();
      });

      it('icon should have correct color style', () => {
        expect(iElement.styles.color).toEqual('blue');
      });
    });
  });

  describe('icon customTemplate', () => {
    beforeEach(() => {
      component.icon = component.iconTemplate;
      fixture.detectChanges();
    });

    it('icon customTemplate should equal to input TemplateRef', () => {
      expect(iconContainerElement.children[0].nativeElement.outerHtml).toEqual(component.iconTemplate.elementRef.nativeElement.outerHtml);
    });
  });
});
