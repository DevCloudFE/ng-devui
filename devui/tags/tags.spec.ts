import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TagsModule } from './tags.module';

@Component({
  template: `
    <section>
      <d-tags [tags]="tagList" [displayProperty]="'name'" [mode]="'closeable'" [titleProperty]="'id'" (tagDelete)="deleteTag($event.index)">
      </d-tags>
    </section>
  `,
})
class TestTagsComponent {
  tagList: any = [
    { id: 918, name: '标签颜色1', labelStyle: 'blue-w98' },
    { id: 1769, name: '标签颜色2', labelStyle: 'green-w98' },
    { id: 555, name: '标签颜色3', labelStyle: 'yellow-w98' },
    { id: 668, name: '标签颜色4', labelStyle: 'orange-w98' },
  ];
  labelStyle = 'purple-w98';
  constructor() {}
  deleteTag = jasmine.createSpy('delete assign tag');
}

describe('tag', () => {
  let fixture: ComponentFixture<TestTagsComponent>;
  let testComponent: TestTagsComponent;
  let tags: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TagsModule],
      declarations: [TestTagsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTagsComponent);
    fixture.detectChanges();
    testComponent = fixture.debugElement.componentInstance;
    tags = fixture.debugElement.queryAll(By.css('.devui-tag-item'));
  });

  describe('basic', () => {
    it('should have been created successfully', () => {
      expect(testComponent).toBeTruthy();
    });

    it('should have correct value number', () => {
      expect(tags.length).toEqual(4);
    });

    it('should have correct style', () => {
      const labelStyle = <HTMLElement>tags[0].nativeElement;
      expect(labelStyle.classList).toContain('blue-w98');
    });

    it('should can be deleted', () => {
      const removeButton = <HTMLElement>tags[0].nativeElement.querySelector('.remove-button');
      removeButton.click();
      fixture.detectChanges();
      expect(testComponent.deleteTag).toHaveBeenCalledTimes(1);
    });
  });
});
