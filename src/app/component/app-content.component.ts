import {
  Component,
  HostBinding,
  ViewEncapsulation
} from '@angular/core';

import {
  Router,
  Routes
} from '@angular/router';
import {groupBy, map, indexOf} from 'lodash-es';
import { routesConfig } from './component.route';


@Component({
  selector: 'cd-app-content', // tslint:disable-line
  templateUrl: './app-content.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class AppContentComponent {
  type = '通用';
  types = ['通用'];
  routes: Routes = [];
  groupedRoutes: any;
  @HostBinding('attr.ave-ui') aveUi = true;

  constructor(private router: Router) {
    const routesWithData = map(routesConfig, (route) => {
      if (!route.data) {
        route.data = {};
      }
      return route;
    });
    const groupedRoutesObj = groupBy(routesWithData,
      (route) => {
        return (route as any).data.type || '通用';
      });

    this.groupedRoutes = [];
    for( let  key in groupedRoutesObj) {
      this.groupedRoutes.push({
        [key] : groupedRoutesObj[key]
      })
    }

    const allKeys = Object.keys(groupedRoutesObj);
    for (let i = 0; i < allKeys.length; i++){
      const key = allKeys[i];
      if (indexOf(this.types, key) === -1){
        this.types.push(key);
      }
    }
  }
}

