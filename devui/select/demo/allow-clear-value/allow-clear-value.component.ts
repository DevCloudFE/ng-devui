import { Component } from '@angular/core';

@Component({
    selector: 'd-allow-clear-value',
    templateUrl: './allow-clear-value.component.html',
    styleUrls: ['./allow-clear-value.component.css']
})
export class AllowClearValueComponent {
  value;
  options = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8',
    '选项9', '选项10', '选项11', '选项12', '选项13', '选项14'];
}
