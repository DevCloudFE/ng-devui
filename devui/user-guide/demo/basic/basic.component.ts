import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { DialogService } from 'ng-devui/modal';
import { IStep } from 'ng-devui/user-guide';
import { mockSteps } from '../mock-steps';

@Component({
    selector: 'd-user-guide-basic',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    standalone: false
})
export class BasicComponent implements OnInit {
  @ViewChild('contentTemplate') contentTemplate: TemplateRef<any>;
  steps: Array<IStep> = mockSteps;

  constructor(private dialogService: DialogService) { }

  ngOnInit() {
    setTimeout(() => {
      this.steps[0].detail[0].content = this.contentTemplate;
    });
  }

  openSuccessDialog(dialogtype?: string) {
    const results = this.dialogService.open({
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: '',
      content: 'Awesome!',
      backdropCloseable: true,
      dialogtype: dialogtype,
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        }
      ],
    });
  }

}
