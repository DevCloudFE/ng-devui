import { Component, OnInit } from '@angular/core';
import { DialogService } from 'ng-devui/modal';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent implements OnInit {
  enable = true;
  count = 0;

  constructor(private dialogService: DialogService) {
  }

  ngOnInit() {

  }

  beforeChange = (currentValue) => {
    console.log('currentValue: ' + currentValue);
    return new Promise((resolve) => {
      const results = this.dialogService.open({
        id: 'dialog-service',
        width: '300px',
        maxHeight: '600px',
        showAnimate: false,
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

  onChange(state) {
    console.log(state);
    this.count++;
  }

  onChange2(state) {
    console.log(state);
  }

}
