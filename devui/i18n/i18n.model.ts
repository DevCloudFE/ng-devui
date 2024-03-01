export interface I18nInterface {
  locale: string;
  common: {
    searchPlaceholder: string;
    noData: string;
    noRecordsFound: string;
    btnConfirm: string;
    loading: string;
    checkAll: string;
    btnOk: string;
    btnCancel: string;
    btnClose: string;
    btnClickMe: string;
    copied: string;
    reset: string;
  };
  autoComplete: {
    latestInput: string;
  };
  datePicker: {
    today: string;
    clear: string;
    daysOfWeek: string[];
    monthsOfYear: string[];
    startDate: string;
    endDate: string;
    yearDisplay(year): string;
  };
  datePickerPro: {
    placeholder: string;
    startPlaceholder: string;
    endPlaceholder: string;
    daysOfWeek: string[];
    monthsOfYear: string[];
    hour: string;
    min: string;
    second: string;
    getYearMonthStr(year, month): string;
    yearDisplay(year): string;
  };
  form: {
    required(val): string;
    minlength(len): string;
    maxlength(len): string;
    min(val): string;
    max(val): string;
    requiredTrue(val): string;
    email(val): string;
    whitespace(val): string;
  };
  gantt: {
    today: string;
    day: string;
    week: string;
    month: string;
    milestone: string;
    monthsOfYear: string[];
    yearDisplay(year): string;
    monthDisplay(strMonthIndex: string): string;
    yearAndMonthDisplay(year: string, strMonthIndex: string): string;
  };
  pagination: {
    goTo: string;
    pageSize: string;
    page: string;
    perPage: string;
    totalItem(total): string;
  };
  quadrant: {
    xAxisLabel: string;
    yAxisLabel: string;
    defaultTitleConf: [{ title: string }];
  };
  datatable: {
    tableSetting: string;
    ensure: string;
    cancel: string;
    compact: string;
    standard: string;
    loose: string;
    divideLine: string;
    striped: string;
    tableShadow: string;
    styles: string;
    colSelected: string;
    colCanSelect: string;
  };
  upload: {
    warning: string;
    upload: string;
    chooseFile: string;
    chooseFiles: string;
    preload: string;
    uploading: string;
    uploaded: string;
    uploadFailed: string;
    uploadSuccess: string;
    delete: string;
    reUpload: string;
    cancelUpload: string;
    getNotAllowedFileTypeMsg(filename, scope): string;
    getBeyondMaximalFileSizeMsg(filename, maximalSize): string;
    getBeyondMaximumFileCountMsg(maximalSize): string;
    getExistSameNameFilesMsg(sameNames): string;
    getAllFilesBeyondMaximalFileSizeMsg(maximalSize): string;
    getSelectedFilesCount(filesCount): string;
    getUploadingFilesCount(uploadingCount, filesCount): string;
    getFailedFilesCount(failedCount): string;
  };
  modal: {
    warning: string;
    error: string;
    fail: string;
    info: string;
    success: string;
  };
  imagePreview: {
    rotate: string;
    zoomIn: string;
    zoomOut: string;
    bestScale: string;
    originScale: string;
    pre: string;
    next: string;
    origin: string;
    download: string;
  };
  colorPicker: {
    recentlyUsed: string;
    basicColors: string;
    moreColors: string;
  };
  stepsGuide: {
    previous: string;
    next: string;
    finish: string;
  };
  splitter: {
    collapse: string;
    expand: string;
  };
  relativeTime: {
    justnow: string;
    later: string;
    minutesLater(num: number): string;
    hoursLater(num: number): string;
    yearsAgo(num: number): string;
    monthsAgo(num: number): string;
    weeksAgo(num: number): string;
    daysAgo(num: number): string;
    daysLater(num: number): string;
    weeksLater(num: number): string;
    monthsLater(num: number): string;
    yearsLater(num: number): string;
    hoursAgo(num: number): string;
    minutesAgo(num: number): string;
  };
  tagsInput: {
    tagsReachMaxLength: string;
    tagsReachMaxNumber: string;
    create: string;
  };
  categorySearch: {
    confirm: string;
    cancel: string;
    selectFilterCondition: string;
    getFindingMessage: (msg: string) => string;
    getSearchMessage: (msg: string) => string;
    saveFilter: string;
    filterTitle: string;
    placeholder: string;
    searchPlaceholder: string;
    noFilterConditions: string;
    clearFilterCondition: string;
    seeMore: string;
    selected: string;
    switchToStart: string;
    switchToEnd: string;
    keyword: string;
  };
  userGuide: {
    guide: string;
    prev: string;
    next: string;
    finish: string;
    autoFill: string;
  };
}
