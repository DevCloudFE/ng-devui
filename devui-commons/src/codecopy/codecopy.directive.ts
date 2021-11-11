import { AfterViewInit, Directive, ElementRef, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { fromEvent, Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DevuiCommonsService } from '../../src/devui-commons.service';
import { I18nUtil } from '../i18n/i18n.util';
import { ReadTipOption, StrCopySVG } from './codecopy.types';
@Directive({
  selector: '[dCodeCopy]',
})
export class CodeCopyDirective implements OnInit, AfterViewInit, OnDestroy {
  @Output('copied') copied: EventEmitter<any> = new EventEmitter<any>();
  private destroy$ = new Subject();
  timer: any;
  optionsSuccess = ReadTipOption.optionSuccessData['zh-cn'];
  options = ReadTipOption.optionData['zh-cn'];

  subs: Subscription = new Subscription();
  curLanguage: string;
  constructor(private hostElementRef: ElementRef, private commonsService: DevuiCommonsService) {}

  ngOnInit() {
    this.curLanguage = I18nUtil.getCurrentLanguage();
    this.subs = this.commonsService.on('languageEvent').subscribe((term) => this.changeLanguage(term));
    this.setOption(this.curLanguage);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.subs.unsubscribe();
  }

  ngAfterViewInit() {
    this.setOption(this.curLanguage);
    this.addCodeCopy();
  }

  changeLanguage(lang) {
    this.curLanguage = lang;
    this.setOption(lang);
    setTimeout(() => {
      this.addCodeCopy();
    });
  }

  setOption(lang) {
    this.options = ReadTipOption.optionData[lang];
    this.optionsSuccess = ReadTipOption.optionSuccessData[lang];
  }

  addCodeCopy() {
    setTimeout(() => {
      const codeElements = this.hostElementRef.nativeElement.querySelectorAll('pre code');
      this.copied.emit(this.options);
      codeElements.forEach((ele) => {
        const preEle = ele.parentElement;
        preEle.style.position = 'relative';
        preEle.classList.add('d-md-code-pre');
        const copySpanEle = document.createElement('span');
        copySpanEle.classList.add('d-md-pre-copy');
        copySpanEle.innerHTML = StrCopySVG.CopySVG;
        preEle.appendChild(copySpanEle);
      });
    }, 10);

    fromEvent(document.querySelector('.devui-content-layout'), 'click')
      .pipe(takeUntil(this.destroy$))
      .subscribe(($event) => {
        const nowElement = $event.target as HTMLElement;
        if (nowElement.classList.contains('devui-api-code-copy')) {
          const spanElement = nowElement.parentElement;
          if (spanElement) {
            const codeText = spanElement.parentElement.querySelector('code').textContent;
            this.copy(codeText);
            spanElement.innerHTML = StrCopySVG.CopySuccessSVG;
            this.copied.emit(this.optionsSuccess);
            this.timer = setTimeout(() => {
              spanElement.innerHTML = StrCopySVG.CopySVG;
              this.copied.emit(this.options);
            }, 1000);
          }
        }
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
}
