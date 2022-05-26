import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DevuiCommonsService } from '../../src/devui-commons.service';
import { I18nUtil } from '../i18n/i18n.util';

@Component({
  selector: 'd-demo-nav',
  templateUrl: './d-demo-nav.component.html',
  styleUrls: ['./d-demo-nav.component.scss'],
})
export class DDemoNavComponent implements OnInit {
  @Input() navItems: any;
  demoDocViewerMain;
  goToText = 'Go To';
  subs: Subscription = new Subscription();

  constructor(
    @Inject(DOCUMENT) private doc: any,
    private commonsService: DevuiCommonsService
  ) {}

  ngOnInit(): void {
    this.demoDocViewerMain = this.doc.querySelector('.doc-viewer-container .main');
    this.setI18n();
    this.subs = this.commonsService.on('languageEvent').subscribe((term) => this.setI18n(term));
  }

  setI18n(lang?): void {
    const curLanguage = lang || I18nUtil.getCurrentLanguage() || 'zh-cn';
    this.goToText = curLanguage === 'zh-cn' ? '快速前往' : 'Go To';
  }
}
