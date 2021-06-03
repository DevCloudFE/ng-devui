import { Component, Input, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { DevuiCommonsService } from '../devui-commons.service';

@Component({
  selector: 'd-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() sideMenuList;
  @Input() linkType = 'routerLink';
  _navData;
  componentsDataDisplay;

  @Input() set navData(data) {
    this._navData = data;
    this.componentsDataDisplay = data;
  }

  get navData() {
    return this._navData;
  }

  constructor(private commonsService: DevuiCommonsService) { }

  ngOnInit(): void {
    this.commonsService.on<any>('searchEvent').subscribe(term => {
      this.filterData(term);
    });
  }

  filterData(event): void {
    this.componentsDataDisplay = cloneDeep(this.navData).filter(catalog => {
      catalog.children = catalog.children.filter(item => {
        return item.title.toLowerCase().includes(event.toLowerCase());
      });
      return catalog.children.length;
    });
  }
}
