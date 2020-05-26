export interface I18nInterface {
  locale: string;
  common: {
    searchPlaceholder: string,
    noData: string,
    noRecordsFound: string,
    btnConfirm: string,
    loading: string,
    checkAll: string,
    btnOk: string
  };
  datePicker: {
    today: string,
    clear: string,
    daysOfWeek: string[],
    monthsOfYear: string[],
    yearDisplay(year): string
  };

  pagination: {
    totalItem: string,
    goTo: string,
    pageSize: string
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
    getExistSameNameFilesMsg(sameNames): string
  };
  modal: {
    warning: string;
    error: string;
    info: string;
    success: string;
  };
  imagePreview: {
    rotate: string,
    zoomIn: string,
    zoomOut: string,
    bestScale: string,
    originScale: string,
    pre: string,
    next: string
  };
  colorPicker: {
    recentlyUsed: string;
    basicColors: string;
    moreColors: string;
  };

}
