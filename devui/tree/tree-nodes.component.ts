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
  selector: 'ave-tree-nodes',
  templateUrl: './tree-node.component.html',
})
export class TreeNodesComponent {
  @Input() treeList: Array<TreeNode>;
  @Input() treeNodesRef: TemplateRef<any>;
  @Input() treeFactory: TreeFactory;

  trackByFn(index, item) {
    return index;
  }
}
