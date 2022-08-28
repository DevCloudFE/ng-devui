import { Component, ElementRef, Inject, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DevuiOnlineIdeService } from '../devui-online-ide/devui-online-ide.service';
import { DevuiSourceData } from './devui-source-data';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'd-codebox',
  templateUrl: './devui-codebox.component.html',
  styleUrls: ['./devui-codebox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
})
export class DevuiCodeboxComponent implements OnInit {
  _copied = false;

  @Input() sourceData: Array<DevuiSourceData>;

  componentCode: Array<any>;
  expanded = false;
  codeTabID: string | number = 'HTML';
  document: Document;

  copyCode(code) {
    this.copy(code).then(() => {
      this._copied = true;
      setTimeout(() => {
        this._copied = false;
      }, 1000);
    });
  }

  copy(value: string): Promise<string> {
    const promise = new Promise<string>((resolve, reject): void => {
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
    });

    return promise;
  }

  toggleCode() {
    this.expanded = !this.expanded;
  }

  openOnlineIDE(ide: 'StackBlitz' | 'CodeSandbox' = 'StackBlitz'): void {
    if (ide === 'StackBlitz') {
      this.onlineIdeService.openOnStackBlitz(this.sourceData);
    } else {
      this.onlineIdeService.openOnCodeSandbox(this.sourceData);
    }
  }

  constructor(private _el: ElementRef, private onlineIdeService: DevuiOnlineIdeService, @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }

  ngOnInit() {}
}
