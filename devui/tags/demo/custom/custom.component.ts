import {
  Component,
} from '@angular/core';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.scss'],
})

export class CustomComponent {

  deleteTagName1 = 'tag1';
  deleteTagName2 = 'tag2';
  tagName = 'bug';

  checked1 = false;

  tagList = [
    {
      checked: false,
      type: 'blue-w98'
    },
    {
      checked: false,
      type: 'aqua-w98'
    },
    {
      checked: false,
      type: 'olivine-w98'
    },
    {
      checked: true,
      type: 'green-w98'
    },
    {
      checked: false,
      type: 'yellow-w98'
    }
  ];
  getTagValue(value) {
    console.log(value.tag);
  }
  deleteTag(tag) {
    this.tagName = '';
  }

  changeChekced(tag) {
    tag.checked = !tag.checked;
  }
}
