import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { DevuiCommonsService } from '../../devui-commons.service';

@Component({
  selector: 'd-ecosystem',
  templateUrl: './ecosystem.component.html',
  styleUrls: ['./ecosystem.component.scss']
})
export class EcosystemComponent implements OnInit {
  @Input() navs = [];
  curLanguage: string;

  constructor(private commonsService: DevuiCommonsService) { }

  ngOnInit() {
    this.curLanguage = localStorage.getItem('lang') || 'zh-cn';
    this.commonsService.on('languageEvent').subscribe(term => this.changeLanguage(term));
  }

  changeLanguage(lang) {
    this.curLanguage = lang;
  }

}
