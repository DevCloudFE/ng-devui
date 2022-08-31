import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { I18nInterface, I18nService } from 'ng-devui/i18n';
import { DevConfigService, expandCollapseForDomDestroy, WithConfig } from 'ng-devui/utils';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  Dictionary,
  ITreeItem,
  TreeFactory,
  TreeNode
} from './tree-factory.class';
@Component({
  selector: 'd-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  preserveWhitespaces: false,
  animations: [expandCollapseForDomDestroy]
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
  @Input() @WithConfig() showAnimation = true;
  @Input() minBufferPx = 600;
  @Input() maxBufferPx = 900;
  @Input() itemSize = 30;
  @Output() nodeSelected = new EventEmitter<TreeNode>();
  @Output() nodeDblClicked = new EventEmitter<TreeNode>();
  @Output() nodeRightClicked = new EventEmitter<{ node: TreeNode; event: MouseEvent }>();
  @Output() nodeToggled = new EventEmitter<TreeNode>();
  @Output() afterTreeInit = new EventEmitter<Dictionary<TreeNode>>();
  @ViewChildren('treeNodeContent') treeNodeContent: QueryList<ElementRef>; // 获取content以取得tree宽度
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  treeNodes = [];
  destroy$ = new Subject<void>();
  afterInitAnimate = true;
  constructor(private i18n: I18nService, private devConfigService: DevConfigService) {

  }

  ngOnInit() {
    this.initTree();
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
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
    this.afterTreeInit.emit(this.treeFactory.nodes);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.afterInitAnimate = false;
    });
  }

  contextmenuEvent(event, node) {
    this.nodeRightClicked.emit({ node: node, event: event });
  }

  selectNode(event, treeNode: TreeNode) {
    if (treeNode.data.disableSelect) {
      return;
    }
    if (!this.isSelectableRegion(event.target)) {
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

  public isSelectableRegion(ele) {
    if (ele && !ele.classList.contains('devui-tree-node__content--value-wrapper')
      && !ele.classList.contains('devui-tree-node__content')
      && !ele.classList.contains('devui-tree-node__title')
      && ele.tagName !== 'D-HIGHLIGHT'
      && ele.parentNode?.tagName !== 'D-HIGHLIGHT') {
      return false;
    }
    return true;
  }

  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();

    }
    this.destroy$.next();
    this.destroy$.complete();
  }
}
