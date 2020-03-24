import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'd-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.scss'],
  exportAs: 'Tag'
})

export class TagComponent {
  /**
  * 【必选】记录输入的标签
  */
  @Input() tag: string;

  @Input() labelStyle = '';

  @Input() deletable = false;

  @Input() titleContent: string;

  @Input() customViewTemplate: TemplateRef<any>;
  /**
   * tag被删除后触发
   */
  @Output() tagDelete = new EventEmitter();
  deleteTag = false;


  removeTag(tag) {
    this.deleteTag = true;
    this.tagDelete.emit({ tag: tag });
  }

}
