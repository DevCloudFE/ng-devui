import { Component } from '@angular/core';
import { BreadCrumbService, MenuConfig } from 'ng-devui/breadcrumb';
import { HelperUtils } from 'ng-devui/common';
import { DialogService } from 'ng-devui/modal';

@Component({
  selector: 'd-click-block',
  templateUrl: './click-block.component.html',
})
export class ClickBlockComponent {
  breadItem: Array<MenuConfig> = [
    {
      linkType: 'hrefLink',
      link: '//angular.cn/',
      name: 'Home',
    },
    {
      linkType: 'routerLink',
      link: './home',
      name: 'DevUI',
    },
    {
      linkType: 'routerLink',
      link: '/components/zh-cn/button/demo#button-common',
      name: 'Profile',
    },
  ];

  constructor(private breadCrumbService: BreadCrumbService, private dialogService: DialogService) {}

  navigate($event, item) {
    this.canNavigate(item).then((can) => {
      if (!can) {
        return;
      }
      if (item.linkType === 'routerLink') {
        this.breadCrumbService.navigateTo($event, item);
      } else {
        HelperUtils.jumpOuterUrl(item.link, '_self');
      }
    });
  }

  canNavigate(item) {
    return new Promise((resolve) => {
      const results = this.dialogService.open({
        id: 'dialog-service',
        width: '300px',
        zIndex: 1050,
        maxHeight: '600px',
        title: 'Router?',
        content: `Are you sure to Router to ${item.name}?`,
        backdropCloseable: false,
        dialogtype: 'standard',
        buttons: [
          {
            cssClass: 'stress',
            text: 'Ok',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(true);
            },
          },
          {
            id: 'btn-cancel',
            cssClass: 'common',
            text: 'Cancel',
            handler: ($event: Event) => {
              results.modalInstance.hide();
              resolve(false);
            },
          },
        ],
      });
    });
  }
}
