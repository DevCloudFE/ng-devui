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
  ViewChildren
} from '@angular/core';
import { ITagMode } from './tag.component';

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
  @Input() titleProperty = '';
  @Input() hideBeyondTags = false;
  @ContentChild(TemplateRef) customViewTemplate: TemplateRef<any>;
  @ViewChild('tagsElement') tagsElement: ElementRef;
  @ViewChildren('tagElement', { read: ElementRef }) viewChildren!: QueryList<ElementRef>;
  /**
   * tag被删除后触发
   */
  @Output() tagDelete = new EventEmitter<any>();

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
    this.maxShowNumber = this.tags.length;
    // TODO: 使用cloneDeep导致category-search卡顿，lodash-es报Illegal invocation非法调用错误，需调查原因，暂用循环方式替代深拷贝
    this.tags.forEach((item) => this.showTags.push(typeof item === 'object' ? { ...item } : item));
  }

  ngAfterViewInit() {
    if (this.hideBeyondTags) {
      this.calculateHideTagsStatus();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.hideBeyondTags && changes['tags'] && !changes['tags'].firstChange) {
      this.maxShowNumber = this.tags.length;
      this.showTags = [...this.tags];
      this.calculateHideTagsStatus();
    }
  }

  calculateHideTagsStatus() {
    this.cdr.detectChanges();
    this.tagsFatherWidth = this.tagsElement.nativeElement.getBoundingClientRect().width;
    let curWidth = 0;
    this.viewChildren.forEach((element, index) => {
      if (curWidth + element.nativeElement.offsetWidth + this.TAG_MARGIN < this.tagsFatherWidth - this.MORE_TAG_WIDTH) {
        curWidth += element.nativeElement.offsetWidth;
        curWidth += this.TAG_MARGIN;
        this.maxShowNumber = index + 1;
      }
    });
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
}
