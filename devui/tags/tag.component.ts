import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  exportAs: 'Tag',
  preserveWhitespaces: false,
})

export class TagComponent {
  /**
  * 【必选】记录输入的标签
  */
  @Input() tag: string;

  @Input() labelStyle = '';

  @Input() customColor = '';

  @Input() deletable = false;

  @Input() titleContent: string;

  @Input() checkable = false;

  @Input() checked = false;

  @Input() customViewTemplate: TemplateRef<any>;
  /**
   * tag被删除后触发
   */
  @Output() tagDelete = new EventEmitter<any>();

  @Output() checkedChange = new EventEmitter<boolean>();
  deleteTag = false;

  colorMap = {
    'blue-w98': '#3383ff',
    'aqua-w98': '#6cbfff',
    'olivine-w98': '#50d4ab',
    'green-w98': '#a6dd82',
    'yellow-w98': '#fac20a',
    'orange-w98': '#fa9841',
    'pink-w98': '#f66f6a',
    'red-w98': '#f3689a',
    'purple-w98': '#a97af8'
  };

  get isColorfulTag(): boolean {
    return !!(( this.colorMap[this.labelStyle]) || (this.customColor && this.customColor !== ''));
  }

  removeTag($event, tag) {
    this.deleteTag = true;
    this.tagDelete.emit({ tag: tag, event: $event});
  }

  selectToggle() {
    if (this.checkable) {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }

}
