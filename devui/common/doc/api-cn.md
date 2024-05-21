# 如何使用

在 module 中引入：

```ts
import { DCommonModule } from 'ng-devui/common';
```

如果你需要使用到 dLazyLoad，则引入：

```ts
import { LazyLoadModule } from 'ng-devui/utils';
```

如果你需要使用到 HelperUtils，则引入：

```ts
import { HelperUtils } from 'ng-devui';
```

在页面中使用：

```html
<!-- LazyLoad -->
<ul dLazyLoad enableLazyLoad="true" (loadMore)="YourOwnFunction($event)"></ul>

<!-- AutoFocus, div tag can be replaced with any kind of tag you want -->
<div [dAutoFocus]="true"></div>

<!-- 日期解析器 -->
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
<input dTextInput type="text" [(ngModel)]="value" placeholder="请输入内容点击右侧按钮复制" />
<button class="icon icon-copy" type="button" dClipboard [content]="value" (copyResultEvent)="copyResultEvent($event)"></button>
```

## dLazyLoad

### dLzayLoad 参数

| 参数           | 类型                     | 默认       | 说明                   | 跳转 Demo                    | 全局配置项 |
| -------------- | ------------------------ | ---------- | ---------------------- | ---------------------------- | ---------- |
| enableLazyLoad | `boolean`                | false      | 可选，是否使用懒加载   | [懒加载指令](demo#lazy-load) |
| target         | `HTMLElement`            | 宿主       | 可选，滚动监听的目标。 | [懒加载指令](demo#lazy-load) |
| direction      | `vertical \| horizontal` | 'vertical' | 可选，懒加载滚动方向。 |                              |

## dLazyLoad 事件

| 参数     | 类型                          | 说明                     | 跳转 Demo                    |
| -------- | ----------------------------- | ------------------------ | ---------------------------- |
| loadMore | `EventEmitter< HTMLElement >` | 必选，触发懒加载响应事件 | [懒加载指令](demo#lazy-load) |

## dAutoFocus

自动聚焦。

## dDatePipe

解析日期，鉴于 angular 自带的 date pipe 在 IE 兼容性有些问题，故本组件库提供一套基于 date-fns 的 pipe，能提供最大的兼容性。

格式化格式与 angular 自带格式有略微不同，相关格式参考如下:

<table>
  <thead>
    <tr>
      <th>Unit</th>
      <th>Token</th>
      <th>Result examples</th>
      <th>跳转 demo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="4">Year</td>
      <td>y</td>
      <td>2, 20, 201, 2017, 20173</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
    </tr>
    <tr>
      <td>yy</td>
      <td>02, 20, 01, 17, 73</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
    </tr>
    <tr>
      <td>yyy</td>
      <td>002, 020, 201, 2017, 20173</td>
      <td></td>
    </tr>
    <tr>
      <td>yyyy</td>
      <td>0002, 0020, 0201, 2017, 20173</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
    </tr>
    <tr>
      <td rowspan="5">Month</td>
      <td>M</td>
      <td>1, 2, ..., 12</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
    </tr>
    <tr>
      <td>MM</td>
      <td>01, 02, ..., 12</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
    </tr>
    <tr>
      <td>MMM</td>
      <td>Jan, Feb, ..., Dec</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
    </tr>
    <tr>
      <td>MMMM</td>
      <td>January, February, ..., December</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
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
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
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
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
    </tr>
    <tr>
      <td>dd</td>
      <td>01, 02, ..., 31</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
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
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
    </tr>
    <tr>
      <td>EEEEE</td>
      <td>T</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
    </tr>
    <tr>
      <td>EEEEEE</td>
      <td>Tu</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
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
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
    </tr>
    <tr>
      <td>h</td>
      <td>1, 2, ..., 12</td>
      <td></td>
    </tr>
    <tr>
      <td>hh</td>
      <td>01, 02, ..., 12</td>
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
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
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
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
      <td><a href="/components/zh-cn/common/demo#date-pipe">日期解析器</a></td>
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

## HelperUtils 静态方法

### getBrowserName() => void

方法描述：获取当前浏览器名称（`IE`|`ClassicEdge`|`Firefox`|`Opera`|`Edge`|`Chrome`|`Safari`|`Other`）

### getBrowserVersion() => void

方法描述：获取当前浏览器版本（大版本号）

### jumpOuterUrl(url: string, target?: string) => void

方法描述：主要用于跳转到外部的 url。解决 router.navigate 无法跳转到外部， window.open 会被浏览器安全拦击。此方法使用了模拟了 a 标签的跳转。

| 参数   | 类型                        | 默认      | 说明                          | 跳转 Demo                     |
| ------ | --------------------------- | --------- | ----------------------------- | ----------------------------- |
| url    | `string`                    | --        | 必选，跳转的 url 地址。       |
| target | [`TargetType`](#targettype) | '\_black' | 可选，指定跳转超链接的 target | [公共函数](demo#helper-utils) |

### downloadFile(url: string, options?: [DownloadOptionsType](#downloadoptionstype), onError?: (response) => void)

方法描述：主要用于页面内无刷新无弹窗下载文件。实现原理利用隐藏的 iframe 和表单提交数据，主要用于 post 请求。也可用于 get 请求，get 请求推荐用 a 标签加 download 属性解决。

注意事项：浏览器对不同类型的默认打开方式不一致，如果要触发下载行为，请为返回的文件流响应包的头部指定"Content-Disposition: attachment; filename=文件名.后缀。

| 参数              | 类型                                | 默认                                | 说明                                                                                                                                                                              | 跳转 Demo                     |
| ----------------- | ----------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| url               | `string`                            | --                                  | 必选，下载的文件地址，对应表单的 action                                                                                                                                           |
| option            | `Object`                            | --                                  | 可选                                                                                                                                                                              |
| option.method     | `'POST'\| 'GET' \| 'post' \| 'get'` | 'post'                              | 可选                                                                                                                                                                              | [公共函数](demo#helper-utils) |
| option.params     | `Object`                            | --                                  | 可选，参数对象左值类型为 string，右值类型为 string。对应表单的表单域,method 类型为 GET/get 的时候，会将参数拼接到 url 上，method 类型为 POST/post 时候，参数会拼接才 payload 里。 | [公共函数](demo#helper-utils) |
| option.enctype    | [`EncType`](#enctype)               | 'application/x-www-form-urlencoded' | 可选，对应表单的 enctype 域                                                                                                                                                       |
| option.iframename | `string`                            | 'download'                          | 可选，指定 iframe 的名字，预防和其他 iframe 名字冲突                                                                                                                              |
| onError           | `(response: any) => void`           | --                                  | 可选，用于下载失败时候的回调，类型为 (response) => void, 参数 response 为请求返回的错误信息，response 试图将返回信息转为 json 如果失败则返回原返回数据的 textContent              |

### downloadFileByHttpClient(httpClient: HttpClient, url: string, options?: [ClientDownloadOptions](#clientdownloadoptions), onError?: (response) => void, onSuccess?: (response) => void)

方法描述：主要用于页面内无刷新无弹窗下载文件。实现原理 http 客户端网络提交获取下载文件二进制流并触发下载，主要用于 post 请求。也可用于 get 请求，get 请求推荐用 a 标签加 download 属性解决。

注意事项：浏览器对不同类型的默认打开方式不一致，如果要触发下载行为，请为返回的文件流响应包的头部指定"Content-Disposition: attachment; filename=文件名.后缀。

| 参数                                    | 类型                                       | 默认                                  | 说明                                                                                                                                                                                                                                    | 跳转 Demo |
| --------------------------------------- | ------------------------------------------ | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| httpClient                              | `HttpClient`                               | --                                    | 必选，提供注入的 http 客户端，见备注 1                                                                                                                                                                                                  |
| url                                     | `string`                                   | --                                    | 必选，下载的文件地址                                                                                                                                                                                                                    |
| option                                  | `Object`                                   | {}                                    | 可选                                                                                                                                                                                                                                    |
| option.method                           | `'POST'\| 'GET' \| 'post' \| 'get'`        | 'post'                                | 可选                                                                                                                                                                                                                                    |
| option.params                           | `Object`                                   | --                                    | 可选，参数对象左值类型为 string，右值类型为 string。对应表单的表单域,method 类型为 GET/get 的时候，会将参数拼接到 url 上，method 类型为 POST/post 时候，参数会拼接才 payload 里。                                                       |
| option.enctype                          | `enctype`                                  | \'application/x-www-form-urlencoded\' | 可选，类型为[['application/x-www-form-urlencoded' \| 'multipart/form-data'\| 'text/plain']], 对应表单的 enctype 域                                                                                                                      |
| option.header                           | `Object`                                   | --                                    | 可选，用于设置请求 header，使用键值对的 Object 设置 header 值，左值为 header 选项的 key，右值为 header 选项的 value， 如`{'X-lang': 'en'}`                                                                                              |
| option.responseOption                   | `'response' \| 'body' \| 'json'`           | 'json'                                | 可选用于指定失败时候返回的默认格式，若格式处理失败会降级返回                                                                                                                                                                            |
| option.filename                         | `string`                                   | --                                    | 可选，默认不需要设置，优先设置为配置项，其次会从响应头 Content-Type 指定的 filename 获取，再其次从访问路径获取                                                                                                                          |
| option.reportProgress                   | `boolean`                                  | false                                 | 可选，默认为 flase，是否监听下载的进度，设置为 true 是可以用 onProgress 方法监听下载进度                                                                                                                                                |
| option.withCredentials                  | `boolean`                                  | false                                 | 可选，调用 http 接口是否启用 xhr.withCredentials                                                                                                                                                                                        |
| option.downloadWithoutDispositionHeader | `boolean`                                  | false                                 | 可选，默认需要请求头标记 Content-Disposition: attachment 否则当作非文件流出错处理。 设置为 true，则返回响应头 http 码为成功（2xx）的情况下则强制将返回的 response                                                                       |
| onError                                 | `(res: any) => void`                       | --                                    | 可选，用于下载失败时候的回调，类型为 (response) => void, 参数 response 为请求返回的错误信息，response 试图将返回信息转为 json 如果失败则返回原返回数据的 textcontent，此处和 downloadFile 一致                                          |
| onSuccess                               | `(res: HttpResponse<ArrayBuffer>) => void` | --                                    | 可选，用于下载成功回调，类型为 (response) => void, 参数 response 为请求返回的整个 Http 信息，response 内 body 的加载类型为 ArrayBuffer。由于 body 为下载的文件流，故不会将 body 转为 json 或者试图解析 body 为文本，此处与 onError 不同 |
| onProgress                              | `(res: HttpProgressEvent) => void`         | --                                    | 可选，用于下载进度事件的回调，类型为 (response) => void, 参数 response 为请求返回的下载进度信息，response 的加载类型为 blob。                                                                                                           |

如何获取 httpClient 实例：

```typescript
constructor(private httpClient: HttpClient) {}
```

IE 11 无 TextDecoder，如果使用 downloadFileByHttpClient，需要处理失败信息, 且需要在 ie11 下支持中文等非 Uint8 编码支持的文本，请在 polyfill.ts 文件里包含以下代码，否则 ie11 下会出现中文乱码。

```ts
// polyfill for TextDecoder on IE 11
import 'fastestsmallesttextencoderdecoder';
```

### dSimulateATag

指令描述：使用了 HelperUtils 的 jumpOuterUrl 方法，实现模拟 a 标签。

| 参数   | 类型                        | 默认      | 说明                          | 跳转 Demo |
| ------ | --------------------------- | --------- | ----------------------------- | --------- |
| href   | `string`                    | --        | 必选，跳转的 url 地址         |
| target | [`TargetType`](#targettype) | '\_blank' | 可选，指定跳转超链接的 target |

### dIframeEventPropagate

使用方法：在 iframe 的祖先元素里添加该指令，将 iframe 的鼠标事件（默认为 click 事件）传递到该祖先元素。

| 参数  | 类型   | 默认    | 说明                                              | 跳转 Demo                                |
| ----- | ------ | ------- | ------------------------------------------------- | ---------------------------------------- |
| event | string | 'click' | 可选，值为 MouseEvent 的 type，指定冒泡的鼠标事件 | [iframe 冒泡事件](demo#iframe-propagate) |

## dClipboard

指令描述：用于复制指定文字内容到剪贴板，复制成功后弹出 popover 提示。

| 参数       | 类型                                             | 默认  | 说明                                                                                       | 跳转 Demo                          |
| ---------- | ------------------------------------------------ | ----- | ------------------------------------------------------------------------------------------ | ---------------------------------- |
| content    | `string`                                         | --    | 必选，复制的文字内容                                                                       | [复制到剪贴板指令](demo#clipboard) |
| position   | [`PositionType \| PositionType[]`](#positontype) | 'top' | 可选，复制成功提示弹出方向，如果传入数组形式，则当前将按照传入数组次序，自适应选取一个方向 | [复制到剪贴板指令](demo#clipboard) |
| sticky     | `boolean`                                        | false | 可选，提示弹出后是不消失，直到点击页面其他位置，默认弹出 3 秒后消失                        | [复制到剪贴板指令](demo#clipboard) |
| tipContent | `string \| HTMLElement \| TemplateRef`           | --    | 可选，复制成功弹出提示的显示内容或模板引                                                   | [复制到剪贴板指令](demo#clipboard) |

### dClipboard 事件

| 事件            | 类型                                      | 说明                                                                                 | 跳转 Demo                          |
| --------------- | ----------------------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------- |
| copyResultEvent | [`EventEmitter<CopyResult>`](#copyresult) | 复制后发出的事件，如果是不支持复制操作，isSupported 为 false，可用于提示用户自行复制 | [复制到剪贴板指令](demo#clipboard) |

## 接口 & 类型定义

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
