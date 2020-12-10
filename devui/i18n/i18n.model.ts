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
  pagination: {
    totalItem: string;
    goTo: string;
    pageSize: string;
    page: string;
  };
  upload: {
    warning: string;
    upload: string,
    chooseFile: string,
    chooseFiles: string,
    preload: string,
    uploading: string,
    uploaded: string,
    uploadFailed: string,
    uploadSuccess: string,
    delete: string,
    reUpload: string,
    cancelUpload: string,
    getNotAllowedFileTypeMsg(filename, scope): string,
    getBeyondMaximalFileSizeMsg(filename, maximalSize): string,
    getExistSameNameFilesMsg(sameNames): string,
    getAllFilesBeyondMaximalFileSizeMsg(maximalSize): string,
    getSelectedFilesCount(filesCount): string,
    getUploadingFilesCount(uploadingCount, filesCount): string,
    getFailedFilesCount(failedCount): string
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
  };
  colorPicker: {
    recentlyUsed: string;
    basicColors: string;
    moreColors: string;
  };
  stepsGuide: {
    previous: string,
    next: string,
    finish: string
  };
  splitter: {
    collapse: string,
    expand: string
  };
  relativeTime: {
    yearsAgo: string;
    monthsAgo: string;
    weeksAgo: string;
    daysAgo: string;
    hoursAgo: string;
    minutesAgo: string;
    justnow: string;
    later: string;
    minutesLater: string;
    hoursLater: string;
    daysLater: string;
    weeksLater: string;
    monthsLater: string;
    yearsLater: string;
  };
  tagsInput: {
    tagsReachMaxLength: string;
  };
}
