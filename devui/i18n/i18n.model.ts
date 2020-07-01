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
  };
  datePicker: {
    today: string;
    clear: string;
    daysOfWeek: string[];
    monthsOfYear: string[];
    yearDisplay(year): string;
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
    delete: string,
    getNotAllowedFileTypeMsg(filename, scope): string,
    getBeyondMaximalFileSizeMsg(filename, maximalSize): string,
    getExistSameNameFilesMsg(sameNames): string,
    getAllFilesBeyondMaximalFileSizeMsg(maximalSize): string
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
}
