import {
  Component, ElementRef, EventEmitter,
  HostBinding, Input, OnChanges, OnInit, Output,
  SimpleChanges, OnDestroy
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EditableTip } from '../../../data-table.model';
import { TableTdService } from './td.service';

@Component({
  selector: '[dTableCell]',
  templateUrl: './td.component.html',
  styleUrls: ['./td.component.scss']
})
export class TableTdComponent implements OnInit, OnChanges, OnDestroy {
  @HostBinding('class.devui-sticky-left-cell') stickyLeftClass: boolean;
  @HostBinding('class.devui-sticky-right-cell') stickyRightClass: boolean;
  @HostBinding('style.left') stickyLeftStyle: string;
  @HostBinding('style.right') stickyRightStyle: string;
  @Input() editable: boolean;
  @Input() editableTip = EditableTip.hover;
  @Input() nestedColumn = false;
  @Input() nestedLayer: number;
  @Input() rowItem: any;
  @Input() fixedLeft: string;
  @Input() fixedRight: string;
  @Input() iconFoldTable: string;
  @Input() iconUnFoldTable: string;
  @Input() beforeCellEdit: () => Promise<any>;
  @Output() toggleChildTableEvent = new EventEmitter<boolean>();
  @Input() editing: boolean;
  @Output() editingChange = new EventEmitter<boolean>();
  @Output() editStatusEvent = new EventEmitter<boolean>();

  private documentClickSubscription: Subscription;
  private tdClickSubscription: Subscription;
  constructor(private elementRef: ElementRef, private tdService: TableTdService) { }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fixedLeft']) {
      if (this.fixedLeft) {
        this.stickyLeftClass = true;
        this.stickyLeftStyle = this.fixedLeft;
      } else {
        this.stickyLeftClass = false;
        this.stickyLeftStyle = null;
      }
    }

    if (changes['fixedRight']) {
      if (this.fixedRight) {
        this.stickyRightClass = true;
        this.stickyRightStyle = this.fixedRight;
      } else {
        this.stickyRightClass = false;
        this.stickyRightStyle = null;
      }
    }
  }

  startEditing(event) {
    event.stopPropagation();
    event.preventDefault();
    let beforePromise = Promise.resolve();
    if (this.beforeCellEdit) {
      beforePromise = this.beforeCellEdit();
    }
    beforePromise.then(() => {
      this.editing = true;
      this.editingChange.emit(true);
      this.editStatusEvent.emit(true);
      this.tdService.tableCellClickEvent.emit(event);
      setTimeout(() => {
        this.documentClickSubscription = fromEvent(document, 'click').pipe(
          tap((e: Event) => {
            e.stopPropagation();
            e.preventDefault();
          })
        ).subscribe((clickEvent) => {
          if (!this.elementRef.nativeElement.contains(clickEvent.target)) {
            this.finishCellEdit();
          }
        });

        this.tdClickSubscription = this.tdService.tableCellClickEvent.subscribe((clickEvent) => {
          if (!this.elementRef.nativeElement.contains(clickEvent.target)) {
            this.finishCellEdit();
          }
        });
      });
    });
  }

  finishCellEdit() {
    this.editing = false;
    this.editingChange.emit(false);
    this.editStatusEvent.emit(false);
    if (this.documentClickSubscription) {
      this.documentClickSubscription.unsubscribe();
      this.documentClickSubscription = null;
    }
    if (this.tdClickSubscription) {
      this.tdClickSubscription.unsubscribe();
      this.tdClickSubscription = null;
    }
    return this.editing;
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
  }
}
