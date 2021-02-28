import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-draggable',
  templateUrl: './draggable.component.html',
  styleUrls: ['./draggable.component.scss']
})
export class DraggableComponent implements OnInit {

  transferData: string;
  data = [{
    'title': 'parent node 1'
  }, {
    'title': 'parent node 2',
    'open': true,
    'children': [{
      'title': 'leaf node 2-1',
      'open': true,
      'children': [{
        'title': 'leaf node 2-1-1'
      }, {
        'title': 'leaf node 2-1-2'
      }]
    }, {
      'title': 'leaf node 2-2',
      'children': [{
        'title': 'leaf node 2-2-1'
      }, {
        'title': 'leaf node 2-2-2'
      }]
    }]
  }, {
    'title': 'parent node 3',
    'open': true,
    'children': [{
      'title': 'leaf node 3-1',
    }, {
      'title': 'leaf node 3-2',
    }],
  }, {
    'title': 'parent node 4',
    'open': true,
    'children': [{
      'title': 'leaf node 4-1'
    }, {
      'title': 'leaf node 4-2'
    }]
  }, {
    'title': 'parent node 5',
    'open': true,
    'children': [{
      'title': 'leaf node 5-1'
    }, {
      'title': 'leaf node 5-2'
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
