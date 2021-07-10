import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
  selector: 'd-multi-auto-complete-array',
  templateUrl: './multi-auto-complete-demo-array.component.html',
  styleUrls: [
    './multi-auto-complete-demo-array.component.scss'
  ]
})
export class MultiAutoCompleteDemoArrayComponent implements OnInit {
  multiItems1: string[] = ['C#', 'C', 'C++', 'CPython', 'Java'];
  multiItems2: any;
  languages = ['C#', 'C', 'C++', 'CPython', 'Java', 'JavaScript', 'Go', 'Python', 'Ruby', 'F#', 'TypeScript', 'SQL',
    'LiveScript', 'CoffeeScript'];

  msgs: Array<Object> = [];

  constructor(@Inject(DOCUMENT) private doc: any) {}
  ngOnInit() {
    this.multiItems2 = this.multiItems1.map((lang, index) => ({ label: lang, id: index }));
  }

  onSearchMultiple2(term: any) {
    return of(this.languages
      .map((lang, index) => ({ label: lang, id: index }))
      .filter(lang => this.multiItems2.map(item => item.id).indexOf(lang.id) === -1
        && lang.label.toLowerCase().indexOf(term.toLowerCase()) !== -1)
    );
  }

  autoSubmit($event) {
    console.log($event);
  }

  clear() {
    this.multiItems2 = [];
  }

  copy() {
    const tempInput = this.doc.createElement('input');
    tempInput.value = this.multiItems2.map(item => item.label).join(', ');
    this.doc.body.appendChild(tempInput);
    tempInput.select(); // 选择对象
    this.doc.execCommand('Copy'); // 执行浏览器复制命令
    tempInput.style.display = 'none';
    this.doc.body.removeChild(tempInput);
    this.msgs = [{ severity: 'success', summary: 'Copy success', detail: 'The data has been successfully copied to the clipboard.' }];
  }
}
