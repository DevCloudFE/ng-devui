import { Component } from '@angular/core';
import { DrawerService, IDrawerOpenResult } from 'ng-devui/drawer';
import { DrawerContentComponent } from '../drawerContent/drawer-content.component';

@Component({
  selector: 'd-undestroyable',
  templateUrl: './undestroyable.component.html',
})
export class UndestroyableComponent {
  results: IDrawerOpenResult;
  doms: any = [];

  constructor(private drawerService: DrawerService) {
    this.doms.push(document.getElementById('app-container'));
  }

  destroy() {
    this.results.drawerInstance.destroy();
    this.results = null;
  }

  openDrawer() {
    if (this.results) {
      this.results.drawerInstance.show();
    } else {
      this.results = this.drawerService.open({
        drawerContentComponent: DrawerContentComponent,
        width: '500px',
        clickDoms: this.doms,
        destroyOnHide: false,
        onClose: () => {
          console.log('on drawer closed');
        },
        data: {
          text: 'hello',
          name: 'tom1',
          items: [
            'This is item 1',
            'This is item 2',
            'This is item 3',
            'This is item 4',
            'This is item 5',
          ],
          close: (event) => {
            this.results.drawerInstance.hide();
          },
          fullScreen: (event) => {
            this.results.drawerInstance.toggleFullScreen();
          },
          changeWidth: (event) => {
            this.results.drawerInstance.setWidth(event + 'px');
          }
        }
      });
    }
  }

}
