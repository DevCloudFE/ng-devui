import { ChangeDetectorRef, Component } from '@angular/core';

@Component({
    selector: 'd-draggable',
    templateUrl: './draggable.component.html',
    styleUrls: ['./draggable.component.scss'],
    standalone: false
})
export class DraggableComponent {
  transferData: string;
  data = [
    {
      title: 'parent node 1',
    },
    {
      title: 'parent node 2',
      open: true,
      items: [
        {
          title: 'leaf node 2-1',
          open: true,
          items: [
            {
              title: 'leaf node 2-1-1',
            },
            {
              title: 'leaf node 2-1-2',
            },
          ],
        },
        {
          title: 'leaf node 2-2',
          items: [
            {
              title: 'leaf node 2-2-1',
            },
            {
              title: 'leaf node 2-2-2',
            },
          ],
        },
      ],
    },
    {
      title: 'parent node 3',
      open: true,
      items: [
        {
          title: 'leaf node 3-1',
        },
        {
          title: 'leaf node 3-2',
        },
      ],
    },
    {
      title: 'parent node 4',
      open: true,
      items: [
        {
          title: 'leaf node 4-1',
        },
        {
          title: 'leaf node 4-2',
        },
      ],
    },
    {
      title: 'parent node 5',
      open: true,
      items: [
        {
          title: 'leaf node 5-1',
        },
        {
          title: 'leaf node 5-2',
        },
      ],
    },
  ];
  dropItems = [];
  dropType = {
    dropPrev: true,
    dropNext: true,
    dropInner: true,
  };

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  beforeNodeDrop = (dragNodeId, dropNodeId, dropType, dragNodeIds) => {
    console.log(dropType);
    return new Promise((resolve) => {
      console.log('dragNodeId: ' + dragNodeId);
      console.log('dropNodeId: ' + dropNodeId);
      /* if canActivateMultipleNode is true */
      console.log('dragNodeIds: ' + dragNodeIds);
      resolve(undefined);
    });
  };

  onDrop(data) {
    console.log('drop', data);
    this.transferData = data.event.dataTransfer.getData('Text');
  }

  dragStart(event) {
    console.log('dragStart', event);
  }

  showNode(node) {
    console.log('toggle', node);
  }

  dragOver($event) {
    $event.preventDefault();
    $event.dataTransfer.dropEffect = 'move';
  }

  drop($event) {
    const transferDataStr = JSON.parse($event.dataTransfer.getData('Text'));
    /* if canActivateMultipleNode is true */
    const data = transferDataStr.multipleData;
    if (data) {
      data.forEach((node) => this.dropItems.push(node.data.title));
    } else {
      this.dropItems.push(transferDataStr.nodeTitle);
    }
    this.changeDetectorRef.detectChanges();
  }
}
