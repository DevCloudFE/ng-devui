import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DevuiCommonsService } from '../../devui-commons.service';
import { I18nUtil } from '../../i18n/i18n.util';

@Component({
  selector: 'd-header-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Input() menuList = [];
  @Input() selectedItem = {};
  @Output() menuEvent = new EventEmitter<string>();
  curLanguage: string;

  constructor(private commonsService: DevuiCommonsService) { }

  ngOnInit(): void {
    this.curLanguage = I18nUtil.getCurrentLanguage();
    this.commonsService.on('languageEvent').subscribe(term => this.changeLanguage(term));
    const pathName = window.location.pathname;
    for (let i = 0; i < this.menuList.length; i++) {
      if (this.menuList[i].href === pathName) {
        this.selectedItem = this.menuList[i];
      }
    }
  }

  onSelect(item): void {
    if (item.target === '_self') {
      this.selectedItem = item;
    }
    this.menuChange(item.name);
  }

  menuChange(value: string): void {
    this.menuEvent.emit(value);
  }

  changeLanguage(lang): void {
    this.curLanguage = lang;
  }

}