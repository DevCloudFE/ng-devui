export default {
  locale: 'zh-cn',
  common: {
    searchPlaceholder: '请输入关键字',
    noData: '没有数据',
    noRecordsFound: '找不到相关记录',
    btnConfirm: '确定',
    loading: '加载中...',
    checkAll: '全选',
    btnOk: '确定',
    btnCancel: '取消',
    btnClose: '关闭',
    btnClickMe: '点击我',
    copied: '复制成功'
  },
  datePicker: {
    today: '今天',
    clear: '清除',
    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
    monthsOfYear: [
      '1月',
      '2月',
      '3月',
      '4月',
      '5月',
      '6月',
      '7月',
      '8月',
      '9月',
      '10月',
      '11月',
      '12月'
    ],
    startDate: '开始日期',
    endDate: '结束日期',
    yearDisplay(year) {
      return `${year}年`;
    }
  },
  form: {
    required(val): string {
      return '值不能为空';
    },
    minlength(len): string {
      return `长度不能小于${len}`;
    },
    maxlength(len): string {
      return `长度不能大于${len}`;
    },
    min(val): string {
      return `值不能小于${val}`;
    },
    max(val): string {
      return `值不能大于${val}`;
    },
    requiredTrue(val): string {
      return '值需要为真';
    },
    email(val): string {
      return '邮箱格式校验不通过';
    },
    whitespace(val): string {
      return '值不能全为空格';
    }
  },
  pagination: {
    totalItem: '所有条目',
    goTo: '跳至',
    pageSize: '每页条数',
    page: '页',
  },
  upload: {
    warning: '提醒',
    upload: '上传',
    chooseFile: '选择文件',
    chooseFiles: '选择多个文件',
    preload: '预加载',
    uploading: '上传中...',
    uploaded: '已上传',
    uploadFailed: '上传失败',
    uploadSuccess: '上传成功!',
    delete: '删除',
    reUpload: '重新上传',
    cancelUpload: '取消上传',
    getNotAllowedFileTypeMsg(filename, scope) {
      return `支持的文件类型: "${scope}", 您上传的文件"${filename}"不在允许范围内，请重新选择文件`;
    },
    getBeyondMaximalFileSizeMsg(filename, maximalSize) {
      return `最大支持上传${maximalSize}MB的文件, 您上传的文件"${filename}"超过可上传文件大小`;
    },
    getAllFilesBeyondMaximalFileSizeMsg( maximalSize) {
      return `最大支持上传${maximalSize}MB的文件, 您本次上传的所有文件超过可上传文件大小`;
    },
    getExistSameNameFilesMsg(sameNames) {
      return `您上传的 "${sameNames}" 存在重名文件, 请重新选择文件`;
    },
    getSelectedFilesCount(filesCount) {
      return `已添加${filesCount}个文件`;
    },
    getUploadingFilesCount(uploadingCount, filesCount) {
      return `${uploadingCount}/${filesCount}正在上传`;
    },
    getFailedFilesCount(failedCount) {
      return `${failedCount}个文件上传失败！`;
    },
  },
  modal: {
    warning: '提醒',
    error: '错误',
    fail: '失败',
    info: '提示',
    success: '成功',
  },
  imagePreview: {
    rotate: '旋转',
    zoomIn: '放大',
    zoomOut: '缩小',
    bestScale: '最佳比例',
    originScale: '原始比例',
    pre: '上一张',
    next: '下一张',
  },
  colorPicker: {
    recentlyUsed: '最近使用',
    basicColors: '基本颜色',
    moreColors: '更多颜色',
  },
  stepsGuide: {
    previous: '上一步',
    next: '我知道啦，继续',
    finish: '我知道啦'
  },
  splitter: {
    collapse: '收起',
    expand: '展开'
  },
  relativeTime: {
    yearsAgo: '年前',
    monthsAgo: '个月前',
    weeksAgo: '周前',
    daysAgo: '天前',
    hoursAgo: '小时前',
    minutesAgo: '分钟前',
    justnow: '刚刚',
    later: '稍后',
    minutesLater: '分钟后',
    hoursLater: '小时后',
    daysLater: '天后',
    weeksLater: '周后',
    monthsLater: '个月后',
    yearsLater: '年后',
  },
  tagsInput: {
    tagsReachMaxLength: '您输入的标签已达到最大长度限制',
  }
};
