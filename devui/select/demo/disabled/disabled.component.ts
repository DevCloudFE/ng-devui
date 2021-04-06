import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'd-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.css']
})
export class DisabledComponent implements OnInit {
  options = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6', 'Option 7', 'Option 8',
    'Option 9', 'Option 10', 'Option 11', 'Option 12', 'Option 13', 'Option 14'];
  options2 = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6(disabled, selected)', 'Option 7', 'Option 8',
    'Option 9', 'Option 10', 'Option 11(disabled)', 'Option 12', 'Option 13(disabled)', 'Option 14(disabled)']
    .map(item => ({value: item, disabled: false, immutable: false}));
  options3 = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', 'Option 6(disabled, immutable, selected)', 'Option 7', 'Option 8',
    'Option 9', 'Option 10', 'Option 11', 'Option 12', 'Option 13(immutable, not-disabled)', 'Option 14(disabled, immutable)']
    .map(item => ({value: item, disabled: false, immutable: false}));
  opt1 = this.options2[5];
  opt2 = this.options2.filter(item => item.value.indexOf('Option 6') === 0);
  opt3 = this.options3.filter(item => item.value.indexOf('Option 6') === 0);
  ngOnInit() {
    this.options2.filter(item => item.value.indexOf('disabled') > 0)
      .forEach(item => { item.disabled = true; });
    this.options3.filter(item => item.value.indexOf('disabled') > 0)
      .forEach(item => { item.disabled = true; item.immutable = true; });
    this.options3.filter(item => item.value.indexOf('Option 13') === 0)
      .forEach(item => { item.disabled = false; });
  }
}
