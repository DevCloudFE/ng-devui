import { Component } from '@angular/core';
import { DrawerService, IDrawerOpenResult } from 'ng-devui';
import { DrawerContentComponent } from '../drawerContent/drawer-content.component';

@Component({
  selector: 'ave-undestroyable',
  templateUrl: './undestroyable.component.html',
  styleUrls: ['./undestroyable.component.css']
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
        width: '50%',
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
          onBtnClick: (event) => {
            this.results.drawerInstance.hide();
          }
        }
      });
    }
  }

}
