## ave-single-upload 说明 

| 参数             | 类型             | 默认   |   说明                 |
| :--------------: | :--------------: | :----: | :------------------------------------------|
| autoUpload       | boolean          | false  | 必选参数，是否自动上传 |
| CHOOSE_FILE      | string           | (none) | 可选参数，上传输入框中的Placeholder文字 |
| fileOptions      | IFileOptions     | (none) | 必选参数，待上传文件配置 |
| filePath         | string           | (none) | 必选参数，文件路径 |
| OK               | string           | (none) | 可选参数，错误信息弹出框中确认按钮文字 |
| preloadFilesRef  | TemplateRef<any> | (none) | 必选参数， |
| UPLOAD           | string           | (none) | 可选参数，上传按钮文字 |
| uploadedFiles    | Object[]         | (none) | 必选参数，已上传文件对象 |
| uploadedFilesRef | TemplateRef<any> | (none) | 必选参数，已上传文件对象实现引用 |
| uploadOptions    | IUploadOptions   | (none) | 必选参数，上传配置 |
| withoutBtn       | boolean          | false  | 必选参数，是否舍弃按钮 |
| beforeUpload     | function、Promise、Observable      | (none)      | 可选参数，上传前的回调， |


## ave-multiple-upload 说明 

| 参数             | 类型             | 默认   |   说明                 |
| :--------------: | :--------------: | :----: | :------------------------------------------|
| autoUpload       | boolean          | false  | 必选参数，是否自动上传 |
| CHOOSE_FILES     | string           | (none) | 可选参数，上传输入框中的Placeholder文字 |
| fileOptions      | IFileOptions     | (none) | 必选参数，待上传文件配置 |
| filePath         | string           | (none) | 必选参数，文件路径 |
| OK               | string           | (none) | 可选参数，错误信息弹出框中确认按钮文字 |
| preloadFilesRef  | TemplateRef<any> | (none) | 必选参数， |
| UPLOAD           | string           | (none) | 可选参数，上传按钮文字 |
| uploadedFiles    | Object[]         | (none) | 必选参数，已上传文件对象 |
| uploadedFilesRef | TemplateRef<any> | (none) | 必选参数，已上传文件对象实现引用 |
| uploadOptions    | IUploadOptions   | (none) | 必选参数，上传配置 |
| withoutBtn       | boolean          | false  | 必选参数，是否舍弃按钮 |
| enableDrop       | boolean          | false  | 可选参数，是否支持拖拽 |   
| beforeUpload     | function、Promise、Observable      | (none)      | 可选参数，上传前的回调， |
| fileOver         | function         | none   | 支持多拽上传时，文件移动到可拖放区域触发事件|
| fileDrop         | function         | none   |  支持多拽上传时，当前拖拽的文件列表回调，单文件上传默认返回第一个文件|
`;
