import { Component } from '@angular/core';

@Component({
    selector: 'd-lazy-load-virtual-scroll',
    templateUrl: './lazy-load-virtual-scroll.component.html',
    styleUrls: ['./lazy-load-virtual-scroll.component.scss']
})
export class LazyLoadVirtualScrollComponent {
  options = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8',
    '选项9', '选项10', '选项11', '选项12', '选项13', '选项14'];
  options1 = ['选项1', '选项2', '选项3', '选项4', '选项5', '选项6', '选项7', '选项8',
    '选项9', '选项10', '选项11', '选项12', '选项13', '选项14'];

  constructor() {
    for (let i = 0; i < 1000; i++) {
      this.options.push('Test' + i);
    }
  }

  loadMore(data) {
    const moreData = ['异步选项1', '异步选项2', '异步选项3', '异步选项4', '异步选项5'];

    // 模拟接口延时
    setTimeout(() => {
      this.options1 = [...this.options1, ...moreData];
      data.instance.loadFinish();
    }, 1000);
  }
}
