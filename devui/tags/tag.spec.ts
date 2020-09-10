import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { TagsModule } from './tags.module';
import { By } from '@angular/platform-browser';
import { TagComponent } from './tag.component';

@Component({
  template: `
    <section>
    <d-tag
      [tag]="tagName"
      [deletable]="deletable"
      (tagDelete)="deleteTag($event)"
      [labelStyle]="labelStyle"
      [customViewTemplate]="customTag">
    </d-tag>
    <ng-template #customTag let-tag="tag">
      <span class="icon-bug" style="vertical-align: middle;"></span>
      <span class="tag-value" title="{{ tag }}">{{ tag }}</span>
    </ng-template>
    </section>
  `,
})
class TestTagComponent {
  tagName = 'bug';
  deletable = true;
  labelStyle = 'purple-w98';
  constructor() {}
  deleteTag = jasmine.createSpy('delete tag');
}

describe('tag', () => {
  let fixture: ComponentFixture<TestTagComponent>;
  let testComponent: TestTagComponent;
  let tagElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TagsModule, FormsModule],
      declarations: [TestTagComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTagComponent);
    fixture.detectChanges();
    testComponent = fixture.debugElement.componentInstance;
    tagElement = fixture.debugElement.query(By.directive(TagComponent)).nativeElement;
  });

  describe('basic', () => {
    it('should have been created successfully', () => {
      expect(testComponent).toBeTruthy();
    });

    it('should can be change name', () => {
      testComponent.tagName = 'newBug';
      fixture.detectChanges();
      expect(tagElement.querySelector('.tag-value').textContent).toEqual('newBug');
    });

    it('should can be change style', () => {
      testComponent.labelStyle = 'green-w98';
      fixture.detectChanges();
      expect(tagElement.querySelector('.green-w98')).not.toBeNull();
    });

    it('should can be deleted', () => {
      const removeButton = <HTMLElement>tagElement.querySelector('.remove-button');
      removeButton.click();
      fixture.detectChanges();
      expect(testComponent.deleteTag).toHaveBeenCalledTimes(1);
    });
  });
});
