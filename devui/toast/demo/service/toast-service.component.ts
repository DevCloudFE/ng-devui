import { Component } from '@angular/core';
import { ToastService } from 'ng-devui/toast';
@Component({
  selector: 'd-demo-toast-service',
  templateUrl: './toast-service.component.html',
  styleUrls: ['./toast-service.component.scss'],
})
export class ToastServiceComponent {
  constructor(private toastService: ToastService) {}
  results: any;
  isShow: boolean;
  openToast() {
    const results = this.toastService.open({
      value: [{ severity: 'info', summary: 'summary', content: 'I am content' }],
    });
    console.log('results', results);
  }
  openToast2() {
    const results = this.toastService.open({
      value: [
        { severity: 'info', summary: 'summary', content: '1. I am content' },
        { severity: 'error', summary: 'summary', content: '2. I am content' },
        { severity: 'error', summary: 'summary', content: '3. I am content' },
      ],
      sticky: true,
      style: { width: '600px', color: 'red' },
      styleClass: 'myCustom-toast',
      life: 5000,
      lifeMode: 'single ',
    });
    /*
    接收发射过来的数据
    */
    results.toastInstance.closeEvent.subscribe((value: any) => {
      console.log('closeEvent', value);
    });
    results.toastInstance.valueChange.subscribe((value: any) => {
      console.log('valueChange', value);
    });
    this.results = results;
    console.log('results', this.results);

    this.isShow = true;
  }
  closeToast2() {
    this.results.toastInstance.close();
    this.isShow = false;
  }
  closeToast3() {
    /*
    1.可以根据指定下标关闭 this.results.toastInstance.close(0);
    2.可以根据value对象去关闭，作用跟1是等同的，如下所示：
    */
    this.results.toastInstance.close({ severity: 'info', summary: 'summary', content: '1. I am content' });
  }
}
