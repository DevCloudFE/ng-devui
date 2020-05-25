export default {
  locale: 'en-us',
  common: {
    searchPlaceholder: 'Enter a keyword.',
    noData: 'No data available.',
    noRecordsFound: 'No records found.',
    btnConfirm: 'Confirm',
    loading: 'Loading...',
    checkAll: 'All',
    btnOk: 'OK'
  },
  datePicker: {
    today: 'Today',
    clear: 'Clear',
    daysOfWeek: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
    monthsOfYear: ['January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'],
    yearDisplay(year) {
      return `${year}`;
    }
  },

  pagination: {
    totalItem: 'Total Records',
    goTo: 'Go To',
    pageSize: 'Page Size'
  },
  upload: {
    upload: 'Upload',
    chooseFile: '--select--',
    chooseFiles: '--select--',
    preload: 'Selected',
    uploading: 'Uploading...',
    uploaded: 'Upload successful',
    uploadFailed: 'Upload Failed',
    delete: 'Delete',
    getNotAllowedFileTypeMsg(filename, scope) {
      return `Files with unsupported types: ${filename}. Supported file types: ${scope}`;
    },
    getBeyondMaximalFileSizeMsg(filename, maximalSize) {
      return `Maximum file size (MB): ${maximalSize}. Files whose size exceeds the maximum value: ${filename}`;
    },
    getExistSameNameFilesMsg(sameNames) {
      return `Duplicate files exist : "${sameNames}"`;
    }
  },
  modal: {
    warning: 'Warning',
    error: 'Error',
    info: 'Information',
    success: 'Success'
  },
  imagePreview: {
    rotate: 'Rotate',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    bestScale: 'Best Position',
    originScale: 'Original ratio',
    pre: 'Pre',
    next: 'Next'
  },
  colorPicker: {
    recentlyUsed: 'Recently Used',
    basicColors: 'Basic Colors',
    moreColors: 'More Colors'
  }
};
