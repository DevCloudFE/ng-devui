export default {
  locale: 'zh-cn',
  common: {
    searchPlaceholder: '请输入关键字',
    noData: '没有数据',
    noRecordsFound: '找不到相关记录',
    btnConfirm: '确定',
    loading: '加载中...',
    checkAll: '全选',
    btnOk: '确定'
  },
  datePicker: {
    today: '今天',
    clear: '清除',
    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    monthsOfYear: ['一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'],
  },

  pagination: {
    totalItem: '所有条目',
    goTo: '跳至',
    pageSize: '每页条数'
  },
  upload: {
    upload: '上传',
    chooseFile: '选择文件',
    chooseFiles: '选择多个文件',
    preload: '预加载',
    uploading: '上传中...',
    uploaded: '已上传',
    uploadFailed: '上传失败',
    delete: '删除',
    getNotAllowedFileTypeMsg(filename, scope) {
      return `您上传的文件"${filename}"不在允许范围"${scope}"内，请重新选择文件`;
    },
    getBeyondMaximalFileSizeMsg(filename, maximalSize) {
      return `您上传的文件"${filename}"大小超过最大限制${maximalSize}M，请重新选择文件`;
    },
    getExistSameNameFilesMsg(sameNames) {
      return `您上传的 "${sameNames}" 存在重名文件 ,请重新选择文件`;
    }
  },
  modal: {
    warning: '提醒',
    error: '错误',
    info: '提示'
  }
};
