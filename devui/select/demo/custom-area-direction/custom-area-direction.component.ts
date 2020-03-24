import { Component } from '@angular/core';
@Component({
  selector: 'd-custom-area-direction',
  templateUrl: './custom-area-direction.component.html',
  styleUrls: ['./custom-area-direction.component.css']
})
export class CustomAreaDirectionComponent {
  options = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8',
    '选项9', '选项10', '选项11', '选项12', '选项13', '选项14'];
  recently = ['选项1', '选项9', '选项12'];

  chooseRecent(e, index, choose) {
    e.stopPropagation();
    choose(this.recently[index], this.options.indexOf(this.recently[index]));
  }
}
