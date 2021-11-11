import { AfterViewInit, Directive, ElementRef, HostBinding, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DashboardComponent } from '../dashboard.component';
import { GridStackService } from '../grid-stack.service';

@Directive({
  selector: '[dDashboardLibraryTrash]',
})
export class DashboardLibraryTrashDirective implements OnChanges, OnDestroy, AfterViewInit {
  @Input() targetDashboard: DashboardComponent;
  @Input() trashData;
  @Input() dropDisabled = false;

  @HostBinding('class.grid-stack-library-trash')
  hostBinding = true;

  isSetup = false;

  get gridStackService() {
    return this.targetDashboard?.gridStackService;
  }

  constructor (private el: ElementRef) {}
  ngAfterViewInit() {
    this.setup();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.targetDashBoard) {
      this.setup();
    }
    if (changes.dropDisabled) {
      if (this.dropDisabled) {
        GridStackService.disableDrop(this.el.nativeElement);
      } else {
        GridStackService.enableDrop(this.el.nativeElement);
      }
    }
  }

  ngOnDestroy() {
    if (this.gridStackService && this.isSetup) {
      this.gridStackService.destroyRemoveDropAreas(this.el.nativeElement);
    }
  }

  setup() {
    if (this.targetDashboard && !this.isSetup) {
      setTimeout(() => {
        if (this.gridStackService) {
          this.gridStackService.setupRemoveDropArea(this.el.nativeElement, this.targetDashboard, this);
          if (this.dropDisabled) {
            GridStackService.disableDrop(this.el.nativeElement);
          }
        }
      });
      this.isSetup = true;
    }
  }
}
