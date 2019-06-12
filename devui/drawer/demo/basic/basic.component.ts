import { Component } from '@angular/core';
import { DrawerContentComponent } from '../drawerContent/drawer-content.component';
import { IDrawerOpenResult, DrawerService, DialogService } from 'ng-devui';

@Component({
  selector: 'ave-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent {
  results: IDrawerOpenResult;
  constructor(private drawerService: DrawerService, private dialogService: DialogService) {

  }

  openDrawer() {
    this.results = this.drawerService.open({
      drawerContentComponent: DrawerContentComponent,
      width: '50%',
      isCover: true,
      fullScreen: true,
      backdropCloseable: true,
      escKeyCloseable: true,
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
        onBtnClick: (event) => {
          console.log(event);
          this.results.drawerInstance.hide();
        },
        fullScreen: (event) => {
          this.results.drawerInstance.toggleFullScreen();
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
