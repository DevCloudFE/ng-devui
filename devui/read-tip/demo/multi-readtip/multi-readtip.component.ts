import { Component } from '@angular/core';
import { ReadTipOptions } from 'ng-devui/read-tip';

@Component({
  selector: 'd-demo-multi',
  templateUrl: './multi-readtip.component.html',
  styleUrls: ['./multi-readtip.component.scss'],
})
export class MultiReadtipComponent {
  multiReadTip: ReadTipOptions = {
    trigger: 'click',
    showAnimate: false,
    mouseenterTime: 100,
    mouseleaveTime: 100,
    position: 'top',
    overlayClassName: 'read-tip-container',
    rules: [
      {
        selector: '.first-content',
        position: 'left',
        title: 'This Is the First Title',
        content: 'Lorem ipsum dolor sit amet, consectetur ad.',
      },
      {
        selector: '.second-content',
        position: 'top-left',
        title: 'This Is the Second Title',
        content: 'Class aptent taciti sociosqu ad litora torquent per conubia nostra',
        overlayClassName: 'child-class',
      },
      {
        trigger: 'hover',
        selector: '.third-content',
        position: 'bottom-left',
        title: 'This Is the Third Title',
        content: 'Aenean libero urna, scelerisque tincidunt',
      },
    ],
  };
}
