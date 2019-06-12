import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, TemplateRef, ViewEncapsulation } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';
import { ITreeItem, TreeFactory, TreeNode } from './tree-factory.class';

@Component({
  selector: 'ave-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
  @Output() nodeSelected: EventEmitter<any> = new EventEmitter();
  @Output() nodeToggled: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.treeFactory = TreeFactory.fromTree({
      treeItems: this.tree,
      treeNodeChildrenKey: this.treeNodeChildrenKey,
      treeNodeIdKey: this.treeNodeIdKey
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.tree) {
      this.treeFactory = TreeFactory.fromTree({
        treeItems: this.tree,
        treeNodeChildrenKey: this.treeNodeChildrenKey,
        treeNodeIdKey: this.treeNodeIdKey
      });
    }
  }

  selectNodes(event, treeNode: TreeNode) {
    this.nodeSelected.emit(treeNode);
    this.treeFactory.activeNodeById(treeNode.id);
  }

  toggleNodes(event, treeNode: TreeNode) {
    this.treeFactory.toggleNodeById(treeNode.id);
    this.nodeToggled.emit(treeNode);
  }
}
