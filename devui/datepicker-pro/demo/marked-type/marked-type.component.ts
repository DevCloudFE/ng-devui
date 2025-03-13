import {
  Component
} from '@angular/core';

@Component({
    selector: 'd-marked-type-demo',
    templateUrl: './marked-type.component.html',
    standalone: false
})
export class MarkedTypeDemoComponent {
  value = new Date('2021/11/01');
  list = [new Date('2021/11/01'), new Date('2021/11/10')];
  markRange = [[new Date('2021/11/01'), new Date('2021/11/10')]];

  onChange(date) {
    console.log(date);
  }

  isStart(date: Date) {
    return date.toDateString() === new Date('2021/11/01').toDateString();
  }

}
