import { Component } from '@angular/core';
import { DrawerContentComponent } from '../drawerContent/drawer-content.component';
import { IDrawerOpenResult, DrawerService } from 'ng-devui/drawer';
import { DialogService } from 'ng-devui/modal';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
  results: IDrawerOpenResult;
  constructor(private drawerService: DrawerService, private dialogService: DialogService) {

  }

  openDrawer() {
    this.results = this.drawerService.open({
      drawerContentComponent: DrawerContentComponent,
      width: '50%',
      zIndex: 1000,
      isCover: true,
      fullScreen: true,
      backdropCloseable: true,
      escKeyCloseable: true,
      position: 'left',
      beforeHidden: () => this.beforeHidden(),
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
          this.results.drawerInstance.setWidth('200px');
        }
      }
    });
    console.log(this.results.drawerContentInstance);
  }

  beforeHidden(): Promise<boolean> {
    return new Promise((resolve) => {
      const results = this.dialogService.open({
        id: 'dialog-service',
        width: '300px',
        zIndex: 1050,
        maxHeight: '600px',
        showAnimate: false,
        title: 'Close?',
        content: 'Are you sure to Close?',
        backdropCloseable: false,
        dialogtype: 'standard',
        buttons: [
          {
            cssClass: 'stress',
            text: '确定',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(true);
            }
          },
          {
            id: 'btn-cancel',
            cssClass: 'common',
            text: '取消',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(false);
            }
          },
        ]
      });
    });
  }
}
