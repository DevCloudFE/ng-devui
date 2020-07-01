import {
  Component,
} from '@angular/core';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css'],
})

export class CustomComponent {

  deleteTagName1 = 'tag1';
  deleteTagName2 = 'tag2';
  tagName = 'bug';
  getTagValue(value) {
    console.log(value.tag);
  }
  deleteTag(tag) {
    this.tagName = '';
  }
}
