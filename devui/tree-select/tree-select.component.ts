import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ICheckboxInput, ITreeItem } from 'ng-devui/tree';
import DefaultIcons from './tree-default-icons';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'd-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: [`./tree-select.component.scss`],
  exportAs: 'select',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TreeSelectComponent),
      multi: true
    }
  ]
})

export class TreeSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy, OnChanges {

  @Input() set treeData(treeData) {
    this._sourceTree = treeData;
    this.refreshTree(treeData);
  }

  get treeData() {
    return this._treeData;
  }

  get isOpen() {
    return this._isOpen;
  }

  set isOpen(value) {
    if (this._isOpen !== value) {
      this._isOpen = value;
      this.changeDetectorRef.detectChanges();
    }
  }

  constructor(protected renderer: Renderer2, protected changeDetectorRef: ChangeDetectorRef, ) {
  }

  @Input() placeholder = '';
  @Input() disabled = false;
  @Input() expandTree = false;
  @Input() multiple = false;
  @Input() treeNodeIdKey = 'id';
  @Input() treeNodeChildrenKey = 'children';
  @Input() disabledKey = 'disabled';
  @Input() leafOnly = false;
  @Input() delimiter = ', ';
  @Input() iconParentOpen: string = DefaultIcons.iconParentOpen;
  @Input() iconParentClose: string = DefaultIcons.iconParentClose;
  @Input() iconLeaf: string = DefaultIcons.iconLeaf;
  @Input() closeOnNodeSelected = true;
  @Input() width: string = null;
  @Input() searchable = false;
  @Input() appendTo: string;
  @Input() treeNodeTitleKey = 'title';
  @Input() allowUnselect = true;
  @Input() iconTemplatePosition: string;
  @ViewChild('selectHost') selectHost: ElementRef;
  @ViewChild('optionsContainer') optionsContainer: ElementRef;
  @ViewChild('tree') tree: ElementRef;
  @ViewChild('searchInput') searchInput;
  @ViewChild('searchInputModel') searchInputModel;
  @ViewChild('popper') popper;
  @ContentChild('iconTemplate') iconTemplatePassThrough;

  @Output() valueChanged = new EventEmitter();
  checkboxInput: ICheckboxInput;
  _treeData: Array<ITreeItem> = [];
  value: object | Array<any>;
  currentActiveNode: ITreeItem;
  private _isOpen = false;
  searchString: string = null;
  private _sourceTree = [];

  @Input() onReady = (treeSelect: TreeSelectComponent) => {
  }

  private onChange = (_: any) => null;
  private onTouch = () => null;

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
    this.onReady(this);
    if (this.searchable) {
      this.registerSearchListener();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  writeValue(value: any): void {
    this.value = this.multiple ? Object.assign([], value) : value;
    this.refreshTree(this.treeData);
    // Trigger visualization after tree data is fulfilled.
    this.changeDetectorRef.detectChanges();
    this.visualizeSelectedItems();
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

  private expandAllNodes(treeNode) {
    if (Array.isArray(treeNode)) {
      return treeNode.map(node => this.expandAllNodes(node));
    } else if (treeNode instanceof Object) {
      if (treeNode.hasOwnProperty(this.treeNodeChildrenKey)) {
        treeNode.open = true;
        treeNode[this.treeNodeChildrenKey] = this.expandAllNodes(treeNode[this.treeNodeChildrenKey]);
      }
      return treeNode;
    }
  }

  private prepareTree(treeNode: any, expandTree = false) {
    if (Array.isArray(treeNode)) {
      return treeNode.map(node => this.prepareTree(node, expandTree));
    } else if (treeNode) {
      let parentCheckedByChildren = false;
      if (treeNode.hasOwnProperty(this.treeNodeChildrenKey)) {
        treeNode.open = expandTree ? true : treeNode.open;
        treeNode[this.treeNodeChildrenKey] = this.prepareTree(treeNode[this.treeNodeChildrenKey], expandTree);
        if (this.multiple) {
          [parentCheckedByChildren, treeNode.halfChecked] = this.resolveParentNode(treeNode[this.treeNodeChildrenKey]);
        }
      }
      if (treeNode.hasOwnProperty(this.treeNodeIdKey)) {
        const nodeId = treeNode[this.treeNodeIdKey];
        if (this.multiple) {
          const selectedByValue = this.nodeSelected(nodeId);
          treeNode.isActive = false;
          treeNode.isChecked = selectedByValue || parentCheckedByChildren;
          if (!selectedByValue && parentCheckedByChildren) {
            const insertObject = {};
            insertObject[this.treeNodeIdKey] = treeNode[this.treeNodeIdKey];
            insertObject[this.treeNodeTitleKey] = treeNode[this.treeNodeTitleKey];
            (this.value as any[]).push(insertObject);
          }
        } else {
          treeNode.isChecked = false;
          treeNode.isActive = this.nodeSelected(nodeId);
          if (treeNode.isActive) {
            this.currentActiveNode = treeNode;
          }
        }
      }

      return treeNode;
    }
  }

  private nodeSelected(treeNodeId: any) {
    if (!this.value) {
      return false;
    }

    if (this.multiple && Array.isArray(this.value)) {
      // polyfill Array.prototype.includes()
      return this.value.map(_ => _[this.treeNodeIdKey]).indexOf(treeNodeId) > -1;
    } else {
      return this.value[this.treeNodeIdKey] && treeNodeId === this.value[this.treeNodeIdKey];
    }
  }

  private resolveParentNode(treeNodes: ITreeItem[]): boolean[] {
    const childrenFullCheckedCount = treeNodes.filter(_ => _.isChecked).length;
    const childrenCheckedCount = treeNodes.filter(_ => _.isChecked || _.halfChecked).length;
    return [
      treeNodes.length === childrenFullCheckedCount,
      childrenCheckedCount > 0 && treeNodes.length > childrenFullCheckedCount
    ];
  }

  private refreshTree(treeData: Array<any>) {
    this._treeData = Object.assign([], this.prepareTree(treeData, this.expandTree));
  }

  onOperableNodeChecked(selectedNodes: ITreeItem[]) {
    const selectedValueExtractor = (_selectedNodes) => {
      return this.leafOnly ?
        _selectedNodes.filter(_ => !_.data.isParent).map(_ => _.data.originItem) :
        _selectedNodes.map(_ => _.data.originItem);
    };
    if (this.multiple) {
      this.value = selectedValueExtractor(selectedNodes);
      this.emitEvents();
    }
  }

  onOperableNodeSelected(selectedNode: ITreeItem) {
    if (!this.multiple) {
      if (this.leafOnly && selectedNode.data.isParent) {
        return;
      }
      if (selectedNode.data.isActive) {
        this.currentActiveNode = selectedNode.data.originItem;
        this.value = selectedNode.data.originItem;
        // Configurable close on node selected
        if (this.closeOnNodeSelected) {
          this.isOpen = false;
        }
      } else {
        if (this.allowUnselect) {
          this.currentActiveNode = null;
          this.value = null;
        } else {
          selectedNode.data.isActive = true;
          if (this.closeOnNodeSelected) {
            this.isOpen = false;
          }
        }
      }

      this.emitEvents();
    }
  }

  emitEvents() {
    this.visualizeSelectedItems();
    this.onChange(this.value);
    this.valueChanged.emit(this.selectedValue());
    this.onTouch();
  }

  visualizeSelectedItems() {
    if (this.multiple) {
      this.visualizeMultipleValue();
    } else {
      this.visualizeSingleValue();
    }
  }

  visualizeMultipleValue() {
    if (this.tree && this.tree['operableTree'] && this.tree['operableTree']['treeFactory']) {
      const selectedNodes = this.selectedValue() as any[];
      const valueText = selectedNodes.map(_ => _[this.treeNodeTitleKey]).join(this.delimiter);
      this.renderer.setAttribute(this.selectHost.nativeElement, 'value', valueText);
    } else {
      this.emptyInput();
    }
  }

  visualizeSingleValue() {
    if (this.value && this.value[this.treeNodeTitleKey]) {
      const valueText = this.value[this.treeNodeTitleKey];
      this.renderer.setAttribute(this.selectHost.nativeElement, 'value', valueText);
    } else {
      this.emptyInput();
    }
  }

  emptyInput() {
    this.renderer.setAttribute(this.selectHost.nativeElement, 'value', '');
  }

  selectedValue() {
    return this.value;
  }

  responsePopperChange(popperState: any) {
    if (popperState && this.searchable) {
      this.focusSearchInput();
    }
  }

  private focusSearchInput() {
    if (this.searchInput.nativeElement) {
      this.searchInput.nativeElement.focus();
    }
  }

  search(searchString) {
    if (!this.searchable || searchString === null || searchString === undefined) {
      return;
    }
    this.tree['operableTree']['treeFactory'].searchTree(searchString, true);
    this.popper.update();
  }

  private registerSearchListener() {
    this.searchInputModel.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchString => {
      this.search(searchString);
    });
  }

  private scrollToSelected() {
    if (this.multiple) {
      return;
    }
    const selectedNode = this.optionsContainer.nativeElement.querySelector('.tree-node.operable-tree-node.selected');
    const scrollableContainer = this.optionsContainer.nativeElement.parentNode;
    if (!selectedNode || !scrollableContainer) {
      return;
    }
    const scrollOffset = selectedNode.offsetTop;
    scrollableContainer.scrollTo({top: (scrollOffset - scrollableContainer.scrollTop)});
  }
}
