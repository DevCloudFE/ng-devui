import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DrawerService, IDrawerOpenResult } from 'ng-devui/drawer';

@Component({
  selector: 'd-can-resize',
  templateUrl: './resize.component.html'
})
export class ResizeComponent implements OnInit {
  @ViewChild('drawerContent', { static: true }) drawerContent: TemplateRef<any>;
  results: IDrawerOpenResult;
  constructor(private drawerService: DrawerService) { }

  ngOnInit() {
  }

  openDrawer() {
    this.results = this.drawerService.open({
      width: '300px',
      zIndex: 10000,
      isCover: false,
      backdropCloseable: true,
      escKeyCloseable: true,
      position: 'right',
      resizable: true,
      onClose: () => {
        console.log('on drawer closed');
      },
      contentTemplate: this.drawerContent
    });
  }

  close($event) {
    this.results.drawerInstance.hide();
  }
}
