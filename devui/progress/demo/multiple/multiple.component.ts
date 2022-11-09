import { Component } from '@angular/core';

@Component({
  selector: 'd-multiple',
  templateUrl: './multiple.component.html',
})
export class MultipleComponent {
  config = [
    {
      name: 'success',
      color: '#50d4ab',
      percentage: 21,
    },
    {
      name: 'fail',
      color: '#f66f6a',
      percentage: 16,
    },
    {
      name: 'other',
      color: '#fac20a',
      percentage: 30,
    },
  ];
  showContentConfig = {
    showInnerContent: true,
    showOuterContent: false,
    showCenterContent: false,
  };
  circleGradientColor = [
    { color: '#db4d83', percentage: '0%' },
    { color: '#ffad63', percentage: '100%' },
  ];
  lineGradientColor = [
    { color: '#50d4ab', percentage: '0%' },
    { color: '', percentage: '40%' },
    { color: '#5e7ce0', percentage: '100%' },
  ];
}
