import { I18nService } from 'ng-devui/i18n';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DevuiCommonsService } from '../../devui-commons.service';
import { I18nUtil } from '../../i18n/i18n.util';

@Component({
  selector: 'd-header-language-switch',
  templateUrl: './language-switch.component.html',
  styleUrls: ['./language-switch.component.scss']
})
export class LanguageSwitchComponent implements OnInit {
  @Input() languageArr: string[] = ['CN', 'EN'];
  @Output() languageEvent = new EventEmitter<string>();
  currentLang!: string;

  constructor(
    private commonsService: DevuiCommonsService,
    private i18n: I18nService
  ) { }

  ngOnInit(): void {
    this.currentLang = I18nUtil.getCurrentLanguage();
  }

  changeLanguage(): void {
    this.currentLang = this.currentLang === 'zh-cn' ? 'en-us' : 'zh-cn';
    localStorage.setItem('lang', this.currentLang);
    this.languageEvent.emit(this.currentLang);
    this.i18n.toggleLang(this.currentLang);
    this.commonsService.broadcast('languageEvent', this.currentLang);
  }
}