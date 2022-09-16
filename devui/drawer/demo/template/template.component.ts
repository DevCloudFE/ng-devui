import { Component, TemplateRef, ViewChild } from '@angular/core';
import { DrawerService, IDrawerOpenResult } from 'ng-devui/drawer';

@Component({
  selector: 'd-template',
  templateUrl: './template.component.html',
})
export class TemplateComponent {
  @ViewChild('drawerContent', { static: true }) drawerContent: TemplateRef<any>;
  results: IDrawerOpenResult;
  constructor(private drawerService: DrawerService) {}

  openDrawer() {
    this.results = this.drawerService.open({
      width: '300px',
      zIndex: 1000,
      isCover: true,
      fullScreen: true,
      backdropCloseable: true,
      escKeyCloseable: true,
      position: 'left',
      onClose: () => {
        console.log('on drawer closed');
      },
      contentTemplate: this.drawerContent,
    });
  }

  close($event) {
    this.results.drawerInstance.hide();
  }
}
