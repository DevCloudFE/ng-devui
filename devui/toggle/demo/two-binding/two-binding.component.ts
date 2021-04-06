import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng-devui/modal';

@Component({
  selector: 'd-two-binding',
  templateUrl: './two-binding.component.html'
})
export class TwoBindingComponent implements OnInit {
  enable = true;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
  }

  beforeChange = (currentValue) => {
    console.log('currentValue: ' + currentValue);
    return new Promise((resolve) => {
      const results = this.dialogService.open({
        id: 'dialog-service',
        width: '300px',
        maxHeight: '600px',
        title: 'Close?',
        content: 'Are you sure to change the state?',
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

  onChange2(state) {
    console.log(state);
  }

}
