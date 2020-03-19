import { Directive, HostListener, Input, Output, EventEmitter } from '@angular/core';

export class HelperUtils {
  static jumpOuterUrl(url, target = '_blank') {
       if (url !== undefined) {
          const tempLink = document.createElement('a');
          tempLink.style.display = 'none';     // for IE 11
          tempLink.target = target;
          tempLink.href = url;
          document.body.appendChild(tempLink); // for IE 11, IE11需要append到document.body里面的a链接才会生效
          const event = document.createEvent('MouseEvents');
          event.initEvent('click', false, true);
          tempLink.dispatchEvent(event);
          document.body.removeChild(tempLink); // for IE 11
      }
  }

  static downloadFile(
      url: string,
      option?: {
          method?: 'POST'| 'GET' | 'post' | 'get',
          params?: {[property: string]: string},
          enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data'| 'text/plain',
          iframename?: string
      },
      onError?: (response) => void
  ) {
      if (document.querySelector('iframe[name=' + (option && option.iframename || 'download') + ']')) {
        document.body.removeChild(document.querySelector('iframe[name=' + (option && option.iframename || 'download') + ']'));
      }
      const tempiframe = document.createElement('iframe');
      tempiframe.name = option && option.iframename || 'download';
      tempiframe.style.display = 'none';

      const tempform = document.createElement('form');
      tempform.action = url;
      tempform.method = option && option.method || 'post';
      tempform.target = option && option.iframename || 'download';
      tempform.enctype = option && option.enctype || 'application/x-www-form-urlencoded';
      tempform.style.display = 'none';

      if (option && option.params) {
          Object.keys(option.params).forEach(key => {
              const opt = document.createElement('input');
              opt.name = key;
              opt.value = option.params[key];
              tempform.appendChild(opt);
          });
      }

      const submit = document.createElement('input');
      submit.type = 'submit';

      tempform.appendChild(submit);
      tempiframe.appendChild(tempform);
      document.body.appendChild(tempiframe);

      // 下载错误处理。下载成功并不会响应，因为响应头中带有Content-Disposition（下载头）的url，无法监听iframe的load事件，load事件不会触发
      tempiframe.addEventListener('load', (event) => {
            try {
                const iframeDoc =  tempiframe.contentDocument;
                if (onError !== undefined) {
                    let response;
                    try {
                      response = JSON.parse(iframeDoc.body && iframeDoc.body.textContent);
                    } catch (e) {
                      response = iframeDoc.body && iframeDoc.body.textContent;
                    }
                    if (!response) {
                        response = 'Error';
                    }
                    onError(response);
                }
            } catch (e) {
                onError('Error');
            }
            document.body.removeChild(tempiframe);
      });
      tempform.submit();
  }
}

@Directive({
  selector: '[dSimulateATag]'
})
export class SimulateATagDirective {
    @Input() href: string;
    @Input() target: '_blank' | '_self' | '_parent' | '_top' | string   = '_blank';
    constructor() {}
    @HostListener('click') onClick() {
        HelperUtils.jumpOuterUrl(this.href, this.target);
    }
}



