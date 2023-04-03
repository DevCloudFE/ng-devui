import { Component } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'd-custom',
  templateUrl: './custom.component.html',
})
export class CustomComponent {
  items = ['Item1', 'Item2', 'Item3'];
  itemControl = new UntypedFormControl('Item1');
  objects = [{ name: 'Item1' }, { name: 'Item2' }, { name: 'Item3' }];
  chosenObject = this.objects[2].name;

  valueChange(value: any): void {
    console.log(value);
  }
}
