import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'd-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  preserveWhitespaces: false,
})
export class AvatarComponent implements OnChanges, OnInit {
  isNobody = true;
  isErrorImg = false;
  /**
   * 自定义头像显示文字
   */
  @Input() gender: 'male' | 'female' | string;
  /**
   * avatar宽度
   */
  @Input() width = 36;
  /**
   * avatar高度
   */
  @Input() height = 36;
  /**
   * 是否是圆形n
   */
  @Input() isRound = true;
  /**
   * 是否是图片
   */
  @Input() imgSrc: string;
  /**
   * 用户名称
   */
  @Input() name: string;
  /**
   * 自定义头像显示文字
   */
  @Input() customText: string;
  /**
   * 头像中间文字最小尺寸
   */
  MINIMUM_FONT_SIZE = 12;
  fontSize = 12;
  code: number;
  nameDisplay: string;

  ngOnInit(): void {
    this.calcValues(this.customText ? this.customText : this.name);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { width, customText, gender, height, name } = changes;
    const result = [width, customText, gender, height, name].map((item) => item && !item.isFirstChange());
    if (result.includes(true)) {
      this.calcValues(this.customText ? this.customText : this.name);
    }
  }

  showErrAvatar() {
    this.isErrorImg = true;
  }

  calcValues(nameInput) {
    const userName = nameInput;
    const minNum = Math.min(this.width, this.height);
    // 判断username是否存在与是否为空
    if (userName) {
      this.isNobody = false;
      this.setDisplayName(userName, minNum);
    } else if (userName === '') {
      this.isNobody = false;
      this.nameDisplay = '';
    } else {
      this.isNobody = true;
    }
    const size = minNum / 4 + 3;
    this.fontSize = size < this.MINIMUM_FONT_SIZE ? this.MINIMUM_FONT_SIZE : size;
  }

  setDisplayName(name, width) {
    if (this.customText) {
      this.nameDisplay = this.customText;
      this.getBackgroundColor(this.customText.substr(0, 1));
      return;
    }
    if (name.length < 2) {
      this.nameDisplay = name;
    } else {
      // 以中文开头显示后两个字符
      if (/^[\u4e00-\u9fa5]/.test(name)) {
        this.nameDisplay = name.substr(name.length - 2, 2);
        // 以英文开头
      } else if (/^[A-Za-z]/.test(name)) {
        // 含有两个及以上，包含空格，下划线，中划线分隔符的英文名取前两个字母的首字母
        if (/[_ -]/.test(name)) {
          const str_before = name.split(/_|-|\s+/)[0];
          const str_after = name.split(/_|-|\s+/)[1];
          this.nameDisplay = str_before.substr(0, 1).toUpperCase() + str_after.substr(0, 1).toUpperCase();
        } else {
          // 一个英文名的情况显示前两个字母
          this.nameDisplay = name.substr(0, 2).toUpperCase();
        }
      } else {
        // 非中英文开头默认取前两个字符
        this.nameDisplay = this.name.substr(0, 2);
      }
    }
    if (width < 30) {
      if (/^[\u4e00-\u9fa5]/.test(name)) {
        this.nameDisplay = name.substr(name.length - 1, 1);
      } else {
        this.nameDisplay = this.name.substr(0, 1).toUpperCase();
      }
    }
    this.getBackgroundColor(name.substr(0, 1));
  }

  getBackgroundColor(char) {
    if (this.gender) {
      if (this.gender.toLowerCase() === 'male') {
        this.code = 1;
      } else if (this.gender.toLowerCase() === 'female') {
        this.code = 0;
      } else {
        throw new Error('gender must be "Male" or "Female"');
      }
      return;
    }
    const unicode = char.charCodeAt();
    this.code = unicode % 2;
  }
}
