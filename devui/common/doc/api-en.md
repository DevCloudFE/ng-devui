# How to use

Import into module:

```ts
import { DCommonModule } from 'ng-devui/common';
```

If you need to use HelperUtils，then import:

```ts
import { HelperUtils } from 'ng-devui';
```

In the page:

```html
<!-- LazyLoad -->
<ul dLazyLoad enableLazyLoad="true" (loadMore)="YourOwnFunction($event)"></ul>

<!-- AutoFocus, div tag can be replaced with any kind of tag you want -->
<div [dAutoFocus]="true"></div>

<!-- DatePipe -->
<div>
  <p>{{ date | dDatePipe: 'y-MM-dd' }}</p>
</div>

<!-- SimulateATag -->
<button dSimulateATag [href]="'https://angular.io'" [target]="'_blank'"></button>

<!-- IframeEventPropagate -->
<div class="host-box" (click)="hostClick($event)" dIframeEventPropagate>
  <div><p>Parent container</p></div>
  <iframe class="content-box"></iframe>
</div>

<!-- Clipboard -->
<input dTextInput type="text" [(ngModel)]="value" placeholder="Press button to copy the content" />
<button class="icon icon-copy" type="button" dClipboard [content]="value" (copyResultEvent)="copyResultEvent($event)"></button>
```

## dLazyLoad

### dLazyLoad Parameters

| Parameter      | Type                     | Default    | Description                                                 | Jump to Demo                         | Global Config |
| -------------- | ------------------------ | ---------- | ----------------------------------------------------------- | ------------------------------------ | ------------- |
| enableLazyLoad | `boolean`                | false      | Optional. Whether to use lazyload                           | [Lazyload Directive](demo#lazy-load) |
| target         | `HTMLElement`            | host       | Optional. Indicates the target of the scrolling monitoring. | [Lazyload Directive](demo#lazy-load) |
| direction      | `vertical \| horizontal` | 'vertical' | Optional. Scrolling direction.                              |                                      |

### dLazyLoad Event

| Parameter | Type                          | Description                                        | Jump to Demo                         |
| --------- | ----------------------------- | -------------------------------------------------- | ------------------------------------ |
| loadMore  | `EventEmitter< HTMLElement >` | Required. Trigger the lazy loading response event. | [Lazyload Directive](demo#lazy-load) |

## dAutoFocus

Automatic focus.

## dDatePipe

Date parsing. Since the date pipe provided by Angular has some compatibility issues with IE, this component library provides a set of date-fns-based pipe to provide maximum compatibility.

The formatting format is slightly different from the format provided by the Angular. The format is as follows:

<table>
  <thead>
    <tr>
      <th>Unit</th>
      <th>Token</th>
      <th>Result examples</th>
      <th>Jump to demo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">Year</td>
      <td>y</td>
      <td>2, 20, 201, 2017, 20173</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>yy</td>
      <td>02, 20, 01, 17, 73</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>yyy</td>
      <td>002, 020, 201, 2017, 20173</td>
      <td></td>
    </tr>
    <tr>
      <td>yyyy</td>
      <td>0002, 0020, 0201, 2017, 20173</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td rowspan="5">Month</td>
      <td>M</td>
      <td>1, 2, ..., 12</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>MM</td>
      <td>01, 02, ..., 12</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>MMM</td>
      <td>Jan, Feb, ..., Dec</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>MMMM</td>
      <td>January, February, ..., December</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>MMMMM</td>
      <td>J, F, ..., D</td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="5">Month standalone</td>
      <td>L</td>
      <td>9, 12</td>
      <td></td>
    </tr>
    <tr>
      <td>LL</td>
      <td>09, 12</td>
      <td></td>
    </tr>
    <tr>
      <td>LLL</td>
      <td>Sep</td>
      <td></td>
    </tr>
    <tr>
      <td>LLLL</td>
      <td>September</td>
      <td></td>
    </tr>
    <tr>
      <td>LLLLL</td>
      <td>S</td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="2">Week of year</td>
      <td>w</td>
      <td>1... 53</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>ww</td>
      <td>01... 53</td>
      <td></td>
    </tr>
    <tr>
      <td>Week of month</td>
      <td>W</td>
      <td>1... 5</td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="2">Day of month</td>
      <td>d</td>
      <td>1, 2, ..., 31</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>dd</td>
      <td>01, 02, ..., 31</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td rowspan="4">Week day</td>
      <td>E, EE &amp; EEE</td>
      <td>Tue</td>
      <td></td>
    </tr>
    <tr>
      <td>EEEE</td>
      <td>Tuesday</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>EEEEE</td>
      <td>T</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>EEEEEE</td>
      <td>Tu</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td rowspan="2">AM/PM</td>
      <td>a</td>
      <td>am, pm</td>
      <td></td>
    </tr>
    <tr>
      <td>aa</td>
      <td>a.m., p.m.</td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="4">Hour</td>
      <td>H</td>
      <td>0, 1, ... 23</td>
      <td></td>
    </tr>
    <tr>
      <td>HH</td>
      <td>00, 01, ... 23</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>h</td>
      <td>1, 2, ..., 12</td>
      <td></td>
    </tr>
    <tr>
      <td>hh</td>
      <td>01, 02, ..., 12</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td rowspan="2">Minute</td>
      <td>m</td>
      <td>0, 1, ..., 59</td>
      <td></td>
    </tr>
    <tr>
      <td>mm</td>
      <td>00, 01, ..., 59</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td rowspan="2">Second</td>
      <td>s</td>
      <td>0, 1, ..., 59</td>
      <td></td>
    </tr>
    <tr>
      <td>ss</td>
      <td>00, 01, ..., 59</td>
      <td><a href="/components/en-us/common/demo#date-pipe">DatePipe</a></td>
    </tr>
    <tr>
      <td>1/10 of second</td>
      <td>S</td>
      <td>0, 1, ..., 9</td>
      <td></td>
    </tr>
    <tr>
      <td>1/100 of second</td>
      <td>SS</td>
      <td>00, 01, ..., 99</td>
      <td></td>
    </tr>
    <tr>
      <td>Millisecond</td>
      <td>SSS</td>
      <td>000, 001, ..., 999</td>
      <td></td>
    </tr>
    <tr>
      <td rowspan="2">Timezone</td>
      <td>Z</td>
      <td>-01:00, +00:00, ... +12:00</td>
      <td></td>
    </tr>
    <tr>
      <td>ZZ</td>
      <td>-0100, +0000, ..., +1200</td>
      <td></td>
    </tr>
    <tr>
      <td>Seconds timestamp</td>
      <td>X</td>
      <td>512969520</td>
      <td></td>
    </tr>
    <tr>
      <td>Milliseconds timestamp</td>
      <td>x</td>
      <td>512969520900</td>
      <td></td>
    </tr>
  </tbody>
</table>

## HelperUtils Static Methods

### getBrowserName() => void

Method description: Obtains the current browser name (`IE`|`ClassicEdge`|`Firefox`|`Opera`|`Edge`|`Chrome`|`Safari`|`Other`)

### getBrowserVersion() => void

Method description: Obtaining the Current Browser Version (Major Version)

### jumpOuterUrl(url: string, target?: string) => void

Method description: This method is used to redirect to an external URL. The router.navigate cannot be redirected to an external system. Window.open is blocked by the browser. This method uses the a tag to simulate the jump.

| Parameter | Type                        | Default   | Description                                      | Jump to Demo                      |
| --------- | --------------------------- | --------- | ------------------------------------------------ | --------------------------------- |
| url       | `string`                    | --        | Required. Redirected URL                         |
| target    | [`TargetType`](#targettype) | '\_black' | Optional. Specifies the target of the hyperlink. | [Helper Utils](demo#helper-utils) |

### downloadFile(url: string, options?: [DownloadOptionsType](#downloadoptionstype), onError?: (response) => void)

Method description: This method is used to download a file without refreshing the page or pop-up window. Implementation Principle Uses hidden iframes and forms to submit data, which is mainly used for post requests. It can also be used for get requests. It is recommended that the a tag and the download attribute be used for get requests.

Note: The browsers use different default opening modes for different types of files. To trigger download, specify Content-Disposition: attachment in the header of the returned file stream response packet. filename=File name.Suffix.

| Parameter         | Type                               | Default                             | Description                                                                                                                                                                                                                                                                                                                     | Jump to Demo                      |
| ----------------- | ---------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- |
| url               | `string`                           | --                                  | Required. File address to be downloaded, corresponding to the action of the form.                                                                                                                                                                                                                                               |
| option            | `Object`                           | --                                  | Optional.                                                                                                                                                                                                                                                                                                                       |
| option.method     | `'POST'\| 'GET' \|'post' \| 'get'` | 'post'                              | Optional.                                                                                                                                                                                                                                                                                                                       | [Helper Utils](demo#helper-utils) |
| option.params     | `Object`                           | --                                  | Optional. The left value type of a parameter object is string, and the right value type of a parameter object is string. Indicates the form field. When the method type is GET/get, parameters are combined to the URL. When the method type is POST/post, parameters are combined to the payload.                              | [Helper Utils](demo#helper-utils) |
| option.enctype    | [`EncType`](#enctype)              | 'application/x-www-form-urlencoded' | Optional. Corresponding to the enctype field in the form.                                                                                                                                                                                                                                                                       |
| option.iframename | `string`                           | 'download'                          | Optional. Specifies the iframe name to prevent conflicts with other iframe names.                                                                                                                                                                                                                                               |
| onError           | `(response: any) => void`          | --                                  | Optional. It is used for callback when the download fails. The type is (response) => void. The parameter response indicates the error information returned by the request. The response attempts to convert the returned information to JSON. If the download fails, the textContent of the original returned data is returned. |

### downloadFileByHttpClient(httpClient: HttpClient, url: string, options?: [ClientDownloadOptions](#clientdownloadoptions), onError?: (response) => void, onSuccess?: (response) => void)

Method description: This method is used to download files without refreshing the page or pop-up window. Implementation Principle: The HTTP client submits a binary stream to obtain the downloaded file and triggers the download. This is mainly used for post requests. It can also be used for get requests. It is recommended that the a tag and the download attribute be used for get requests.

Note: The browsers use different default opening modes for different types of files. To trigger download, specify Content-Disposition: attachment for the header of the returned file stream response packet. filename=File name.Suffix.

| Parameter                               | Type                                       | Default                               | Description                                                                                                                                                                                                                                                                                                                                                                                             | Jump to Demo |
| --------------------------------------- | ------------------------------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| httpClient                              | `HttpClient`                               | --                                    | Required. HTTP client that provides ingestion. For details, see Remarks 1.                                                                                                                                                                                                                                                                                                                              |
| url                                     | `string`                                   | --                                    | Required. File download address.                                                                                                                                                                                                                                                                                                                                                                        |
| option                                  | `Object`                                   | {}                                    | Optional.                                                                                                                                                                                                                                                                                                                                                                                               |
| option.method                           | `'POST'\| 'GET' \|'post' \| 'get'`         | 'post'                                | Optional.                                                                                                                                                                                                                                                                                                                                                                                               |
| option.params                           | `Object`                                   | --                                    | Optional. The left value type of the parameter object is string, and the right value type of the parameter object is string. Indicates the form field. When the method type is GET/get, parameters are combined to the URL. When the method type is POST/post, parameters are combined to the payload.                                                                                                  |
| option.enctype                          | `enctype`                                  | \'application/x-www-form-urlencoded\' | Optional. Corresponding to the enctype field in the form.                                                                                                                                                                                                                                                                                                                                               |
| option.header                           | `Object`                                   | --                                    | Optional. This parameter is used to set the request header. The object of the key-value pair is used to set the header value. The left value is the key of the header option, and the right value is the value of the header option, for example, `{'X-lang':'en'}`.                                                                                                                                    |
| option.responseOption                   | `response' \| 'body' \| 'json'`            | 'json'                                | Optional. This parameter is used to specify the default format returned when the format fails to be processed. If the format fails to be processed, the format will be degraded.                                                                                                                                                                                                                        |
| option.filename                         | `string`                                   | --                                    | Optional. This parameter is not set by default. It is set to a configuration item first, obtained from filename specified in Content-Type in the response header, and then obtained from the access path.                                                                                                                                                                                               |
| option.withCredentials                  | `boolean`                                  | false                                 | Optional. Indicates whether to enable xhr.withCredentials when HTTP interfaces are invoked.                                                                                                                                                                                                                                                                                                             |
| option.reportProgress                   | `boolean`                                  | false                                 | is optional. The default value is flase. It indicates whether to monitor the download progress. If it is set to true, the onProgress method can be used to monitor the download progress.                                                                                                                                                                                                               |
| option.downloadWithoutDispositionHeader | `boolean`                                  | false                                 | Optional. Content-Disposition: attachment is required in the request header by default. Otherwise, an error occurs in the non-file stream. If this parameter is set to true, the returned response is forcibly returned when the HTTP code in the response header is 2xx.                                                                                                                               |
| onError                                 | `(res: any) => void`                       | --                                    | Optional. It is used for callback when the download fails. The type is (response) => void. The parameter response indicates the error information returned by the request. The response attempts to convert the returned information to JSON. If the download fails, the textcontent of the original returned data is returned. The value is the same as that of downloadFile.                          |
| onSuccess                               | `(res: HttpResponse<ArrayBuffer>) => void` | --                                    | Optional. It is used to call back the download success. The type is (response) => void. The parameter response indicates the entire HTTP information returned by the request. The loading type of the body in the response is ArrayBuffer. The body is the downloaded file stream. Therefore, the body is not converted to JSON or attempted to parse the body as text. This is different from onError. |
| onProgress                              | `(res: HttpProgressEvent) => void`         | --                                    | is optional. It is used to call back the download progress event. The type is (response) => void. The parameter response is the download progress information returned by the request. The loading type of the response is blob.                                                                                                                                                                        |

How to get httpClient instance:

```ts
constructor(private httpClient: HttpClient) {}
```

Internet Explorer 11 does not have TextDecoder. If downloadFileByHttpClient is used, failure information needs to be processed and texts that are not supported by Uint8 encoding, such as Chinese, need to be supported in Internet Explorer 11. In this case, the polyfill.ts file contains the following code: Otherwise, garbled characters are displayed in Internet Explorer 11.

```ts
// polyfill for TextDecoder on IE 11
import 'fastestsmallesttextencoderdecoder';
```

### dSimulateATag

- Instruction description: The jumpOuterUrl method of HelperUtils is used to simulate the a tag.

| Parameter | Type                        | Default   | Description                                      | Jump to Demo |
| --------- | --------------------------- | --------- | ------------------------------------------------ | ------------ |
| href      | `string`                    | --        | Required. Redirection URL.                       |
| target    | [`TargetType`](#targettype) | '\_blank' | Optional. Specifies the target of the hyperlink. |

### dIframeEventPropagate

Usage: Add the instruction to the ancestor element of the iframe to pass the mouse event (click event by default) of the iframe to the ancestor element.

| Parameter | Type   | Default | Description                                                                      | Jump to Demo                                        |
| --------- | ------ | ------- | -------------------------------------------------------------------------------- | --------------------------------------------------- |
| event     | string | 'click' | Optional. The value is the type of MouseEvent. Indicates the pop-up mouse event. | [Iframe Event Propagate API](demo#iframe-propagate) |

## dClipboard

Instruction description: This command is used to copy a specified text to the clipboard. After the copy is successful, the popover message is displayed.

| Parameter  | Type                                             | Default | Description                                                                                                                                                                    | Jump to Demo                                  |
| ---------- | ------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| content    | `string`                                         | --      | Required. Copied text content.                                                                                                                                                 | [Copy to Clipboard Directive](demo#clipboard) |
| position   | [`PositionType \| PositionType[]`](#positontype) | 'top'   | Optional. If the copy is successful, the pop-up direction is displayed. If the array format is input, a direction is automatically selected based on the input array sequence. | [Copy to Clipboard Directive](demo#clipboard) |
| sticky     | `boolean`                                        | false   | Optional. The message will not disappear after being popped up until you click another position on the page. By default, the message disappears after 3 seconds.               | [Copy to Clipboard Directive](demo#clipboard) |
| tipContent | `string\|HTMLElement\|TemplateRef`               | --      | Optional. Display content or template index displayed when a copy is successful.                                                                                               | [Copy to Clipboard Directive](demo#clipboard) |

### dClipboard event

| Event           | Type                                      | Description                                                                                                                                 | Jump to Demo                                  |
| --------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| copyResultEvent | [`EventEmitter<CopyResult>`](#copyresult) | Event sent after copying. If the copy operation is not supported, isSupported is false, which can be used to prompt users to copy the data. | [Copy to Clipboard Directive](demo#clipboard) |

## Interface & Type Definition

### DownloadOptionsType

```ts
export interface DownloadOptionsType {
  method?: 'POST' | 'GET' | 'post' | 'get';
  params?: { [property: string]: string };
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
  iframename?: string;
}
```

### ClientDownloadOptions

```ts
export interface ClientDownloadOptions {
  method?: 'POST' | 'GET' | 'post' | 'get';
  params?: { [property: string]: string };
  enctype?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
  header?: {
    [header: string]: string | string[];
  };
  responseOption?: 'response' | 'body' | 'json';
  filename?: string;
  withCredentials?: boolean;
  downloadWithoutDispositionHeader?: boolean;
}
```

### PositionType

```ts
export type PositionType = 'top' | 'right' | 'bottom' | 'left';
```

### TargetType

```ts
export type TargetType = '_blank' | '_self' | '_parent' | '_top' | ;
```

### EncType

```ts
export type EncType = 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text-plain';
```

### CopyResult

```ts
export interface CopyResult {
  isSupported: boolean;
  isSucceeded: boolean;
  content: string;
}
```

### HttpProgressEvent

```typescript
interface HttpProgressEvent {
  type: HttpEventType.DownloadProgress | HttpEventType.UploadProgress;
  loaded: number;
  total?: number;
}
```
