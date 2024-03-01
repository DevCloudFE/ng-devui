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
    reset: '重置',
    btnCancel: '取消',
    btnClose: '关闭',
    btnClickMe: '点击我',
    copied: '复制成功',
  },
  autoComplete: {
    latestInput: '最近输入',
  },
  datatable: {
    tableSetting: '表格设置',
    ensure: '确认',
    cancel: '取消',
    compact: '紧凑',
    standard: '标准',
    loose: '宽松',
    divideLine: '行分割线',
    striped: '斑马纹填充',
    tableShadow: '表格阴影',
    styles: '外观',
    colSelected: '已选列',
    colCanSelect: '可选列',
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
    },
  },
  datePickerPro: {
    placeholder: '请选择日期',
    startPlaceholder: '请选择开始日期',
    endPlaceholder: '请选择结束日期',
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
    getYearMonthStr(year, month) {
      return `${year}年 ${month}月`;
    },
    hour: '时',
    min: '分',
    second: '秒',
    yearDisplay(year) {
      return `${year}年`;
    },
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
    },
  },
  gantt: {
    today: '今天',
    day: '天',
    week: '周',
    month: '月',
    milestone: '里程碑',
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
    yearDisplay(year) {
      return `${year}年`;
    },
    monthDisplay(strMonthIndex: string) {
      return this.monthsOfYear[Number(strMonthIndex) - 1];
    },
    yearAndMonthDisplay(year: string, strMonthIndex: string) {
      return this.yearDisplay(year) + this.monthDisplay(strMonthIndex);
    },
  },
  pagination: {
    goTo: '跳至',
    pageSize: '每页条数',
    page: '页',
    perPage: '条/页',
    totalItem(total) {
      return `共 ${total} 条`;
    }
  },
  quadrant: {
    xAxisLabel: '紧急度',
    yAxisLabel: '重要度',
    defaultTitleConf: [
      { title: '重要紧急' },
      { title: '重要不紧急' },
      { title: '不重要不紧急' },
      { title: '不重要紧急' }
    ],
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
    getBeyondMaximumFileCountMsg(maximalSize) {
      return `最大支持上传${maximalSize}个文件, 您上传的文件数量超过最大限制`;
    },
    getAllFilesBeyondMaximalFileSizeMsg(maximalSize) {
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
    origin: '查看原图',
    download: '下载'
  },
  colorPicker: {
    recentlyUsed: '最近使用',
    basicColors: '基本颜色',
    moreColors: '更多颜色',
  },
  stepsGuide: {
    previous: '上一步',
    next: '我知道啦，继续',
    finish: '我知道啦',
  },
  splitter: {
    collapse: '收起',
    expand: '展开',
  },
  relativeTime: {
    yearsAgo(num: number) {
      return num === 1 ? '去年' : `${num}年前`;
    },
    monthsAgo(num: number) {
      return num === 1 ? '上个月' : `${num}个月前`;
    },
    weeksAgo(num: number) {
      return num === 1 ? '上周' : `${num}周前`;
    },
    daysAgo(num: number) {
      return num === 1 ? '昨天' : `${num}天前`;
    },
    daysLater(num: number) {
      return num === 1 ? '明天' : `${num}天后`;
    },
    weeksLater(num: number) {
      return num === 1 ? '下周' : `${num}周后`;
    },
    monthsLater(num: number) {
      return num === 1 ? '下个月' : `${num}个月后`;
    },
    yearsLater(num: number) {
      return num === 1 ? '明年' : `${num}年后`;
    },
    hoursAgo(num: number) {
      return `${num}小时前`;
    },
    minutesAgo(num: number) {
      return `${num}分钟前`;
    },
    minutesLater(num: number) {
      return `${num}分钟后`;
    },
    hoursLater(num: number) {
      return `${num}小时后`;
    },
    justnow: '刚刚',
    later: '稍后'
  },
  tagsInput: {
    tagsReachMaxLength: '您输入的标签已达到最大长度限制',
    tagsReachMaxNumber: '已达到最大个数：',
    create: '生成'
  },
  categorySearch: {
    confirm: '确定',
    cancel: '取消',
    selectFilterCondition: '请选择筛选条件：',
    getFindingMessage(msg) {
      return `在 '${msg}' 中查找`;
    },
    getSearchMessage(type) {
      return `仅搜索关键字 '${type}'`;
    },
    saveFilter: '保存过滤器',
    filterTitle: '过滤器标题',
    placeholder: '请输入...',
    searchPlaceholder: '点击此处添加筛选条件',
    noFilterConditions: '没有筛选条件',
    clearFilterCondition: '清空',
    seeMore: '查看全部过滤条件',
    selected: '已选择',
    switchToStart: '切换至开始时间',
    switchToEnd: '切换至结束时间',
    keyword: '关键字',
  },
  userGuide: {
    guide: '指引',
    prev: '上一步',
    next: '下一步',
    finish: '完成',
    autoFill: '点击此处自动填充'
  }
};
