import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { DevuiCommonsService } from '../../devui-commons.service';
import { I18nUtil } from '../../i18n/i18n.util';

@Component({
  selector: 'd-ecosystem',
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.scss']
})
export class EcosystemComponent implements OnInit {
  @Input() navs = [];
  curLanguage: string;

  constructor(private commonsService: DevuiCommonsService) { }

  ngOnInit(): void {
    this.curLanguage = I18nUtil.getCurrentLanguage();
    this.commonsService.on('languageEvent').subscribe(term => this.changeLanguage(term));
  }

  changeLanguage(lang): void {
    this.curLanguage = lang;
  }

}
