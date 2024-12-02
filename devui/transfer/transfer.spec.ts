import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, flush, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CheckBoxComponent } from '../checkbox';
import { ToggleModule } from '../toggle';
import { createDragEvent } from '../utils/testing/event-helper';
import { TransferModule } from './transfer.module';

@Component({
  selector: 'd-transfer-demo-base',
  template: `
    <section>
      <div style="width:700px; ">
        <d-transfer
          [disabled]="disabled"
          #comp
          [isSearch]="true"
          (transferToTarget)="transferToTarget($event)"
          (transferToSource)="transferToSource($event)"
          [sourceOption]="sourceOption"
          [targetOption]="targetOption"
          [isSearch]="true"
          [isSourceDroppable]="true"
          [isTargetDroppable]="true"
          [titles]="title"
        >
        </d-transfer>
      </div>
    </section>
  `,
})
class TransferDemoBaseComponent {
  disabled = false;
  sourceOption = [
    { name: '选项1', value: 1, id: 1 },
    { name: '选项2', value: 2, id: 2 },
    { name: '选项3', value: 3, id: 3, disabled: true },
    { name: '选项4', value: 3, id: 4 },
    { name: '选项5', value: 3, id: 5 },
    { name: '选项6', value: 3, id: 6 },
    { name: '选项7', value: 3, id: 7 },
    { name: '选项8', value: 3, id: 8 },
    { name: '选项9', value: 3, id: 9 },
    { name: '选项10', value: 3, id: 10, disabled: true },
    { name: '选项11', value: 3, id: 11 },
    { name: '选项12', value: 3, id: 12 },
    { name: '选项13', value: 3, id: 13 },
    { name: '选项14', value: 3, id: 14 },
    { name: '选项15', value: 3, id: 15 },
    { name: '选项16', value: 3, id: 16 },
    { name: '选项17', value: 3, id: 17 },
    { name: '选项18', value: 3, id: 18 },
  ];

  title = { source: '源标题', target: '目标标题' };

  targetOption = [
    { name: '选项19', value: 3, id: 19 },
    { name: '选项20', value: 5, id: 20 },
    { name: '选项21', value: 6, id: 21, disabled: true },
  ];

  transferToTarget = jasmine.createSpy('transfer to target');

  transferToSource = jasmine.createSpy('transfer to source');
}

describe('transfer', () => {
  let fixture: ComponentFixture<TransferDemoBaseComponent>;
  let testComponent: TransferDemoBaseComponent;
  let debugEle: DebugElement;
  let titles: DebugElement[];
  let contents: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransferModule, NoopAnimationsModule, ToggleModule],
      declarations: [TransferDemoBaseComponent],
    }).compileComponents();
  });

  describe('basic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(TransferDemoBaseComponent);
      testComponent = fixture.debugElement.componentInstance;
      debugEle = fixture.debugElement;
      fixture.detectChanges();

      titles = debugEle.queryAll(By.css('.devui-transfer-title'));
      contents = debugEle.queryAll(By.css('.devui-transfer-content'));
    });

    it('should render success', () => {
      expect(debugEle).toBeTruthy();
      expect(debugEle.query(By.css('.devui-transfer-source'))).toBeTruthy();
      expect(debugEle.query(By.css('.devui-transfer-option'))).toBeTruthy();
      expect(debugEle.query(By.css('.devui-transfer-target'))).toBeTruthy();
    });

    it('title should render correct', () => {
      const sourceTitle = titles[0];
      expect(sourceTitle.query(By.directive(CheckBoxComponent))).toBeTruthy();
      expect(sourceTitle.query(By.css('label')).nativeElement.textContent).toEqual(testComponent.title.source);

      const targetTitle = titles[1];
      expect(targetTitle.query(By.directive(CheckBoxComponent))).toBeTruthy();
      expect(targetTitle.query(By.css('label')).nativeElement.textContent).toEqual(testComponent.title.target);
    });

    it('content should render correct', () => {
      const sourceContent = contents[0];
      const sourceOption = sourceContent.queryAll(By.directive(CheckBoxComponent));
      expect(sourceOption.length).toEqual(testComponent.sourceOption.length);
      sourceOption.forEach((t, i) => {
        expect(t.query(By.css('label')).nativeElement.textContent).toEqual(testComponent.sourceOption[i].name);
      });

      const targetContent = contents[1];
      const targetOption = targetContent.queryAll(By.directive(CheckBoxComponent));
      expect(targetOption.length).toEqual(testComponent.targetOption.length);
      targetOption.forEach((t, i) => {
        expect(t.query(By.css('label')).nativeElement.textContent).toEqual(testComponent.targetOption[i].name);
      });
    });

    it('select all should work', fakeAsync(() => {
      fixture.detectChanges();
      const sourceAllCheck = titles[0].query(By.css('label'));
      sourceAllCheck.nativeElement.click();

      // allCheck更改会触发其他checkbox的更改，所以存在两轮异步事件，flush两次
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      testComponent.sourceOption.forEach((t) => {
        discardPeriodicTasks();
        if (t.disabled) {
          expect((t as any).checked).not.toBeTruthy();
        } else {
          expect((t as any).checked).toBeTruthy();
        }
      });

      const targetAllCheck = titles[1].query(By.css('label'));
      targetAllCheck.nativeElement.click();

      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      testComponent.targetOption.forEach((t) => {
        discardPeriodicTasks();
        if (t.disabled) {
          expect((t as any).checked).not.toBeTruthy();
        } else {
          expect((t as any).checked).toBeTruthy();
        }
      });
    }));

    it('click transfer button should work', fakeAsync(() => {
      fixture.detectChanges();
      const sourceOption = contents[0].queryAll(By.css('label'));
      sourceOption[0].nativeElement.click();

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const toRightButton = debugEle.queryAll(By.css('.devui-transfer-op'))[1];
      toRightButton.query(By.css('svg')).nativeElement.dispatchEvent(new Event('click'));

      tick();
      fixture.detectChanges();

      expect(testComponent.sourceOption.length).toEqual(17);
      expect(testComponent.targetOption.length).toEqual(4);
      expect(testComponent.sourceOption.map((t) => t.id)).not.toContain(1);
      expect(testComponent.targetOption.map((t) => t.id)).toContain(1);
      expect(testComponent.transferToTarget).toHaveBeenCalledTimes(1);

      const targetOption = contents[1].queryAll(By.css('label'));
      targetOption[0].nativeElement.click();

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      const toLeftButton = debugEle.queryAll(By.css('.devui-transfer-op'))[0];
      toLeftButton.query(By.css('svg')).nativeElement.dispatchEvent(new Event('click'));

      tick();
      fixture.detectChanges();
      flush();

      expect(testComponent.sourceOption.length).toEqual(18);
      expect(testComponent.targetOption.length).toEqual(3);
      expect(testComponent.sourceOption.map((t) => t.id)).toContain(19);
      expect(testComponent.targetOption.map((t) => t.id)).not.toContain(19);
      expect(testComponent.transferToSource).toHaveBeenCalledTimes(1);
    }));

    it('disable param should work', () => {
      const checkboxList = debugEle.queryAll(By.css('.devui-checkbox'));
      expect(checkboxList.find((t) => !t.nativeElement.classList.contains('disabled'))).toBeTruthy();

      testComponent.disabled = true;
      fixture.detectChanges();
      expect(checkboxList.find((t) => !t.nativeElement.classList.contains('disabled'))).not.toBeTruthy();
    });

    it('isSearch param should work', () => {
      const searchInputList = debugEle.queryAll(By.css('.devui-search'));

      expect(searchInputList.length).toEqual(2);
    });

    it('search function should work', () => {
      const searchInputList = debugEle.queryAll(By.css('.devui-search'));
      const sourceSearchInput = searchInputList[0];
      const targetSearchInput = searchInputList[1];

      expect(contents[0].queryAll(By.directive(CheckBoxComponent)).length).toEqual(18);

      sourceSearchInput.query(By.css('input')).nativeElement.value = '11';
      targetSearchInput.query(By.css('input')).nativeElement.value = '20';
      fixture.detectChanges();
      sourceSearchInput.query(By.css('.devui-search-icon')).nativeElement.click();
      targetSearchInput.query(By.css('.devui-search-icon')).nativeElement.click();
      fixture.detectChanges();

      expect(contents[0].queryAll(By.directive(CheckBoxComponent)).length).toEqual(1);
      expect(contents[1].queryAll(By.directive(CheckBoxComponent)).length).toEqual(1);
      expect(contents[0].query(By.directive(CheckBoxComponent)).query(By.css('label')).nativeElement.textContent).toEqual('选项11');
      expect(contents[1].query(By.directive(CheckBoxComponent)).query(By.css('label')).nativeElement.textContent).toEqual('选项20');

      sourceSearchInput.query(By.css('input')).nativeElement.value = '';
      targetSearchInput.query(By.css('input')).nativeElement.value = '';
      fixture.detectChanges();
      sourceSearchInput.query(By.css('.devui-search-icon')).nativeElement.click();
      targetSearchInput.query(By.css('.devui-search-icon')).nativeElement.click();
      fixture.detectChanges();

      expect(contents[0].queryAll(By.directive(CheckBoxComponent)).length).toEqual(18);
      expect(contents[1].queryAll(By.directive(CheckBoxComponent)).length).toEqual(3);
    });

    it('drag and drop should work', () => {
      fixture.detectChanges();
      const iconList = contents[0].queryAll(By.css('.devui-transfer-drag-handle'));
      const liList = contents[0].queryAll(By.css('li'));
      const dropPlace = liList[2].nativeElement;
      const firstIconRect = iconList[0].nativeElement.getBoundingClientRect();
      const dropPlaceRect = dropPlace.getBoundingClientRect();
      fixture.detectChanges();
      iconList[0].nativeElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      fixture.detectChanges();

      const dragstartEvent = createDragEvent('dragstart', {
        clientX: firstIconRect.left,
        clientY: firstIconRect.top,
        screenX: firstIconRect.left,
        screenY: firstIconRect.top,
      });
      iconList[0].nativeElement.dispatchEvent(dragstartEvent);

      fixture.detectChanges();

      const dragoverEvent = createDragEvent('dragover', {
        clientX: dropPlaceRect.left,
        clientY: dropPlaceRect.top,
        screenX: dropPlaceRect.left,
        screenY: dropPlaceRect.top,
      });

      dropPlace.dispatchEvent(dragoverEvent);
      fixture.detectChanges();

      const dropEvent = createDragEvent('drop', {
        clientX: dropPlaceRect.left,
        clientY: dropPlaceRect.top,
        screenX: dropPlaceRect.left,
        screenY: dropPlaceRect.top,
      });

      dropPlace.dispatchEvent(dropEvent);
      fixture.detectChanges();
      expect(testComponent.sourceOption[0].id).toEqual(2);
      expect(testComponent.sourceOption[1].id).toEqual(1);
    });

    it('target content drag and drop should work', () => {
      fixture.detectChanges();
      const iconList = contents[1].queryAll(By.css('.devui-transfer-drag-handle'));
      const liList = contents[1].queryAll(By.css('li'));
      const dropPlace = liList[2].nativeElement;
      const firstIconRect = iconList[0].nativeElement.getBoundingClientRect();
      const dropPlaceRect = dropPlace.getBoundingClientRect();
      fixture.detectChanges();
      iconList[0].nativeElement.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
      fixture.detectChanges();

      const dragstartEvent = createDragEvent('dragstart', {
        clientX: firstIconRect.left,
        clientY: firstIconRect.top,
        screenX: firstIconRect.left,
        screenY: firstIconRect.top,
      });
      iconList[0].nativeElement.dispatchEvent(dragstartEvent);

      fixture.detectChanges();

      const dragoverEvent = createDragEvent('dragover', {
        clientX: dropPlaceRect.left,
        clientY: dropPlaceRect.top,
        screenX: dropPlaceRect.left,
        screenY: dropPlaceRect.top,
      });

      dropPlace.dispatchEvent(dragoverEvent);
      fixture.detectChanges();

      const dropEvent = createDragEvent('drop', {
        clientX: dropPlaceRect.left,
        clientY: dropPlaceRect.top,
        screenX: dropPlaceRect.left,
        screenY: dropPlaceRect.top,
      });

      dropPlace.dispatchEvent(dropEvent);
      fixture.detectChanges();
      expect(testComponent.targetOption[0].id).toEqual(20);
      expect(testComponent.targetOption[1].id).toEqual(19);
    });
  });
});
