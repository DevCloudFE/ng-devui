import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEVUI_LANG } from 'ng-devui/i18n';
import { Theme, ThemeService } from 'ng-devui/theme';
import { CustomThemeService } from './custom-theme.service';

@Component({
  selector: 'd-theme-picker-customize',
  templateUrl: './customize-theme.component.html',
  styleUrls: ['./customize-theme.component.scss'],
})
export class CustomizeThemeComponent implements OnInit {
  document: Document;

  constructor(private cts: CustomThemeService,
              private route: Router, @Inject(DEVUI_LANG) private appLang,
              @Inject(DOCUMENT) private doc: any) {
    this.document = this.doc;
  }
  themeService: ThemeService;
  customDark = false;

  backgroundColor = '#0080ff';

  refreshSignal: boolean;
  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.themeService = window['devuiThemeService'];
      this.getCustomConfigColor();
    }
  }
  customApplyTheme() {
    this.themeService.applyTheme(new Theme({
      id: `customize-theme-${this.backgroundColor}`,
      name: 'test',
      cnName: '测试',
      data: this.cts.genThemeData([
        {
          colorName: 'devui-brand',
          color: this.backgroundColor
        }
      ], this.customDark, 'hsl'),
      isDark: this.customDark
    }));
    localStorage.setItem('user-custom-theme-config', JSON.stringify({brand: this.backgroundColor, isDark: this.customDark}));
  }
  getCustomConfigColor() {
    if (localStorage.getItem('user-custom-theme-config')) {
      const {brand, isDark} =  JSON.parse(localStorage.getItem('user-custom-theme-config'));
      if (brand) {
        this.backgroundColor = brand;
        this.customDark = isDark;
      }
    }

  }

  setColor(color) {
    this.backgroundColor = color;
    this.customApplyTheme();
  }

  refreshColorPicker($event) {
    this.refreshSignal = $event;
  }
  goto() {
    const currentLang = localStorage.getItem('lang') || this.appLang;
    this.route.navigateByUrl(`/components/${currentLang}/theme-guide`);
  }

  download() {
    const content = `import { Theme } from 'ng-devui/theme';
export const myTheme: Theme = new Theme({
  id: 'customize-theme-${this.backgroundColor}',
  name: 'myTheme',
  data: ${JSON.stringify(
    this.cts.genThemeData([
      {
        colorName: 'devui-brand',
        color: this.backgroundColor
      }
    ], this.customDark, 'hsl'),
    null, 2).replace(/"/g, '\'')},
  isDark: ${this.customDark ? 'true' : 'false'}
});
`;
    this.downloadFileFromArrayBuffer(this.str2ab(content), 'my-theme.ts', 'text/plain; charset=UTF-8');
  }

  str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
  downloadFileFromArrayBuffer = (data: ArrayBuffer, filename: string, contentType: string) => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window.navigator && window.navigator['msSaveOrOpenBlob']) { // IE11 support
      const blob = new Blob([data], { type: contentType });
      window.navigator['msSaveOrOpenBlob'](blob, filename);
    } else {// other browsers
      if ('download' in this.document.createElement('a')) {
        const blob = new Blob([data], { type: contentType });
        const link = this.document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        this.document.body.appendChild(link);
        link.click();
        this.document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      } else {
        // not support tag a download attribute use file download, filename won't support
        const file = new File([data], filename, { type: contentType });
        const exportUrl = URL.createObjectURL(file);
        window.location.assign(exportUrl);
        URL.revokeObjectURL(exportUrl);
      }
    }
  };
}
