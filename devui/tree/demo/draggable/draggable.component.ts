import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'd-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss']
})
export class DraggableComponent implements OnInit {

  transferData: string;
  data = [{
    'title': '父节点1'
  }, {
    'title': '父节点2',
    'open': true,
    'children': [{
      'title': '子节点2-1',
      'open': true,
      'children': [{
        'title': '子节点2-1-1'
      }, {
        'title': '子节点2-1-2'
      }]
    }, {
      'title': '子节点2-2',
      'children': [{
        'title': '子节点2-2-1'
      }, {
        'title': '子节点2-2-2'
      }]
    }]
  }, {
    'title': '父节点3',
    'open': true,
    'children': [{
      'title': '子节点3-1',
    }, {
      'title': '子节点3-2',
    }],
  }, {
    'title': '父节点4',
    'open': true,
    'children': [{
      'title': '子节点4-1'
    }, {
      'title': '子节点4-2'
    }]
  }, {
    'title': '父节点5',
    'open': true,
    'children': [{
      'title': '子节点5-1'
    }, {
      'title': '子节点5-2'
    }]
  }];
  dropItems = [];
  dropType = {
    dropPrev: true,
    dropNext: true,
    dropInner: true
  };
  constructor(private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    document.getElementById('draggableEl').ondragstart = function (event) {
      event.dataTransfer.setData('Text', '外部可拖动元素');
    };
  }

  beforeNodeDrop = (dragNodeId, dropNodeId, dropType) => {
    console.log(dropType);
    return new Promise((resovle) => {
      console.log('dragNodeId: ' + dragNodeId);
      console.log('dropNodeId: ' + dropNodeId);
      resovle();
    });
  }

  onDrop(data) {
    this.transferData = data.event.dataTransfer.getData('Text');
  }

  showNode(node) {
    console.log(node);
  }
  dragOver($event) {
    $event.preventDefault();
    $event.dataTransfer.dropEffect = 'move';
  }
  drop($event) {
    const transferDataStr = JSON.parse($event.dataTransfer.getData('Text'));
    this.dropItems.push(transferDataStr.nodeTitle);
    this.changeDetectorRef.detectChanges();
  }
}
