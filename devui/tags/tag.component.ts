import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

export type ITagMode = 'default' | 'checkable' | 'closeable';

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

  // @deprecated
  @Input() deletable = false;

  @Input() titleContent: string;

  @Input() mode: ITagMode = 'default';

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
    'aqua-w98': '#39afcc',
    'olivine-w98': '#2fa898',
    'green-w98': '#4eb15e',
    'yellow-w98': '#b08d1a',
    'orange-w98': '#d47f35',
    'red-w98': '#f66f6a',
    'pink-w98': '#f3689a',
    'purple-w98': '#a97af8',
  };

  get isColorfulTag(): boolean {
    return !!(this.colorMap[this.labelStyle] || (this.customColor && this.customColor !== ''));
  }

  removeTag($event, tag) {
    this.deleteTag = true;
    this.tagDelete.emit({ tag: tag, event: $event });
  }

  tagClick() {
    if (this.mode === 'checkable') {
      this.checked = !this.checked;
      this.checkedChange.emit(this.checked);
    }
  }
}
