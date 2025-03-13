import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { DrawerService, IDrawerOpenResult } from 'ng-devui/drawer';
import { DrawerContentComponent } from '../drawerContent/drawer-content.component';

@Component({
    selector: 'd-undestroyable',
    templateUrl: './undestroyable.component.html',
    standalone: false
})
export class UndestroyableComponent {
  results: IDrawerOpenResult;
  doms: any = [];

  constructor(private drawerService: DrawerService, @Inject(DOCUMENT) private doc: any) {
    this.doms.push(this.doc.getElementById('app-container'));
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
        width: '1000px',
        clickDoms: this.doms,
        destroyOnHide: false,
        position: 'right',
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
