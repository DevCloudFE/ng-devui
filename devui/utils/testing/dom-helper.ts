import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class DomHelper<T> {
  private fixture: ComponentFixture<T>;
  constructor(fixture: ComponentFixture<T>) {
    this.fixture = fixture;
  }

  judgeStyleClasses(classList: string[]) {
      const debugEl = this.fixture.debugElement;
      for (let i = 0; i < classList.length; i++) {
          if (!debugEl.query(By.css(classList[i]))) {
            return false;
          }
      }
      return true;
  }

  judgeAppendToBodyStyleClasses(classList: string[]) {
      for (let i = 0; i < classList.length; i++) {
          if (!document.querySelector(classList[i])) {
            return false;
          }
      }
      return true;
  }

  singleTxt(tagName: string): string {
      const debugEl = this.fixture.debugElement.query(By.css(tagName));
      return debugEl ? debugEl.nativeElement.textContent : undefined;
  }

  findAllDebugElByTag(tagName: string) {
    return this.fixture.debugElement.queryAll(By.css(tagName));
  }
}
