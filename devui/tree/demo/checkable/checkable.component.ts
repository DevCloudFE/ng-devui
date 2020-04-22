import { Component, OnInit, ViewChild } from '@angular/core';
import { OperableTreeComponent, TreeNode, ITreeItem, ICheckboxInput } from 'ng-devui/tree';


@Component({
  selector: 'd-checkable',
  templateUrl: './checkable.component.html',
})
export class CheckableComponent implements OnInit {

  @ViewChild('operableTree1', { static: true }) operableTreeComponent: OperableTreeComponent;
  currentSelectedNode;
  checkNote;

  checkboxInput: ICheckboxInput;
  data3 = [{
    'title': '父节点1'
  }, {
    'title': '父节点2',
    'open': true,
    'children': [{
      'title': '子节点2-1',
      'children': [{
        'title': '子节点2-1-1'
      }, {
        'title': '子节点2-1-2'
      }]
    }, {
      'title': '子节点2-2',
      'open': true,
      'children': [{
        'title': '子节点2-2-1',
        'disabled': true,
        'isChecked': true
      }, {
        'title': '子节点2-2-2'
      }]
    }]
  }, {
    'title': '父节点3',
    'children': [{
      'title': '子节点3-1',
    }, {
      'title': '子节点3-2',
    }],
  }, {
    'title': '父节点4',
    'children': [{
      'title': '子节点4-1'
    }, {
      'title': '子节点4-2'
    }]
  }, {
    'title': '父节点5',
    'children': [{
      'title': '子节点5-1'
    }, {
      'title': '子节点5-2'
    }]
  }];


  ngOnInit() {
    setTimeout(() => this.getCheckedNote(this.operableTreeComponent), 0);
  }

  onOperableNodeDeleted(treeNode: TreeNode) {
    console.log('deleted: ', treeNode);
  }

  onOperableNodeSelected(treeNode: TreeNode) {
    console.log('selected: ', treeNode);
    this.currentSelectedNode = treeNode;
  }

  onOperableNodeToggled(treeNode: TreeNode) {
    console.log('toggled: ', treeNode);
  }

  onOperableNodeChecked(checkedNodes: Array<ITreeItem>) {
    this.getCheckedNote(this.operableTreeComponent);
    console.log('checked: ', checkedNodes);
  }

  getCheckedNote(tree: OperableTreeComponent) {
    if (!tree || !tree.treeFactory) {
      this.checkNote = [];
      return;
    }
    this.checkNote = tree.treeFactory.getCheckedNodes()
      .map((item: any) => ({ id: item.id, data: { title: item.data.title, isChecked: item.data.isChecked } }));
  }

}
