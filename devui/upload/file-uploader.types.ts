export class IUploadOptions {
  // 上传接口地址
  uri: string;
  // http 请求方法
  method?: string;
  // 上传文件大小限制
  maximumSize?: number;
  // 自定义请求headers
  headers?: { [key: string]: any };
  // 认证token
  authToken?: string;
  // 认证token header标示
  authTokenHeader?: string;
  // 上传额外自定义参数
  additionalParameter?: { [key: string]: any };
  // 上传文件字段名称，默认file
  fileFieldName?: string;
  // 多文件上传,是否检查文件重名，设置为true，重名文件不会覆盖，否则会覆盖上传
  checkSameName?: boolean;
  // 指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site Access-Control）请求
  withCredentials?: boolean;
}

export class IFileOptions {
  accept?: string;
  multiple?: boolean;
}

export enum UploadStatus {
  preLoad = 0,
  uploading,
  uploaded,
  failed
}
