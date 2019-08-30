import { Component, OnInit, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import { DevuiSourceData } from './devui-source-data';

@Component({
  selector: 'd-codebox',
  templateUrl: './devui-codebox.component.html',
  styleUrls: ['./devui-codebox.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DevuiCodeboxComponent implements OnInit {
  _copied = false;

  @Input() sourceData: Array<DevuiSourceData>;

  componentCode: Array<any>;
  expanded = false;
  codeTabID = 'HTML';

  copyCode(code) {
    this.copy(code).then(() => {
      this._copied = true;
      setTimeout(() => {
        this._copied = false;
      }, 1000);
    });
  }

  copy(value: string): Promise<string> {

    const promise = new Promise<string>(
      (resolve, reject): void => {
        let copyTextArea = null as HTMLTextAreaElement;
        try {
          copyTextArea = document.createElement('textarea');
          copyTextArea.style.height = '0px';
          copyTextArea.style.opacity = '0';
          copyTextArea.style.width = '0px';
          document.body.appendChild(copyTextArea);
          copyTextArea.value = value;
          copyTextArea.select();
          document.execCommand('copy');
          resolve(value);
        } finally {
          if (copyTextArea && copyTextArea.parentNode) {
            copyTextArea.parentNode.removeChild(copyTextArea);
          }
        }
      }
    );

    return ( promise );

  }

  toggleCode() {
    this.expanded = !this.expanded;
  }

  constructor(private _el: ElementRef) {
  }

  ngOnInit() {
  }

}
