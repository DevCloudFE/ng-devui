import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  SimpleChanges,
  OnChanges
} from '@angular/core';
import {
  ITreeItem,
  TreeFactory,
  TreeNode
} from './tree-factory.class';

@Component({
  selector: 'd-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit, OnChanges {
  treeFactory: TreeFactory;
  @Input() tree: Array<ITreeItem>;
  @Input() treeNodesRef: TemplateRef<any>;
  @Input() treeNodeIdKey: string;
  @Input() treeNodeChildrenKey: string;
  @Input() iconParentOpen: string;
  @Input() iconParentClose: string;
  @Input() iconLeaf: string;
  @Input() treeNodeTitleKey = 'title';
  @Output() nodeSelected: EventEmitter<any> = new EventEmitter();
  @Output() nodeToggled: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.treeFactory = TreeFactory.fromTree({
      treeItems: this.tree,
      treeNodeChildrenKey: this.treeNodeChildrenKey,
      treeNodeIdKey: this.treeNodeIdKey,
      treeNodeTitleKey: this.treeNodeTitleKey
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.tree) {
      this.treeFactory = TreeFactory.fromTree({
        treeItems: this.tree,
        treeNodeChildrenKey: this.treeNodeChildrenKey,
        treeNodeIdKey: this.treeNodeIdKey,
        treeNodeTitleKey: this.treeNodeTitleKey
      });
    }
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
      treeNodeTitleKey: this.treeNodeTitleKey
    });
  }
}
