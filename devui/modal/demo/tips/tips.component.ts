import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng-devui/modal';

@Component({
  selector: 'd-tips',
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.css']
})
export class TipsComponent implements OnInit {

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  openSuccessDialog(dialogtype?: string) {
    const results = this.dialogService.open({
    id: 'dialog-service',
    width: '346px',
    maxHeight: '600px',
    showAnimate: false,
    title: '',
    content: 'Delete [Git] repository successfully.',
    backdropCloseable: true,
    dialogtype: dialogtype,
    buttons: [
      {
        cssClass: 'stress',
        text: '确定',
        handler: ($event: Event) => {
          results.modalInstance.hide();
        },
      }]
    });
  }

  openFailedDialog(dialogtype?: string) {
    const results = this.dialogService.open({
    id: 'dialog-service',
    width: '346px',
    maxHeight: '600px',
    showAnimate: false,
    title: '',
    content: 'It is failed. if you want to resolve it,please contact the supportor.',
    backdropCloseable: true,
    dialogtype: dialogtype,
    buttons: [
      {
        cssClass: 'stress',
        text: '确定',
        handler: ($event: Event) => {
          results.modalInstance.hide();
        }
      }],
    });
  }

  openWarningDialog(dialogtype?: string) {
    const results = this.dialogService.open({
    id: 'dialog-service',
    width: '400px',
    maxHeight: '600px',
    showAnimate: false,
    title: '',
    html: true,
    content: '即将离开此页!',
    backdropCloseable: true,
    dialogtype: dialogtype,
    buttons: [
      {
        cssClass: 'stress',
        text: 'Ok',
        handler: ($event: Event) => {
          results.modalInstance.hide();
        },
        btnwidth: '84px'
      }],
    });
  }

  openInfoDialog(dialogtype?: string) {
    const results = this.dialogService.open({
    id: 'dialog-service',
    zIndex: 1050,
    width: '346px',
    maxHeight: '600px',
    showAnimate: false,
    title: '',
    content: ' You signed in with another tab or window. Reload to refresh your session.',
    backdropCloseable: true,
    dialogtype: dialogtype,
    buttons: [
      {
        cssClass: 'stress',
        text: '确定',
        handler: ($event: Event) => {
          results.modalInstance.hide();
        }
      }]
    });
  }

}
