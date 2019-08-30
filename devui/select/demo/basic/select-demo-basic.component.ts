import { Component } from '@angular/core';
@Component({
  selector: 'd-select-basic',
  templateUrl: './select-demo-basic.component.html',
  styles: [
    `
      .col-md-5 {
        width: 50%;
      }
    `
  ]
})
export class SelectDemoBasicComponent {

    languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python',
        'Ruby', 'F#', 'TypeScript', 'SQL', 'LiveScript', 'CoffeeScript'];
        constructor() {
            for (let i = 0; i < 1000; i++) {
                this.languages.push('Test' + i);
            }
        }

        loadMore(data) {
          const moreData = ['load1', 'load2', 'load3', 'load4', 'load5'];

          // 模拟接口延时
          setTimeout(() => {
            this.languages = [...this.languages, ...moreData];
            data.instance.loadFinish();
          }, 1000);

        }

}
