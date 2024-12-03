import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ITagMode, ITagSize } from './tag.component';

@Component({
  selector: 'd-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  exportAs: 'Tags',
  preserveWhitespaces: false,
})
export class TagsComponent implements OnInit, AfterViewInit, OnChanges {
  /**
   * 【必选】记录输入的标签
   */
  @Input() tags = [];
  /**
   * 【可选】使用的属性名
   */
  @Input() displayProperty = '';

  /**
   * @deprecated
   */
  @Input() deletable = false;
  @Input() mode: ITagMode = 'default';
  @Input() size: ITagSize = 'md';
  @Input() titleProperty = '';
  @Input() hideBeyondTags = false;
  @Input() beforeDelete: () => boolean | Promise<boolean> | Observable<boolean>;
  @ContentChild(TemplateRef) customViewTemplate: TemplateRef<any>;
  @ViewChild('suffixElement') suffixElement: ElementRef;
  @ViewChild('tagsElement') tagsElement: ElementRef;
  @ViewChildren('tagElement', { read: ElementRef }) viewChildren!: QueryList<ElementRef>;
  /**
   * tag被删除后触发
   */
  @Output() tagDelete = new EventEmitter<any>();

  @Output() checkedChange = new EventEmitter<any>();

  /**
   * 多标签超出显示相关数据
   */
  showTags = [];
  beyondTags = [];
  showMore = false;
  maxShowNumber: number;
  tagsFatherWidth: number;
  MORE_TAG_WIDTH = 30;
  TAG_MARGIN = 4;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.maxShowNumber = 0;
    // TODO: 使用cloneDeep导致category-search卡顿，lodash-es报Illegal invocation非法调用错误，需调查原因，暂用循环方式替代深拷贝
    if (this.hideBeyondTags) {
      this.tags.forEach((item) => this.showTags.push(typeof item === 'object' ? { ...item } : item));
    }
  }

  ngAfterViewInit() {
    if (this.hideBeyondTags) {
      this.calculateHideTagsStatus();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.hideBeyondTags && changes.tags && !changes.tags.firstChange) {
      this.maxShowNumber = 0;
      this.showTags = [...this.tags];
      this.calculateHideTagsStatus();
    }
  }

  calculateHideTagsStatus() {
    this.cdr.detectChanges();
    let curWidth = 0;
    const viewChildrenArr = this.viewChildren.toArray();
    // 通过suffix添加ng-content至tags末尾，判断总宽度时不计算该部分，使得百分比宽度场景tags后可添加内容
    const suffixWidth = this.suffixElement?.nativeElement.offsetWidth || 0;
    this.tagsFatherWidth = this.tagsElement.nativeElement.getBoundingClientRect().width - suffixWidth;

    for (let i = 0; i < viewChildrenArr.length; i++) {
      if (curWidth + viewChildrenArr[i].nativeElement.offsetWidth + this.TAG_MARGIN < this.tagsFatherWidth - this.MORE_TAG_WIDTH) {
        curWidth += viewChildrenArr[i].nativeElement.offsetWidth;
        curWidth += this.TAG_MARGIN;
        this.maxShowNumber = i + 1;
      } else {
        break;
      }
    }
    if (this.maxShowNumber !== this.tags.length) {
      this.showMore = true;
      this.beyondTags = this.showTags.slice(this.maxShowNumber);
      this.showTags.splice(this.maxShowNumber);
      this.cdr.detectChanges();
    } else {
      this.showMore = false;
    }
  }

  removeTag($event, tag, index) {
    this.tagDelete.emit({ tag: tag, index: index, event: $event });
  }

  tagChecked($event, tag, index) {
    this.checkedChange.emit({ tag: tag, index: index, checked: $event });
  }
}
