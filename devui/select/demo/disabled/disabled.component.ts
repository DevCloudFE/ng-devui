import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'd-disabled',
  templateUrl: './disabled.component.html',
  styleUrls: ['./disabled.component.css']
})
export class DisabledComponent implements OnInit {
  options = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8',
    '选项9', '选项10', '选项11', '选项12', '选项13', '选项14'];
  options2 = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6(disabled, selected)', '选项7', '选项8',
    '选项9', '选项10', '选项11(disabled)', '选项12', '选项13(disabled)', '选项14(disabled)']
    .map(item => ({value: item, disabled: false, immutable: false}));
  options3 = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6(disabled, immutable, selected)', '选项7', '选项8',
    '选项9', '选项10', '选项11', '选项12', '选项13(immutable, not-disabled)', '选项14(disabled, immutable)']
    .map(item => ({value: item, disabled: false, immutable: false}));
  opt2 = this.options2.filter(item => item.value.indexOf('选项6') === 0);
  opt3 = this.options3.filter(item => item.value.indexOf('选项6') === 0);
  ngOnInit() {
    this.options2.filter(item => item.value.indexOf('disabled') > 0)
      .forEach( item => { item.disabled = true; });
    this.options3.filter(item => item.value.indexOf('disabled') > 0)
      .forEach( item => { item.disabled = true; item.immutable = true; });
    this.options3.filter(item => item.value.indexOf('选项13') === 0)
      .forEach( item => { item.disabled = false; });
  }
}
