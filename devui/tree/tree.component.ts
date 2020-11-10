import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import {
  ITreeItem,
  TreeFactory,
  TreeNode
} from './tree-factory.class';
import { I18nService, I18nInterface } from 'ng-devui/i18n';
import { Subscription, Subject } from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { takeUntil, throttleTime } from 'rxjs/operators';
@Component({
  selector: 'd-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  preserveWhitespaces: false,
})
export class TreeComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  treeFactory: TreeFactory;
  @Input() tree: Array<ITreeItem>;
  @Input() treeNodesRef: TemplateRef<any>;
  @Input() treeNodeIdKey: string;
  @Input() treeNodeChildrenKey: string;
  @Input() iconParentOpen: string;
  @Input() iconParentClose: string;
  @Input() iconLeaf: string;
  @Input() loadingTemplateRef: TemplateRef<any>;
  @Input() treeNodeTitleKey = 'title';
  @Input() checkboxDisabledKey = 'disabled';
  @Input() selectDisabledKey = 'disabled';
  @Input() toggleDisabledKey = 'disableToggle';
  @Input() virtualScroll = false;
  @Input() virtualScrollHeight = '800px';
  @Input() minBufferPx = 760;
  @Input() maxBufferPx = 1140;
  @Input() itemSize = 38;
  @Output() nodeSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeDblClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeRightClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() nodeToggled: EventEmitter<any> = new EventEmitter<any>();
  @ViewChildren('treeNodeContent') treeNodeContent: QueryList<ElementRef>; // 获取content以取得tree宽度
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  treeNodes = [];
  private mouseRightButton = 2;
  destroy$ = new Subject();
  constructor(private i18n: I18nService) {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  ngOnInit() {
    this.initTree();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.tree && !changes.tree.isFirstChange()) {
      this.initTree();
    }
  }

  initTree() {
    this.treeFactory = TreeFactory.fromTree({
      treeItems: this.tree,
      isVirtualScroll: this.virtualScroll,
      treeNodeChildrenKey: this.treeNodeChildrenKey,
      treeNodeIdKey: this.treeNodeIdKey,
      treeNodeTitleKey: this.treeNodeTitleKey,
      checkboxDisabledKey: this.checkboxDisabledKey,
      selectDisabledKey: this.selectDisabledKey,
      toggleDisabledKey: this.toggleDisabledKey
    });
    if (this.virtualScroll) {
      this.treeFactory.flattenNodes.pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.treeNodes = data;
      });
      this.treeFactory.getFlattenNodes();
    }
  }

  ngAfterViewInit() {
  }


  contextmenuEvent(event, node) {
    if (event.button === this.mouseRightButton) {
      this.nodeRightClicked.emit({ node: node, event: event });
    }
  }


  selectNode(event, treeNode: TreeNode) {
    if (!event.target.classList.contains('devui-tree-node__content--value-wrapper')
      && !event.target.classList.contains('devui-tree-node__content')
      && !event.target.classList.contains('devui-tree-node__title')) {
      return;
    }
    this.nodeSelected.emit(treeNode);
    this.treeFactory.activeNodeById(treeNode.id);
  }

  toggleNode(event, treeNode: TreeNode) {
    if (treeNode.data.disableToggle) {
      return;
    }
    this.treeFactory.toggleNodeById(treeNode.id);
    this.nodeToggled.emit(treeNode);
  }

  scrollToIndex(index: number) {
    this.viewPort.scrollToIndex(index, 'smooth');
  }

  public appendTreeItems(treeItems: Array<ITreeItem>, parentId) {
    if (!this.treeFactory.nodes[parentId]) {
      throw new Error('parent node does not exist.');
    }
    this.treeFactory.mapTreeItems({
      treeItems: treeItems,
      parentId: parentId,
      treeNodeChildrenKey: this.treeNodeChildrenKey,
      treeNodeIdKey: this.treeNodeIdKey,
      treeNodeTitleKey: this.treeNodeTitleKey,
      checkboxDisabledKey: this.checkboxDisabledKey,
      selectDisabledKey: this.selectDisabledKey,
      toggleDisabledKey: this.toggleDisabledKey
    });
  }
  public nodeDblClick(event, node) {
    this.nodeDblClicked.emit(node);
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();

    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
