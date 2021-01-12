**CommonModule**

This module contains some common modules in the component library.

###### **AutoFocus**

Automatic focus. Currently, only datatable is used.

###### **DatePipe**

Date parsing. Since the date pipe provided by Angular has some compatibility issues with IE, this component library provides a set of date-fns-based pipe to provide maximum compatibility.

The formatting format is slightly different from the format provided by the Angular. The format is as follows:

| Unit                   | Token       | Result examples                  | Jump demo                                     |
| ---------------------- | ----------- | -------------------------------- | --------------------------------------------- |
| Year                   | y           | 2, 20, 201, 2017, 20173          | [DatePipe](demo#date-pipe) |
|                        | yy          | 02, 20, 01, 17, 73               | [DatePipe](demo#date-pipe) |
|                        | yyy         | 002, 020, 201, 2017, 20173       |                                               |
|                        | yyyy        | 0002, 0020, 0201, 2017, 20173    | [DatePipe](demo#date-pipe) |
| Month                  | M           | 1, 2, ..., 12                    | [DatePipe](demo#date-pipe) |
|                        | MM          | 01, 02, ..., 12                  | [DatePipe](demo#date-pipe) |
|                        | MMM         | Jan, Feb, ..., Dec               | [DatePipe](demo#date-pipe) |
|                        | MMMM        | January, February, ..., December | [DatePipe](demo#date-pipe) |
|                        | MMMMM       | J, F, ..., D                     |                                               |
| Month standalone       | L           | 9, 12                            |                                               |
|                        | LL          | 09, 12                           |                                               |
|                        | LLL         | Sep                              |                                               |
|                        | LLLL        | September                        |                                               |
|                        | LLLLL       | S                                |                                               |
| Week of year           | w           | 1... 53                          | [DatePipe](demo#date-pipe) |
|                        | ww          | 01... 53                         |                                               |
| Week of month          | W           | 1... 5                           |                                               |
| Day of month           | d           | 1, 2, ..., 31                    | [DatePipe](demo#date-pipe) |
|                        | dd          | 01, 02, ..., 31                  | [DatePipe](demo#date-pipe) |
| Week day               | E, EE & EEE | Tue                              |                                               |
|                        | EEEE        | Tuesday                          | [DatePipe](demo#date-pipe) |
|                        | EEEEE       | T                                | [DatePipe](demo#date-pipe) |
|                        | EEEEEE      | Tu                               | [DatePipe](demo#date-pipe) |
| AM/PM                  | a           | am, pm                           |                                               |
|                        | aa          | a.m., p.m.                       |                                               |
| Hour                   | H           | 0, 1, ... 23                     |                                               |
|                        | HH          | 00, 01, ... 23                   | [DatePipe](demo#date-pipe) |
|                        | h           | 1, 2, ..., 12                    |                                               |
|                        | hh          | 01, 02, ..., 12                  | [DatePipe](demo#date-pipe) |
| Minute                 | m           | 0, 1, ..., 59                    |                                               |
|                        | mm          | 00, 01, ..., 59                  | [DatePipe](demo#date-pipe) |
| Second                 | s           | 0, 1, ..., 59                    |                                               |
|                        | ss          | 00, 01, ..., 59                  | [DatePipe](demo#date-pipe) |
| 1/10 of second         | S           | 0, 1, ..., 9                     |                                               |
| 1/100 of second        | SS          | 00, 01, ..., 99                  |                                               |
| Millisecond            | SSS         | 000, 001, ..., 999               |                                               |
| Timezone               | Z           | -01:00, +00:00, ... +12:00       |                                               |
|                        | ZZ          | -0100, +0000, ..., +1200         |                                               |
| Seconds timestamp      | X           | 512969520                        |                                               |
| Milliseconds timestamp | x           | 512969520900                     |                                               |

## HelperUtils api

Usage: `import {HelperUtils} from 'ng-devui'; `

### HelperUtils Static Method

#### Jump URL

- **Redirection URL**: static **jumpOuterUrl**(**url**: `string`, **target**?:`string`) => void
- Method description: used to redirect to an external URL. The router.navigate cannot be redirected to an external system. Window.open is blocked by the browser. This method uses a jump that simulates the a tag.

- Parameter list.

| Parameter |   Type   |  Default  |                                                       Description                                                       | Jump to Demo                                         |
| :-------: | :------: | :-------: | :---------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------- |
|    url    | `string` |    --     |                                                Required. Redirected URL                                                 |
|  target   | `string` | '\_black' | Optional. Specifies the target of the hyperlink. The type is [['_blank' \| '_self' \| '_parent' \| '_top' \| string]. ] | [Helper Utils](demo#helper-utils) |

#### Download a file.

- **Download File**:static **downloadFile**(

**url**: `string`,

**option**? : {

**method**? : `'POST'| 'GET' | 'post' | 'get'`,

**params**?: `{[property: string]: string}`,

**enctype**? : `'application/x-www-form-urlencoded' | 'multipart/form-data'| 'text/plain'`,

**iframename**? : `string`

},

**onError**?: `(response) => void`

) => void

- Method description: This method is used to download files without refreshing the page or pop-up window. Implementation Principle Uses hidden iframes and forms to submit data, which is mainly used for post requests. It can also be used for get requests. It is recommended that the a tag and the download attribute be used for get requests.

- **Note: The browsers use different default opening modes for different types of files. To trigger download, specify Content-Disposition: attachment for the header of the returned file stream response packet. filename=File name. Suffix**

- Parameter list.

|     Parameter     |                Type                |               Default               |                                                                                                                                                           Description                                                                                                                                                           | Jump to Demo                                         |
| :---------------: | :--------------------------------: | :---------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------- |
|        url        |              `string`              |                 --                  |                                                                                                                        Required. File address to be downloaded, corresponding to the action of the form.                                                                                                                        |
|      option       |              `Object`              |                 --                  |                                                                                                                                                            Optional                                                                                                                                                             |
|   option.method   | `'POST'\| 'GET' \|'post' \| 'get'` |               'post'                |                                                                                                                                        Optional. Type ['POST'\| 'GET'\| 'post'\| 'get']                                                                                                                                         | [Helper Utils](demo#helper-utils) |
|   option.params   |              `Object`              |                 --                  |               Optional. The left value type of a parameter object is string, and the right value type of a parameter object is string. Indicates the form field. When the method type is GET/get, parameters are combined to the URL. When the method type is POST/post, parameters are combined to the payload.                | [Helper Utils](demo#helper-utils) |
|  option.enctype   |             `enctype`              | 'application/x-www-form-urlencoded' |                                                                                       Optional. The type is [['application/x-www-form-urlencoded'\|'multipart/form-data' \|'text/plain']], corresponding to the enctype field in the form                                                                                       |
| option.iframename |              `string`              |             'download'              |                                                                                                                        Optional. Specifies the iframe name to prevent conflicts with other iframe names.                                                                                                                        |
|      onError      |     `(response: any) => void`      |                 --                  | Optional. It is used for callback when the download fails. The type is (response) => void. The parameter response indicates the error information returned by the request. The response attempts to convert the returned information to JSON. If the download fails, the textContent of the original returned data is returned. |

#### Downloading a File on the HTTP Client

- **HTTP client download file**:

static **downloadFileByHttpClient** (

**httpClient**: `HttpClient`,

**url**: `string`,

**option**? : {

**method**? : `'POST' | 'GET' | 'post' | 'get'`,

**params**?: `{[property: string]: string}`,

**enctype**? : `'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain'`,

**header**? : {

[header: `string`]: `string | string[]`;

},

**responseOption**? : `'response' | 'body' | 'json'`,

**filename**? : `string`,

**withCredentials**?: `boolean`,

**downloadWithoutDispositionHeader**?: `boolean`
},
**onError**?: (response) => void,

**onSuccess**?: (response) => void,

) => void

- Method description: This method is used to download files without refreshing the page or pop-up window. Implementation Principle: The HTTP client submits a binary stream to obtain the downloaded file and triggers the download. This is mainly used for post requests. It can also be used for get requests. It is recommended that the a tag and the download attribute be used for get requests.

- **Note: The browsers use different default opening modes for different types of files. To trigger download, specify Content-Disposition: attachment for the header of the returned file stream response packet. filename=File name. Suffix**

- To be compatible with the downloadFile of the earlier version, the parameters are basically the same. The httpClient parameter is added to the first parameter.

- Parameter list.

|                Parameter                |                Type                |                Default                |                                                                                                                                                                                               Description                                                                                                                                                                                               | Jump to Demo |
| :-------------------------------------: | :--------------------------------: | :-----------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ------------ |
|               httpClient                |            `HttpClient`            |                  --                   |                                                                                                                                                               Required. HTTP client that provides ingestion. For details, see Remarks 1.                                                                                                                                                                |
|                   url                   |              `string`              |                  --                   |                                                                                                                                                                                     Required. File download address                                                                                                                                                                                     |
|                 option                  |              `Object`              |                  N/A                  |                                                                                                                                                                                                Optional                                                                                                                                                                                                 |
|              option.method              | `'POST'\| 'GET' \|'post' \| 'get'` |                'post'                 |                                                                                                                                                                        Optional. The type is ['POST'\| 'GET'\| 'post' \| 'get']                                                                                                                                                                         |
|              option.params              |              `Object`              |                (none)                 |                                                 Optional. The left value type of the parameter object is string, and the right value type of the parameter object is string. Indicates the form field. When the method type is GET/get, parameters are combined to the URL. When the method type is POST/post, parameters are combined to the payload.                                                  |
|             option.enctype              |             `enctype`              | \'application/x-www-form-urlencoded\' |                                                                                                                           Optional. The type is [['application/x-www-form-urlencoded'\|'multipart/form-data'\|'text/plain']], corresponding to the enctype field in the form                                                                                                                            |
|              option.header              |              `Object`              |                  --                   |                                                                  Optional. This parameter is used to set the request header. The object of the key-value pair is used to set the header value. The left value is the key of the header option, and the right value is the value of the header option, for example, `{'X-lang':'en'}. `                                                                  |
|          option.responseOption          |  `response' \| 'body' \| 'json'`   |                'json'                 |                                                                                                            Optional. This parameter is used to specify the default format returned when the format fails to be processed. If the format fails to be processed, the format will be degraded.                                                                                                             |
|             option.filename             |              `string`              |                  --                   |                                                                                                Optional. This parameter is not set by default. It is set to a configuration item first, obtained from filename specified in Content-Type in the response header, and then obtained from the access path.                                                                                                |
|         option.withCredentials          |             `boolean`              |                 false                 |                                                                                                                                                       Optional. Indicates whether to enable xhr.withCredentials when HTTP interfaces are invoked.                                                                                                                                                       |
| option.downloadWithoutDispositionHeader |             `boolean`              |                 false                 |                                                                Optional. Content-Disposition: attachment is required in the request header by default. Otherwise, an error occurs in the non-file stream. If this parameter is set to true, the returned response is forcibly returned when the HTTP code in the response header is 2xx.                                                                |
|                 onError                 |        `(res: any) => void`        |                  --                   |             Optional. It is used for callback when the download fails. The type is (response) => void. The parameter response indicates the error information returned by the request. The response attempts to convert the returned information to JSON. If the download fails, the textcontent of the original returned data is returned. The value is the same as that of downloadFile.              |
|                onSuccess                |        `(res: any) => void`        |                  --                   | Optional. It is used to call back the download success. The type is (response) => void. The parameter response indicates the entire HTTP information returned by the request. The loading type of the body in the response is ArrayBuffer. The body is the downloaded file stream. Therefore, the body is not converted to JSON or attempted to parse the body as text. This is different from onError. |

Remark 1: How to obtain the httpClient instance?

1. Ensure that the module or upper-layer module introduces the HttpClientModule.

2. Inject httpClient into the constructor of the downloaded component, as shown in the following figure.

```typescript
constructor(private httpClient: HttpClient) {}
```

3. When using the static help function, use the httpClient that depends on injected as the first parameter.

#### Attention

IE 11 No TextDecoder, if

1. Use the downloadFileByHttpClient.
2. The failure information needs to be processed and
3. Texts that are not supported by Uint8 encoding, such as Chinese, must be supported in Internet Explorer 11.
   Ensure that the following code is contained in the polyfill.ts file. Otherwise, garbled characters are displayed in ie11.

```
// polyfill for TextDecoder on IE 11
import'fastestsmallesttextencoderdecoder';
```

### [dSimulateATag] Instruction Usage

- dSimulateATag: simulates the a tag for redirecting to an external URL.

- Instruction description: The jumpOuterUrl method of HelperUtils is used to simulate the a tag.

- Parameter list.

| Parameter |   Type   |  Default  |                                                        Description                                                         | Jump to Demo |
| :-------: | :------: | :-------: | :------------------------------------------------------------------------------------------------------------------------: | ------------ |
|   href    | `string` |    --     |                                                 Required. Redirection URL.                                                 |
|  target   | `string` | '\_blank' | Optional. Specifies the target of the hyperlink. The type is `['\_blank' \| '\_self' \| '\_parent' \| '\_top' \| string]]` |

## iframe pop-up API

### Iframe Event Pop-up Description

- dIframeEventPropagate

- Usage method: Add \`dIframeEventPropagate\` to the ancestor element of the iframe and transfer the mouse event (click event by default) of the iframe to the ancestor element,
  This method can be used to solve the problem that the iframe has its own document/document stream and events such as mouse click cannot pop up. As a result, elements other than the iframe cannot be hidden or closed by listening to the click event.

- Parameter list.

| Parameter | Type   | Default | Description                                    | Jump to Demo                                                           |
| --------- | ------ | ------- | ---------------------------------------------- | ---------------------------------------------------------------------- |
| event     | string | 'click' | Optional. The value is the type of MouseEvent. Indicates the pop-up mouse event.| [Iframe Event Propagate API](demo#iframe-propagate) |

## dClipboard Instructions

- dClipboard is used to copy a specified text to the clipboard. After the copy is successful, the popover message is displayed.

- Parameter list.

| Parameter  |                                    Type                                    | Default |                                                                                  Description                                                                                   | Jump to Demo                                                           |
| :--------: | :------------------------------------------------------------------------: | :-----: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------- |
|  content   |                                  `string`                                  |   --    |                                                                         Required. Copied text content                                                                          | [Copy to Clipboard instruction](demo#clipboard)     |
|  position  | `top'\|'right'\|'bottom'\|'left' or ('top'\|'right'\|'bottom'\|'left') []` |  'top'  | Optional. If the copy is successful, the pop-up direction is displayed. If the array format is input, a direction is automatically selected based on the input array sequence. | [Copy to Clipboard instruction](demo#clipboard) |
|   sticky   |                                 `boolean`                                  |  false  |        Optional. The message will not disappear after being popped up until you click another position on the page. By default, the message disappears after 3 seconds.        | [Copy to Clipboard instruction](demo#clipboard) |
| tipContent |                     `string\|HTMLElement\|TemplateRef`                     |   --    |                                                Optional. Display content or template index displayed when a copy is successful                                                 | [Copy to Clipboard instruction](demo#clipboard)     |

- Event list.

|      Event      |        Type         |                                                                 Description                                                                 | Jump to Demo                                                           |
| :-------------: | :-----------------: | :-----------------------------------------------------------------------------------------------------------------------------------------: | ---------------------------------------------------------------------- |
| copyResultEvent | `EventEmitter<any>` | Event sent after copying. If the copy operation is not supported, isSupported is false, which can be used to prompt users to copy the data. | [Copy to Clipboard instruction](demo#clipboard) |
