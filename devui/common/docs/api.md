**CommonModule**

本模块包含一些组件库中公用用的模块

###### **AutoFocus**

自动聚焦，目前仅datatable在使用

###### **DatePipe**

解析日期，鉴于angular自带的date pipe在IE兼容性有些问题，固本组件库提供一套基于date-fns的pipe，能提供最大的兼容性。

格式化格式与angular自带格式有略微不同，相关格式参考如下:

| Unit                    | Token | Result examples                  |
|-------------------------|-------|----------------------------------|
| Month                   | M     | 1, 2, ..., 12                    |
|                         | Mo    | 1st, 2nd, ..., 12th              |
|                         | MM    | 01, 02, ..., 12                  |
|                         | MMM   | Jan, Feb, ..., Dec               |
|                         | MMMM  | January, February, ..., December |
| Quarter                 | Q     | 1, 2, 3, 4                       |
|                         | Qo    | 1st, 2nd, 3rd, 4th               |
| Day of month            | D     | 1, 2, ..., 31                    |
|                         | Do    | 1st, 2nd, ..., 31st              |
|                         | DD    | 01, 02, ..., 31                  |
| Day of year             | DDD   | 1, 2, ..., 366                   |
|                         | DDDo  | 1st, 2nd, ..., 366th             |
|                         | DDDD  | 001, 002, ..., 366               |
| Day of week             | d     | 0, 1, ..., 6                     |
|                         | do    | 0th, 1st, ..., 6th               |
|                         | dd    | Su, Mo, ..., Sa                  |
|                         | ddd   | Sun, Mon, ..., Sat               |
|                         | dddd  | Sunday, Monday, ..., Saturday    |
| Day of ISO week         | E     | 1, 2, ..., 7                     |
| ISO week                | W     | 1, 2, ..., 53                    |
|                         | Wo    | 1st, 2nd, ..., 53rd              |
|                         | WW    | 01, 02, ..., 53                  |
| Year                    | YY    | 00, 01, ..., 99                  |
|                         | YYYY  | 1900, 1901, ..., 2099            |
| ISO week-numbering year | GG    | 00, 01, ..., 99                  |
|                         | GGGG  | 1900, 1901, ..., 2099            |
| AM/PM                   | A     | AM, PM                           |
|                         | a     | am, pm                           |
|                         | aa    | a.m., p.m.                       |
| Hour                    | H     | 0, 1, ... 23                     |
|                         | HH    | 00, 01, ... 23                   |
|                         | h     | 1, 2, ..., 12                    |
|                         | hh    | 01, 02, ..., 12                  |
| Minute                  | m     | 0, 1, ..., 59                    |
|                         | mm    | 00, 01, ..., 59                  |
| Second                  | s     | 0, 1, ..., 59                    |
|                         | ss    | 00, 01, ..., 59                  |
| 1/10 of second          | S     | 0, 1, ..., 9                     |
| 1/100 of second         | SS    | 00, 01, ..., 99                  |
| Millisecond             | SSS   | 000, 001, ..., 999               |
| Timezone                | Z     | -01:00, +00:00, ... +12:00       |
|                         | ZZ    | -0100, +0000, ..., +1200         |
| Seconds timestamp       | X     | 512969520                        |
| Milliseconds timestamp  | x     | 512969520900                     |

## HelperUtils api

使用方法：\` import { HelperUtils} from 'ng-devui';\`

### HelperUtils 静态方法

#### 跳转url

- **跳转url**：static **jumpOuterUrl**(**url**: `string`, **target**?:`string`) => void
- 方法描述：主要用于跳转到外部的url。解决router.navigate无法跳转到外部， window.open会被浏览器安全拦击。此方法使用了模拟了a标签的跳转

- 参数列表

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| url                   | `string`     | --              | 必选，跳转的url地址                                    |
| target                | `string`     | '_black'        | 可选，指定跳转超链接的target, 类型为[['_blank' | '_self' | '_parent' | '_top' | string ]] |

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

- 方法描述：主要用于页面内无刷新无弹窗下载文件。实现原理利用隐藏的iframe和表单提交数据，主要用于post请求。也可用于get请求，get请求推荐用a标签加download属性解决。

- **注意事项：浏览器对不同类型的默认打开方式不一致，如果要触发下载行为，请为返回的文件流响应包的头部指定"Content-Disposition: attachment; filename=文件名.后缀**

- 参数列表

| 参数              | 类型      | 默认     |   说明                                                |
| :---------------: | :------: | :------: | :--------------------------------------------------: |
| url               | `string` | --       | 必选，下载的文件地址，对应表单的action                  |
| option            | `Object` | --       | 可选                                                  |
| option.method     | `'POST'\| 'GET' \| 'post' \| 'get'`  | 'post'     | 可选，类型为['POST'| 'GET' | 'post' | 'get' ]         |
| option.params     | `Object` | --       | 可选，参数对象左值类型为string，右值类型为string。对应表单的表单域,method类型为GET/get的时候，会将参数拼接到url上，method类型为POST/post时候，参数会拼接才payload里。|
| option.enctype    | `enctype` | 'application/x-www-form-urlencoded'    | 可选，类型为[[\'application/x-www-form-urlencoded\' | \'multipart/form-data\'| \'text/plain\']],   对应表单的enctype域 |
| option.iframename | `string`  | 'download' | 可选，指定iframe的名字，预防和其他iframe名字冲突      |
| onError           |  `(response: any) => void` | --   | 可选，用于下载失败时候的回调，类型为 (response) => void, 参数response为请求返回的错误信息，response试图将返回信息转为json如果失败则返回原返回数据的textContent|

#### Http客户端下载文件

- **Http客户端下载文件**：

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

- 方法描述：主要用于页面内无刷新无弹窗下载文件。实现原理http客户端网络提交获取下载文件二进制流并触发下载，主要用于post请求。也可用于get请求，get请求推荐用a标签加download属性解决。

- **注意事项：浏览器对不同类型的默认打开方式不一致，如果要触发下载行为，请为返回的文件流响应包的头部指定"Content-Disposition: attachment; filename=文件名.后缀**

- 为了兼容老版本的downloadFile，参数基本保持一致，第一个参数增加httpClient

- 参数列表

| 参数            | 类型     | 默认     |   说明                                             |
| :---------------: | :------: | :------: | :--------------------------------------------------: |
| httpClient        | `HttpClient`| --  | 必选，提供注入的http客户端，见备注1                  |
| url               | `string`   | --   | 必选，下载的文件地址                 |
| option            | `Object`   | N/A    | 可选                                                  |
| option.method     | `'POST'\| 'GET' \| 'post' \| 'get'`  | 'post'     | 可选，类型为['POST'| 'GET' | 'post' | 'get' ]         |
| option.params     | `Object`     | (none)    | 可选，参数对象左值类型为string，右值类型为string。对应表单的表单域,method类型为GET/get的时候，会将参数拼接到url上，method类型为POST/post时候，参数会拼接才payload里。|
| option.enctype    | `enctype` | \'application/x-www-form-urlencoded\'     | 可选，类型为[[\'application/x-www-form-urlencoded\' | \'multipart/form-data\'| \'text/plain\']],   对应表单的enctype域                                           |
| option.header | `Object`  | -- | 可选，用于设置请求header，使用键值对的Object设置header值，左值为header选项的key，右值为header选项的value， 如`{'X-lang': 'en'}`     |
| option.responseOption| `'response' \| 'body' \| 'json'`| 'json'|可选用于指定失败时候返回的默认格式，若格式处理失败会降级返回|
| option.filename| `string`| -- |可选，默认不需要设置，优先设置为配置项，其次会从响应头Content-Type指定的filename获取，再其次从访问路径获取|
| option.withCredentials| `boolean`| false |可选，调用http接口是否启用 xhr.withCredentials|
| option.downloadWithoutDispositionHeader| `boolean`| false |可选，默认需要请求头标记Content-Disposition: attachment否则当作非文件流出错处理。 设置为true，则返回响应头http码为成功（2xx）的情况下则强制将返回的response |
| onError           | `(res: any) => void`       | --   | 可选，用于下载失败时候的回调，类型为 (response) => void, 参数response为请求返回的错误信息，response试图将返回信息转为json如果失败则返回原返回数据的textcontent，此处和downloadFile一致|
| onSuccess         | `(res: any) => void`     | --   | 可选，用于下载成功回调，类型为 (response) => void, 参数response为请求返回的整个Http信息，response内body的加载类型为ArrayBuffer。由于body为下载的文件流，故不会将body转为json或者试图解析body为文本，此处与onError不同|

备注1： 如何获取httpClient实例

1. 确保module或者上层module引入HttpClientModule

2. 在使用下载的组件构造器里注入httpClient，如下面的代码

``` typescript
constructor(private httpClient: HttpClient) {}
```

3. 在使用静态帮助类的函数时候，第一个参数使用依赖注入的httpClient

#### 注意

IE 11 无TextDecoder， 如果

1. 使用downloadFileByHttpClient， 并且
2. 需要处理失败信息, 并且
3. 需要在ie11下支持中文等非 Uint8 编码支持的文本
请在 polyfill.ts文件里包含以下代码，否则ie11下会出现中文乱码

```
// polyfill for TextDecoder on IE 11
import 'fastestsmallesttextencoderdecoder';
```

### [dSimulateATag] 指令使用方法

- dSimulateATag 模拟a标签，用于跳转外部url

- 指令描述：使用了HelperUtils的jumpOuterUrl方法，实现模拟a标签

- 参数列表

| 参数                  | 类型          | 默认        |   说明                                                |
| :-------------------: | :----------: | :---------: | :--------------------------------------------------: |
| href                  | `string`     | --         | 必选，跳转的url地址                                    |
| target                | `string`    | '_blank'    | 可选，指定跳转超链接的target，类型为[['_blank' | '_self' | '_parent' | '_top' | string ]]|

## iframe冒泡 API

### Iframe事件冒泡 说明

- dIframeEventPropagate

- 使用方法：在iframe的祖先元素里添加\`dIframeEventPropagate\`，将iframe的鼠标事件（默认为click事件）传递到该祖先元素，
可用于解决iframe拥有自己的document/文档流，鼠标点击等事件无法冒泡，导致iframe外的元素通过监听click事件来执行隐藏/合起等操作失效。

- 参数列表

| 参数                  | 类型          | 默认            |   说明                                                |
| :-------------------: | :----------: | :-------------: | :--------------------------------------------------: |
| event                 | string | 'click'         | 可选，值为MouseEvent的type，指定冒泡的鼠标事件                               |
