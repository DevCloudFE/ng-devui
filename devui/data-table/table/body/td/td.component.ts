import { Component,
  ElementRef,
  EventEmitter, HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges, } from '@angular/core';
import { Observable, Subscription, fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EditableTip } from '../../../data-table.model';
import { TableTdService } from './td.service';

@Component({
  /* eslint-disable-next-line @angular-eslint/component-selector*/
  selector: '[dTableCell]',
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.scss'],
})
export class TableTdComponent implements OnChanges, OnDestroy {
  @HostBinding('class.devui-sticky-left-cell') stickyLeftClass: boolean;
  @HostBinding('class.devui-sticky-right-cell') stickyRightClass: boolean;
  @HostBinding('style.left') stickyLeftStyle: string;
  @HostBinding('style.right') stickyRightStyle: string;
  @Input() editable: boolean;
  @Input() editableTip = EditableTip.hover;
  @Input() nestedColumn = false;
  @Input() nestedLayer: number;
  @Input() field: string;
  @Input() rowItem: any;
  @Input() fixedLeft: string;
  @Input() fixedRight: string;
  @Input() iconFoldTable: string;
  @Input() iconUnFoldTable: string;
  @Input() nestedColumnIndent = 16;
  @Input() beforeEditStart: (rowItem, field) => boolean | Promise<boolean> | Observable<boolean>;
  @Input() beforeEditEnd: (rowItem, field) => boolean | Promise<boolean> | Observable<boolean>;
  @Output() toggleChildTableEvent = new EventEmitter<boolean>();
  @Input() editing: boolean;
  @Output() editStatusEvent = new EventEmitter<boolean>();
  /**
   * 编辑状态调整 @deprecated
   */
  @Output() editingChange = new EventEmitter<boolean>();

  @HostBinding('class.editable-cell') get isEditable() {
    return this.editable && !this.editing && this.editableTip !== 'btn';
  }

  private documentClickSubscription: Subscription;
  private tdMousedownSubscription: Subscription;
  private tdMouseupSubscription: Subscription;
  private clickInTd: boolean;
  private tdClickSubscription: Subscription;
  private currentEditing = false;

  constructor(private elementRef: ElementRef, private tdService: TableTdService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { fixedLeft, fixedRight, editing } = changes;
    if (fixedLeft) {
      if (this.fixedLeft) {
        this.stickyLeftClass = true;
        this.stickyLeftStyle = this.fixedLeft;
      } else {
        this.stickyLeftClass = false;
        this.stickyLeftStyle = null;
      }
    }

    if (fixedRight) {
      if (this.fixedRight) {
        this.stickyRightClass = true;
        this.stickyRightStyle = this.fixedRight;
      } else {
        this.stickyRightClass = false;
        this.stickyRightStyle = null;
      }
    }

    if (editing?.currentValue && !this.currentEditing) {
      this.bindEditClickEvent();
    }
  }

  startEditing(event) {
    event.stopPropagation();
    event.preventDefault();
    let beforePromise = Promise.resolve(true);
    if (this.beforeEditStart) {
      const result: any = this.beforeEditStart(this.rowItem, this.field);
      if (typeof result !== 'undefined') {
        if (result.then) {
          beforePromise = result;
        } else if (result.subscribe) {
          beforePromise = (result as Observable<boolean>).toPromise();
        } else {
          beforePromise = Promise.resolve(result);
        }
      }
    }

    beforePromise.then((canStart) => {
      if (canStart) {
        this.editing = true;
        this.currentEditing = true;
        this.editingChange.emit(true);
        this.editStatusEvent.emit(true);
        this.tdService.tableCellClickEvent.emit(event);
        this.bindEditClickEvent();
      }
    });
  }

  bindEditClickEvent() {
    this.documentClickSubscription = fromEvent(document, 'click')
      .pipe(
      tap((e: Event) => {
        e.stopPropagation();
      })
      )
      .subscribe((clickEvent) => {
      if (!this.elementRef.nativeElement.contains(clickEvent.target) && !this.clickInTd) {
        this.finishCellEdit();
      }
      this.clickInTd = false;
    });
    this.tdMousedownSubscription = fromEvent(this.elementRef.nativeElement, 'mousedown').subscribe((event) => {
      this.clickInTd = true;
    });

    this.tdMouseupSubscription = fromEvent(this.elementRef.nativeElement, 'mouseup').subscribe((event) => {
      this.clickInTd = false;
    });

    this.tdClickSubscription = this.tdService.tableCellClickEvent.subscribe((clickEvent) => {
      if (!this.elementRef.nativeElement.contains(clickEvent.target)) {
        this.finishCellEdit();
      }
    });
  }

  removeEditClickEvent() {
    if (this.documentClickSubscription) {
      this.documentClickSubscription.unsubscribe();
      this.documentClickSubscription = null;
    }
    if (this.tdClickSubscription) {
      this.tdClickSubscription.unsubscribe();
      this.tdClickSubscription = null;
    }
  }

  finishCellEdit() {
    let beforePromise = Promise.resolve(true);
    if (this.beforeEditEnd) {
      const result: any = this.beforeEditEnd(this.rowItem, this.field);
      if (typeof result !== 'undefined') {
        if (result.then) {
          beforePromise = result;
        } else if (result.subscribe) {
          beforePromise = (result as Observable<boolean>).toPromise();
        } else {
          beforePromise = Promise.resolve(result);
        }
      }
    }
    beforePromise.then((canEnd) => {
      if (canEnd) {
        this.editing = false;
        this.currentEditing = false;
        this.editingChange.emit(false);
        this.editStatusEvent.emit(false);
        this.removeEditClickEvent();
      }
    });
  }

  toggleChildTable(rowItem) {
    rowItem.$isChildTableOpen = !rowItem.$isChildTableOpen;
    this.toggleChildTableEvent.emit(rowItem.$isChildTableOpen);
  }

  ngOnDestroy(): void {
    if (this.documentClickSubscription) {
      this.documentClickSubscription.unsubscribe();
      this.documentClickSubscription = null;
    }
    if (this.tdClickSubscription) {
      this.tdClickSubscription.unsubscribe();
      this.tdClickSubscription = null;
    }

    if (this.tdMousedownSubscription) {
      this.tdMousedownSubscription.unsubscribe();
      this.tdMousedownSubscription = null;
    }

    if (this.tdMouseupSubscription) {
      this.tdMouseupSubscription.unsubscribe();
      this.tdMouseupSubscription = null;
    }
  }
}
