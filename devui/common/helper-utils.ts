import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Directive, HostListener, Input } from '@angular/core';

declare type HttpObserve = 'body' | 'events' | 'response';
declare type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';
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

  static downloadFileByHttpClient(
    httpClient: HttpClient,
    url: string,
    option?: {
      method?: 'POST' | 'GET' | 'post' | 'get',
      params?: {[property: string]: string},
      enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain',
      header?: {
        [header: string]: string | string[];
      },
      responseOption?: 'response' | 'body' | 'json',
      filename?: string,
      withCredentials?: boolean,
      downloadWithoutDispositionHeader?: boolean
    },
    onError?: (response) => void,
    onSuccess?: (response) => void,
  ) {

    const requestMethod = option && option.method && option.method.toLowerCase() || 'post';
    const requestHeaderContentType = option.enctype || 'application/x-www-form-urlencoded';
    const requestParams = option.params ? new HttpParams({
      fromObject: option.params
    }) : null;

    const requestUrl = url;
    const requestOptionParams = requestMethod === 'get' ? requestParams : undefined;
    const requestBody = requestMethod === 'post' ? requestParams && requestParams.toString() : undefined;

    const responseOption = option.responseOption;

    const requestOption = Object.assign({}, {
      body: requestBody,
      observe: 'response' as HttpObserve,
      params: requestOptionParams,
      headers: {
        'Content-Type': requestHeaderContentType
      },
      responseType: 'arraybuffer' as ResponseType
    }, {
      headers: option.header
    });

    const handleResponse = (resOption => {
      switch (resOption) {
        case 'response':
          return (res: HttpResponse<ArrayBuffer>) => res;
        case 'body':
          return (res: HttpResponse<ArrayBuffer> | HttpErrorResponse) => {
            const arrayBuffer = <ArrayBuffer>(<HttpResponse<ArrayBuffer>>res).body || (<HttpErrorResponse>res).error;
            const body = HelperUtils.utf8ArrayToStr(arrayBuffer);
            return body;
          };
        case 'json':
        default:
          return (res: HttpResponse<ArrayBuffer> | HttpErrorResponse) => {
            const arrayBuffer = <ArrayBuffer>(<HttpResponse<ArrayBuffer>>res).body || (<HttpErrorResponse>res).error;
            let response;
            try {
              const body = HelperUtils.utf8ArrayToStr(arrayBuffer);
              try {
                response = JSON.parse(body);
              } catch (e) {
                const parser = new DOMParser();
                const html = parser.parseFromString(body, 'text/html');
                response = html.body.textContent;
              }
            } catch (e) {
              throw new Error('Parsing Error:' + e);
            }
            if (!response) {
                response = 'Error';
            }
            return response;
          };
      }
    })(responseOption);

    const downloadFileFromArrayBuffer = (data: ArrayBuffer, filename: string, contentType: string) => {
      if (window.navigator && window.navigator.msSaveOrOpenBlob) { // IE11 support
          const blob = new Blob([data], {type: contentType});
          window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {// other browsers
          if ('download' in document.createElement('a')) {
            const blob = new Blob([data], {type: contentType});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
          } else {
            // not support tag a download attribute use file download, filename won't support
            const file = new File([data], filename, {type: contentType});
            const exportUrl = URL.createObjectURL(file);
            window.location.assign(exportUrl);
            URL.revokeObjectURL(exportUrl);
          }
      }
    };

    const getFilenameFromDisposition = (disposition: string) => {
      const filenamePair =  disposition.split(';').filter(str => /^filename=/.test(str.trim())).pop();
      if (filenamePair) {
        let str = filenamePair.trim();
        str = str.split('=')[1];
        str = str.replace(/['"]/g, '');
        return decodeURIComponent(str);
      } else {
        return null;
      }
    };

    httpClient.request(requestMethod, requestUrl, requestOption).subscribe((res: HttpResponse<any>) => {
      const disposition = (<HttpHeaders>res.headers).get('content-disposition');
      const contentType = (<HttpHeaders>res.headers).get('content-type');
      if (/^attachment/i.test(disposition) || option.downloadWithoutDispositionHeader) {
        const downloadFilename = option.filename || disposition && getFilenameFromDisposition(disposition) || url ;
        downloadFileFromArrayBuffer(res.body, downloadFilename, contentType);
        if (onSuccess) {
          onSuccess(res);
        }
      } else {
        if (onError) {
          let response;
          try {
            response = handleResponse(res);
          } catch (e) {
            response = res;
          }
          onError(response);
        }
      }

    }, err => {
      if (onError) {
        let response;
        try {
          response = handleResponse(err);
        } catch (e) {
          response = err;
        }
        onError(response);
      }
    });
  }

  private static utf8ArrayToStr(arrayBuffer) {
    if (typeof TextDecoder !== 'undefined') {
      return new TextDecoder('utf-8').decode(arrayBuffer);
    } else {
      /**
       * fallback 方案，无TextDecoder场景使用直接解析，英文无问题，中文会存在乱码
       * ie 11 下支持中文需要使用MDN推荐的 fastestsmallesttextencoderdecoder以支持TextDecoder
       * npm install fastestsmallesttextencoderdecoder
       * polyfill.ts includes
       * ```
       * // polyfill for TextDecoder on IE 11
       * import 'fastestsmallesttextencoderdecoder';
       * ```
       */
      return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
    }
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
