import { Component } from '@angular/core';
@Component({
  selector: 'd-multi-keep-order',
  templateUrl: './multi-keep-order.component.html',
  styleUrls: ['./multi-keep-order.component.css']
})

export class MultiKeepOrderComponent {
  options = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8',
    '选项9', '选项10', '选项11', '选项12', '选项13', '选项14'];
  select2 = ['选项3', '选项8'];
}
