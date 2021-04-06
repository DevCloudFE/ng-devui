import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DevuiCommonsService } from '../../devui-commons.service';

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

  ngOnInit() {
    this.curLanguage = localStorage.getItem('lang') || 'zh-cn';
    this.commonsService.on('languageEvent').subscribe(term => this.changeLanguage(term));
    let pathName = window.location.pathname;
    for(let i = 0; i < this.menuList.length; i++) {
      if(this.menuList[i].href === pathName) {
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

  menuChange(value: string) {
    this.menuEvent.emit(value);
  }

  changeLanguage(lang) {
    this.curLanguage = lang;
  }

}