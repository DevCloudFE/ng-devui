**CommonModule**

本模块包含一些组件库中公用用的模块

###### **AutoFocus**

自动聚焦，目前仅 datatable 在使用

###### **DatePipe**

解析日期，鉴于 angular 自带的 date pipe 在 IE 兼容性有些问题，故本组件库提供一套基于 date-fns 的 pipe，能提供最大的兼容性。

格式化格式与 angular 自带格式有略微不同，相关格式参考如下:

| Unit                   | Token       | Result examples                  | 跳转 demo                                     |
| ---------------------- | ----------- | -------------------------------- | --------------------------------------------- |
| Year                   | y           | 2, 20, 201, 2017, 20173          | [DatePipe](/components/common/demo#date-pipe) |
|                        | yy          | 02, 20, 01, 17, 73               | [DatePipe](/components/common/demo#date-pipe) |
|                        | yyy         | 002, 020, 201, 2017, 20173       |                                               |
|                        | yyyy        | 0002, 0020, 0201, 2017, 20173    | [DatePipe](/components/common/demo#date-pipe) |
| Month                  | M           | 1, 2, ..., 12                    | [DatePipe](/components/common/demo#date-pipe) |
|                        | MM          | 01, 02, ..., 12                  | [DatePipe](/components/common/demo#date-pipe) |
|                        | MMM         | Jan, Feb, ..., Dec               | [DatePipe](/components/common/demo#date-pipe) |
|                        | MMMM        | January, February, ..., December | [DatePipe](/components/common/demo#date-pipe) |
|                        | MMMMM       | J, F, ..., D                     |                                               |
| Month standalone       | L           | 9, 12                            |                                               |
|                        | LL          | 09, 12                           |                                               |
|                        | LLL         | Sep                              |                                               |
|                        | LLLL        | September                        |                                               |
|                        | LLLLL       | S                                |                                               |
| Week of year           | w           | 1... 53                          | [DatePipe](/components/common/demo#date-pipe) |
|                        | ww          | 01... 53                         |                                               |
| Week of month          | W           | 1... 5                           |                                               |
| Day of month           | d           | 1, 2, ..., 31                    | [DatePipe](/components/common/demo#date-pipe) |
|                        | dd          | 01, 02, ..., 31                  | [DatePipe](/components/common/demo#date-pipe) |
| Week day               | E, EE & EEE | Tue                              |                                               |
|                        | EEEE        | Tuesday                          | [DatePipe](/components/common/demo#date-pipe) |
|                        | EEEEE       | T                                | [DatePipe](/components/common/demo#date-pipe) |
|                        | EEEEEE      | Tu                               | [DatePipe](/components/common/demo#date-pipe) |
| AM/PM                  | a           | am, pm                           |                                               |
|                        | aa          | a.m., p.m.                       |                                               |
| Hour                   | H           | 0, 1, ... 23                     |                                               |
|                        | HH          | 00, 01, ... 23                   | [DatePipe](/components/common/demo#date-pipe) |
|                        | h           | 1, 2, ..., 12                    |                                               |
|                        | hh          | 01, 02, ..., 12                  | [DatePipe](/components/common/demo#date-pipe) |
| Minute                 | m           | 0, 1, ..., 59                    |                                               |
|                        | mm          | 00, 01, ..., 59                  | [DatePipe](/components/common/demo#date-pipe) |
| Second                 | s           | 0, 1, ..., 59                    |                                               |
|                        | ss          | 00, 01, ..., 59                  | [DatePipe](/components/common/demo#date-pipe) |
| 1/10 of second         | S           | 0, 1, ..., 9                     |                                               |
| 1/100 of second        | SS          | 00, 01, ..., 99                  |                                               |
| Millisecond            | SSS         | 000, 001, ..., 999               |                                               |
| Timezone               | Z           | -01:00, +00:00, ... +12:00       |                                               |
|                        | ZZ          | -0100, +0000, ..., +1200         |                                               |
| Seconds timestamp      | X           | 512969520                        |                                               |
| Milliseconds timestamp | x           | 512969520900                     |                                               |

## HelperUtils api

使用方法：`import { HelperUtils} from 'ng-devui';`

### HelperUtils 静态方法

#### 跳转 url

- **跳转 url**：static **jumpOuterUrl**(**url**: `string`, **target**?:`string`) => void
- 方法描述：主要用于跳转到外部的 url。解决 router.navigate 无法跳转到外部， window.open 会被浏览器安全拦击。此方法使用了模拟了 a 标签的跳转

- 参数列表

|  参数  |   类型   |   默认    |                                              说明                                              | 跳转 Demo                                            |
| :----: | :------: | :-------: | :--------------------------------------------------------------------------------------------: | ---------------------------------------------------- |
|  url   | `string` |    --     |                                     必选，跳转的 url 地址                                      |
| target | `string` | '\_black' | 可选，指定跳转超链接的 target, 类型为[['_blank' \| '_self' \| '_parent' \| '_top' \| string ]] | [Helper Utils](/components/common/demo#helper-utils) |

#### 下载文件

- **下载文件**：static **downloadFile**(

**url**: `string`,

**option**?: {

**method**?: `'POST'| 'GET' | 'post' | 'get'`,

**params**?: `{[property: string]: string}`,

**enctype**?: `'application/x-www-form-urlencoded' | 'multipart/form-data'| 'text/plain'`,

**iframename**?: `string`

},

**onError**?: `(response) => void`

) => void

- 方法描述：主要用于页面内无刷新无弹窗下载文件。实现原理利用隐藏的 iframe 和表单提交数据，主要用于 post 请求。也可用于 get 请求，get 请求推荐用 a 标签加 download 属性解决。

- **注意事项：浏览器对不同类型的默认打开方式不一致，如果要触发下载行为，请为返回的文件流响应包的头部指定"Content-Disposition: attachment; filename=文件名.后缀**

- 参数列表

|       参数        |                类型                 |                默认                 |                                                                                       说明                                                                                        | 跳转 Demo                                            |
| :---------------: | :---------------------------------: | :---------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------- |
|        url        |              `string`               |                 --                  |                                                                      必选，下载的文件地址，对应表单的 action                                                                      |
|      option       |              `Object`               |                 --                  |                                                                                       可选                                                                                        |
|   option.method   | `'POST'\| 'GET' \| 'post' \| 'get'` |               'post'                |                                                                  可选，类型为['POST'\| 'GET' \| 'post'\| 'get']                                                                   | [Helper Utils](/components/common/demo#helper-utils) |
|   option.params   |              `Object`               |                 --                  | 可选，参数对象左值类型为 string，右值类型为 string。对应表单的表单域,method 类型为 GET/get 的时候，会将参数拼接到 url 上，method 类型为 POST/post 时候，参数会拼接才 payload 里。 | [Helper Utils](/components/common/demo#helper-utils) |
|  option.enctype   |              `enctype`              | 'application/x-www-form-urlencoded' |                                可选，类型为[['application/x-www-form-urlencoded'\| 'multipart/form-data' \| 'text/plain']], 对应表单的 enctype 域                                 |
| option.iframename |              `string`               |             'download'              |                                                               可选，指定 iframe 的名字，预防和其他 iframe 名字冲突                                                                |
|      onError      |      `(response: any) => void`      |                 --                  |       可选，用于下载失败时候的回调，类型为 (response) => void, 参数 response 为请求返回的错误信息，response 试图将返回信息转为 json 如果失败则返回原返回数据的 textContent        |

#### Http 客户端下载文件

- **Http 客户端下载文件**：

static **downloadFileByHttpClient** (

**httpClient**: `HttpClient`,

**url**: `string`,

**option**?: {

**method**?: `'POST' | 'GET' | 'post' | 'get'`,

**params**?: `{[property: string]: string}`,

**enctype**?: `'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'`,

**header**?: {

[header: `string`]: `string | string[]`;

},

**responseOption**?: `'response' | 'body' | 'json'`,

**filename**?: `string`,

**withCredentials**?: `boolean`,

**downloadWithoutDispositionHeader**?: `boolean`

},

**onError**?: (response) => void,

**onSuccess**?: (response) => void,

) => void

- 方法描述：主要用于页面内无刷新无弹窗下载文件。实现原理 http 客户端网络提交获取下载文件二进制流并触发下载，主要用于 post 请求。也可用于 get 请求，get 请求推荐用 a 标签加 download 属性解决。

- **注意事项：浏览器对不同类型的默认打开方式不一致，如果要触发下载行为，请为返回的文件流响应包的头部指定"Content-Disposition: attachment; filename=文件名.后缀**

- 为了兼容老版本的 downloadFile，参数基本保持一致，第一个参数增加 httpClient

- 参数列表

|                  参数                   |                类型                 |                 默认                  |                                                                                                                  说明                                                                                                                   | 跳转 Demo |
| :-------------------------------------: | :---------------------------------: | :-----------------------------------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | --------- |
|               httpClient                |            `HttpClient`             |                  --                   |                                                                                                 必选，提供注入的 http 客户端，见备注 1                                                                                                  |
|                   url                   |              `string`               |                  --                   |                                                                                                          必选，下载的文件地址                                                                                                           |
|                 option                  |              `Object`               |                  N/A                  |                                                                                                                  可选                                                                                                                   |
|              option.method              | `'POST'\| 'GET' \| 'post' \| 'get'` |                'post'                 |                                                                                            可选，类型为['POST' \| 'GET' \| 'post' \| 'get' ]                                                                                            |
|              option.params              |              `Object`               |                (none)                 |                            可选，参数对象左值类型为 string，右值类型为 string。对应表单的表单域,method 类型为 GET/get 的时候，会将参数拼接到 url 上，method 类型为 POST/post 时候，参数会拼接才 payload 里。                            |
|             option.enctype              |              `enctype`              | \'application/x-www-form-urlencoded\' |                                                           可选，类型为[['application/x-www-form-urlencoded' \| 'multipart/form-data'\| 'text/plain']], 对应表单的 enctype 域                                                            |
|              option.header              |              `Object`               |                  --                   |                                               可选，用于设置请求 header，使用键值对的 Object 设置 header 值，左值为 header 选项的 key，右值为 header 选项的 value， 如`{'X-lang': 'en'}`                                                |
|          option.responseOption          |  `'response' \| 'body' \| 'json'`   |                'json'                 |                                                                                      可选用于指定失败时候返回的默认格式，若格式处理失败会降级返回                                                                                       |
|             option.filename             |              `string`               |                  --                   |                                                             可选，默认不需要设置，优先设置为配置项，其次会从响应头 Content-Type 指定的 filename 获取，再其次从访问路径获取                                                              |
|         option.withCredentials          |              `boolean`              |                 false                 |                                                                                            可选，调用 http 接口是否启用 xhr.withCredentials                                                                                             |
| option.downloadWithoutDispositionHeader |              `boolean`              |                 false                 |                                    可选，默认需要请求头标记 Content-Disposition: attachment 否则当作非文件流出错处理。 设置为 true，则返回响应头 http 码为成功（2xx）的情况下则强制将返回的 response                                    |
|                 onError                 |        `(res: any) => void`         |                  --                   |                     可选，用于下载失败时候的回调，类型为 (response) => void, 参数 response 为请求返回的错误信息，response 试图将返回信息转为 json 如果失败则返回原返回数据的 textcontent，此处和 downloadFile 一致                      |
|                onSuccess                |        `(res: any) => void`         |                  --                   | 可选，用于下载成功回调，类型为 (response) => void, 参数 response 为请求返回的整个 Http 信息，response 内 body 的加载类型为 ArrayBuffer。由于 body 为下载的文件流，故不会将 body 转为 json 或者试图解析 body 为文本，此处与 onError 不同 |

备注 1： 如何获取 httpClient 实例

1. 确保 module 或者上层 module 引入 HttpClientModule

2. 在使用下载的组件构造器里注入 httpClient，如下面的代码

```typescript
constructor(private httpClient: HttpClient) {}
```

3. 在使用静态帮助类的函数时候，第一个参数使用依赖注入的 httpClient

#### 注意

IE 11 无 TextDecoder， 如果

1. 使用 downloadFileByHttpClient， 并且
2. 需要处理失败信息, 并且
3. 需要在 ie11 下支持中文等非 Uint8 编码支持的文本
   请在 polyfill.ts 文件里包含以下代码，否则 ie11 下会出现中文乱码

```
// polyfill for TextDecoder on IE 11
import 'fastestsmallesttextencoderdecoder';
```

### [dSimulateATag] 指令使用方法

- dSimulateATag 模拟 a 标签，用于跳转外部 url

- 指令描述：使用了 HelperUtils 的 jumpOuterUrl 方法，实现模拟 a 标签

- 参数列表

|  参数  |   类型   |   默认    |                                                 说明                                                 | 跳转 Demo |
| :----: | :------: | :-------: | :--------------------------------------------------------------------------------------------------: | --------- |
|  href  | `string` |    --     |                                        必选，跳转的 url 地址                                         |
| target | `string` | '\_blank' | 可选，指定跳转超链接的 target，类型为`[['\_blank' \| '\_self' \| '\_parent' \| '\_top' \| string ]]` |

## iframe 冒泡 API

### Iframe 事件冒泡 说明

- dIframeEventPropagate

- 使用方法：在 iframe 的祖先元素里添加\`dIframeEventPropagate\`，将 iframe 的鼠标事件（默认为 click 事件）传递到该祖先元素，
  可用于解决 iframe 拥有自己的 document/文档流，鼠标点击等事件无法冒泡，导致 iframe 外的元素通过监听 click 事件来执行隐藏/合起等操作失效。

- 参数列表

| 参数  | 类型   | 默认    | 说明                                              | 跳转 Demo                                                              |
| ----- | ------ | ------- | ------------------------------------------------- | ---------------------------------------------------------------------- |
| event | string | 'click' | 可选，值为 MouseEvent 的 type，指定冒泡的鼠标事件 | [Iframe Event Propagate API](/components/common/demo#iframe-propagate) |

## dClipboard 指令

- dClipboard 用于复制指定文字内容到剪贴板，复制成功后弹出 popover 提示。

- 参数列表

|    参数     |                                    类型                                    | 默认  |                                            说明                                            | 跳转 Demo                                             |
| :---------: | :------------------------------------------------------------------------: | :---: | :----------------------------------------------------------------------------------------: | ----------------------------------------------------- |
|   content   |                                  `string`                                  |  --   |                                    必选，复制的文字内容                                    | [复制到剪贴板指令](/components/common/demo#clipboard) |
|  position   | `'top'\|'right'\|'bottom'\|'left' or ('top'\|'right'\|'bottom'\|'left')[]` | 'top' | 可选，复制成功提示弹出方向，如果传入数组形式，则当前将按照传入数组次序，自适应选取一个方向 | [复制到剪贴板指令](/components/common/demo#clipboard) |
|   sticky    |                                 `boolean`                                  | false |            可选，提示弹出后是不消失，直到点击页面其他位置，默认弹出 3 秒后消失             | [复制到剪贴板指令](/components/common/demo#clipboard) |
| tipContent |                     `string\|HTMLElement\|TemplateRef`                     |  --   |                          可选，复制成功弹出提示的显示内容或模板引                          | [复制到剪贴板指令](/components/common/demo#clipboard) |

- 事件列表

|      事件       |        类型         |                                         说明                                         | 跳转 Demo                                             |
| :-------------: | :-----------------: | :----------------------------------------------------------------------------------: | ----------------------------------------------------- |
| copyResultEvent | `EventEmitter<any>` | 复制后发出的事件，如果是不支持复制操作，isSupported 为 false，可用于提示用户自行复制 | [复制到剪贴板指令](/components/common/demo#clipboard) |
