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
  OnDestroy
} from '@angular/core';
import {
  ITreeItem,
  TreeFactory,
  TreeNode
} from './tree-factory.class';
import { TreeMaskService } from './tree-mask.service';
import { I18nService, I18nInterface } from 'ng-devui/i18n';
import { Subscription } from 'rxjs';
@Component({
  selector: 'd-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
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
  @Input() treeNodeTitleKey = 'title';
  @Input() checkboxDisabledKey = 'disabled';
  @Output() nodeSelected: EventEmitter<any> = new EventEmitter();
  @Output() nodeDblClicked: EventEmitter<any> = new EventEmitter();
  @Output() nodeToggled: EventEmitter<any> = new EventEmitter();
  @ViewChildren('treeNodeContent') treeNodeContent: QueryList<ElementRef>; // 获取content以取得tree宽度
  elementAsMask: any;
  i18nCommonText: I18nInterface['common'];
  i18nSubscription: Subscription;
  constructor(private i18n: I18nService) {
    this.i18nCommonText = this.i18n.getI18nText().common;
    this.i18nSubscription = this.i18n.langChange().subscribe((data) => {
      this.i18nCommonText = data.common;
    });
  }

  ngOnInit() {
    this.treeFactory = TreeFactory.fromTree({
      treeItems: this.tree,
      treeNodeChildrenKey: this.treeNodeChildrenKey,
      treeNodeIdKey: this.treeNodeIdKey,
      treeNodeTitleKey: this.treeNodeTitleKey,
      checkboxDisabledKey: this.checkboxDisabledKey
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.tree) {
      this.treeFactory = TreeFactory.fromTree({
        treeItems: this.tree,
        treeNodeChildrenKey: this.treeNodeChildrenKey,
        treeNodeIdKey: this.treeNodeIdKey,
        treeNodeTitleKey: this.treeNodeTitleKey,
        checkboxDisabledKey: this.checkboxDisabledKey
      });
    }
  }

  ngAfterViewInit() {
    this.elementAsMask = TreeMaskService.creatMaskElement();
  }

  addBackGround(e) {
    e.stopPropagation();
    TreeMaskService.addMask(e.target, this.elementAsMask, TreeMaskService.calcWidth(this.treeNodeContent, 0));
  }

  removeBackGround(e) {
    e.stopPropagation();
    TreeMaskService.removeMask(e.target, this.elementAsMask);
  }

  selectNode(event, treeNode: TreeNode) {
    this.nodeSelected.emit(treeNode);
    this.treeFactory.activeNodeById(treeNode.id);
  }

  toggleNode(event, treeNode: TreeNode) {
    this.treeFactory.toggleNodeById(treeNode.id);
    this.nodeToggled.emit(treeNode);
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
      checkboxDisabledKey: this.checkboxDisabledKey
    });
  }
  public nodeDblClick(event, node) {
    this.nodeDblClicked.emit(node);
  }
  ngOnDestroy() {
    if (this.i18nSubscription) {
      this.i18nSubscription.unsubscribe();

    }
  }
}
