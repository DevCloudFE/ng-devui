import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'd-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
  private _name: string;
  isNobody = true;
  isErrorImg = false;
  private _customText: string;
  private _gender: string;
  /**
  * 自定义头像显示文字
  */
  @Input() set gender(genderInput: 'male' | 'female' | string) {
    this._gender = genderInput;
    this.calcValues(this._customText ? this._customText : this._name);
  }
  get gender() {
    return this._gender;
  }
  /**
   * avatar宽度
   */
  @Input() width = 36;
  /**
   * avatar高度
   */
  @Input() height = 36;

  /**
   * 是否是圆形
   */
  @Input() isRound = true;

  /**
   * 是否是图片
   */
  @Input() imgSrc: string;
  /**
 * 用户名称
 */
  @Input() set name(nameInput: string) {
    this._name = nameInput;
    this.calcValues(nameInput);
  }
  get name() {
    return this._name;
  }
  /**
   * 自定义头像显示文字
   */
  @Input() set customText(text: string) {
    this._customText = text;
    this.calcValues(text);
  }
  get customText() {
    return this._customText;
  }

  fontSize = 12;
  code: number;
  nameDisplay: string;
  constructor() { }
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
    this.fontSize = minNum / 4 + 3;
  }
  setDisplayName(name, width) {
    if (this._customText) {
      this.nameDisplay = this._customText;
      this.getBackgroundColor(this._customText.substr(0, 1));
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
        this.nameDisplay = this._name.substr(0, 2);
      }
    }
    if (width < 30) {
      this.nameDisplay = this._name.substr(0, 1).toUpperCase();
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
