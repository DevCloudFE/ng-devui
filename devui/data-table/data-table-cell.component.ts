import {
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChange,
  ViewChild
} from '@angular/core';
import { InputNumberComponent } from 'ng-devui/input-number';
import { SelectComponent } from 'ng-devui/select';
import { TreeSelectComponent } from 'ng-devui/tree-select';
import { stopPropagationIfExist } from 'ng-devui/utils';
import { fromEvent, Subscription } from 'rxjs';
import { DATA_TABLE_ROW } from './data-table-row.token';
import { DATA_TABLE } from './data-table.token';
import { EditorDirective } from './editor-host.directive';
import { DataTableColumnTmplComponent } from './tmpl/data-table-column-tmpl.component';

@Component({
  selector: 'd-data-table-cell,[dDataTableCell]',
  templateUrl: './data-table-cell.component.html',
  preserveWhitespaces: false,
})
export class DataTableCellComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(EditorDirective) editorHost: EditorDirective;
  @Input() rowIndex: number;
  @Input() colIndex: number;
  @Input() column: DataTableColumnTmplComponent;
  @Input() rowItem: any;
  @Input() editModel: string;
  @Input() isEditRow: boolean;
  @Input() timeout: number;
  @Input() tableLevel: number;

  @HostBinding('class.editable-cell') get isEditable() {
    return this.column.editable && !this.isCellEdit && this.column.extraOptions?.editableTip !== 'btn';
  }
  isCellEdit: boolean;
  forceUpdateSubscription: Subscription;
  documentClickSubscription: Subscription;
  tdMousedownSubscription: Subscription;
  tdMouseupSubscription: Subscription;
  clickInTd: boolean;
  cellEditorClickSubscription: Subscription;
  cellActionSubscription: Subscription;
  clickCount = 0; // 记录点击次数
  timeoutId; // 延时id
  fieldEditDenied: boolean;
  templateEditorActive: boolean; // 通过模板生成的编辑控件激活
  dynamicEditorActive: boolean; // 动态生成的编辑控件激活

  constructor(@Inject(DATA_TABLE) public dt: any, private changeDetectorRef: ChangeDetectorRef,
              private componentFactoryResolver: ComponentFactoryResolver,
              @Inject(DATA_TABLE_ROW) public rowComponent: any, private cellRef: ElementRef, private ngZone: NgZone) {

  }

  ngOnInit(): void {
    this.forceUpdateSubscription = this.rowComponent.forceUpdateEvent.subscribe(_ => this.forceUpdate());
    if (this.column.editable) {
      this.tdMousedownSubscription = fromEvent(this.cellRef.nativeElement, 'mousedown').subscribe(event => {
        this.clickInTd = true;
      });

      this.tdMouseupSubscription = fromEvent(this.cellRef.nativeElement, 'mouseup').subscribe(event => {
        this.clickInTd = false;
      });
    }
    this.ngZone.runOutsideAngular(() => {
      this.cellRef.nativeElement.addEventListener(
        'mouseup',
        this.onCellClick.bind(this)
      );
      this.cellRef.nativeElement.addEventListener(
        'dblclick',
        this.onCellDBClick.bind(this)
      );
    });
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    const rowItem = changes['rowItem'];
    if (rowItem) {
      this.updateEditable(rowItem);
    }
  }

  updateEditable(rowItem) {
    const currentConfig = rowItem.currentValue['$editDeniedConfig'];
    if (!currentConfig) {
      if (this.fieldEditDenied) {
        this.fieldEditDenied = false;
      }
    } else {
      const index = currentConfig.findIndex((config: string) => {
        return config === this.column.field;
      });
      if (index === -1) {
        if (this.fieldEditDenied) {
          this.fieldEditDenied = false;
        }
      } else {
        if (!this.fieldEditDenied) {
          this.fieldEditDenied = true;
        }
      }
    }
  }

  onCellClick($event) {
    const cellSelectedEventArg = {
      rowIndex: this.rowIndex,
      colIndex: this.colIndex,
      column: this.column,
      rowItem: this.rowItem,
      cellComponent: this,
      rowComponent: this.rowComponent,
      event: $event
    };

    this.clickCount++;
    if (this.clickCount === 1) {
      this.timeoutId = setTimeout(() => {
        if (this.clickCount === 1) {
          this.dt.onCellClick(cellSelectedEventArg);
        }
        this.clickCount = 0;
        clearTimeout(this.timeoutId);
      }, this.timeout);
    }
  }

  onCellDBClick($event) {
    const cellSelectedEventArg = {
      rowIndex: this.rowIndex,
      colIndex: this.colIndex,
      column: this.column,
      rowItem: this.rowItem,
      cellComponent: this,
      rowComponent: this.rowComponent
    };
    this.dt.onCellDBClick(cellSelectedEventArg);
  }

  forceUpdate() {
    this.changeDetectorRef.markForCheck();
  }

  finishCellEdit($event?: Event) {
    if (this.editModel !== 'cell') {
      return;
    }

    this.isCellEdit = false;
    this.editorHost.viewContainerRef.clear();
    this.dynamicEditorActive = false;
    this.templateEditorActive = false;

    if (this.documentClickSubscription) {
      this.unSubscription(this.documentClickSubscription);
    }

    if (this.cellEditorClickSubscription) {
      this.unSubscription(this.cellEditorClickSubscription);
    }
    stopPropagationIfExist($event);

    this.dt.onCellEditEnd({
      rowIndex: this.rowIndex,
      colIndex: this.colIndex,
      column: this.column,
      rowItem: this.rowItem,
      cellComponent: this,
      rowComponent: this.rowComponent
    });
  }

  isCellEditEnable(column, rowItem) {
    if (this.editModel === 'cell') {
      return this.isCellEdit;
    }

    return this.isEditRow;
  }

  ngOnDestroy(): void {
    if (this.forceUpdateSubscription) {
      this.unSubscription(this.forceUpdateSubscription);
    }

    if (this.documentClickSubscription) {
      this.unSubscription(this.documentClickSubscription);
    }

    if (this.cellEditorClickSubscription) {
      this.unSubscription(this.cellEditorClickSubscription);
    }

    if (this.cellActionSubscription) {
      this.unSubscription(this.cellActionSubscription);
    }
    if (this.tdMousedownSubscription) {
      this.unSubscription(this.tdMousedownSubscription);
    }
    if (this.tdMouseupSubscription) {
      this.unSubscription(this.tdMouseupSubscription);
    }
  }

  private unSubscription(sbscription: Subscription) {
    if (sbscription) {
      sbscription.unsubscribe();
      /* eslint-disable-next-line no-param-reassign */
      sbscription = null;
    }
  }

  creatCellEditor() {
    let componentFactory;
    let editorComponent;
    switch (this.column.fieldType) {
    case 'number':
      editorComponent = InputNumberComponent;
      break;
    case 'select':
      editorComponent = SelectComponent;
      break;
    case 'treeSelect':
      editorComponent = TreeSelectComponent;
      break;
    default:
      this.templateEditorActive = true;
      break;
    }

    if (editorComponent) {
      componentFactory = this.componentFactoryResolver.resolveComponentFactory(editorComponent);
      const viewContainerRef = this.editorHost.viewContainerRef;
      viewContainerRef.clear();
      const componentRef = viewContainerRef.createComponent<{ writeValue: Function; registerOnChange: Function }>(componentFactory);
      const componentInstance = componentRef.instance;
      if (this.column.extraOptions) {
        componentFactory.inputs.forEach((input) => {
          if (this.column.extraOptions[input.templateName]) {
            componentInstance[input.propName] = this.column.extraOptions[input.templateName];
          }
        });
      }
      componentInstance.writeValue(this.rowItem[this.column.field]);
      componentInstance.registerOnChange((value) => {
        this.rowItem[this.column.field] = value;
        if (this.column.extraOptions && this.column.extraOptions.finishEditingAfterValueChange) {
          this.finishCellEdit();
        }
      });
      this.dynamicEditorActive = true;
    }
  }

  cellEditing($event) {
    $event.stopPropagation();
    $event.preventDefault();
    let beforeEdit = Promise.resolve(undefined);
    if (this.dt.beforeCellEdit) {
      beforeEdit = this.dt.beforeCellEdit(this.rowItem, this.column);
    }
    beforeEdit.then((extraOptions?: any) => {
      if (extraOptions) {
        this.column.extraOptions = extraOptions;
      }
      this.dt.cellEditorClickEvent.emit($event);
      const cellSelectedEventArg = {
        rowIndex: this.rowIndex,
        colIndex: this.colIndex,
        column: this.column,
        rowItem: this.rowItem,
        cellComponent: this,
        rowComponent: this.rowComponent
      };
      if (this.column.editable && this.editModel === 'cell') {
        this.isCellEdit = true;
        this.creatCellEditor();
        this.documentClickSubscription = this.dt.documentClickEvent.subscribe(
          event => {
            if (event === 'cancel' || (!this.cellRef.nativeElement.contains(event.target) && !this.clickInTd)) {
              this.ngZone.run(() => {
                this.finishCellEdit();
              });
            }
            this.clickInTd = false;
          }
        );
        this.cellEditorClickSubscription = this.dt.cellEditorClickEvent.subscribe(
          event => {
            if (!this.cellRef.nativeElement.contains(event.target)) {
              this.finishCellEdit();
            }
          }
        );
        this.dt.onCellEditStart(cellSelectedEventArg);
      }
    });
  }

  toggleChildTable(rowItem) {
    rowItem.$isChildTableOpen = !rowItem.$isChildTableOpen;
    this.dt.setRowChildToggleStatus(rowItem, rowItem.$isChildTableOpen);
  }
}
