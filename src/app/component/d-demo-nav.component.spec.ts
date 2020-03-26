import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DDemoNavComponent } from './d-demo-nav.component';

describe('DDemoNavComponent', () => {
  let component: DDemoNavComponent;
  let fixture: ComponentFixture<DDemoNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DDemoNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DDemoNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
