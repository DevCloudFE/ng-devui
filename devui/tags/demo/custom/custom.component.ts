import {
  Component,
} from '@angular/core';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css'],
})

export class CustomComponent {

  tagName = 'bug';
  getTagValue(value) {
    console.log(value.tag);
  }
  deleteTag(tag) {
    this.tagName = '';
  }
}
