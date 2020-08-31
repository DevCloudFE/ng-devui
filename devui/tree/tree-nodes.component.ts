import {
  Component,
  Input,
  TemplateRef
} from '@angular/core';
import {
  TreeFactory,
  TreeNode
} from './tree-factory.class';

@Component({
  selector: 'd-tree-nodes',
  templateUrl: './tree-nodes.component.html',
  styleUrls: ['./tree-nodes.component.scss'],
})
export class TreeNodesComponent {
  @Input() treeList: Array<TreeNode>;
  @Input() treeNodesRef: TemplateRef<any>;
  @Input() treeFactory: TreeFactory;
  @Input() virtualScroll = false;
  trackByFn(index, item) {
    return index;
  }
}
