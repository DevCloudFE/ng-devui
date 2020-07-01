export default {
  locale: 'en-us',
  common: {
    searchPlaceholder: 'Enter a keyword.',
    noData: 'No data available.',
    noRecordsFound: 'No records found.',
    btnConfirm: 'Confirm',
    loading: 'Loading...',
    checkAll: 'All',
    btnOk: 'OK',
    btnCancel: 'Cancel',
    btnClose: 'Close',
    btnClickMe: 'click me!',
  },
  datePicker: {
    today: 'Today',
    clear: 'Clear',
    daysOfWeek: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat'],
    monthsOfYear: [
      'January',
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
      'December'
    ],
    yearDisplay(year) {
      return `${year}`;
    }
  },

  pagination: {
    totalItem: 'Total Records',
    goTo: 'Go To',
    pageSize: 'Page Size',
    page: 'Page',
  },
  upload: {
    warning: 'Warning',
    upload: 'Upload',
    chooseFile: '--select--',
    chooseFiles: '--select--',
    preload: 'Selected',
    uploading: 'Uploading...',
    uploaded: 'Upload successful',
    uploadFailed: 'Upload failed',
    delete: 'Delete',
    getNotAllowedFileTypeMsg(filename, scope) {
      return `Files with unsupported types: ${filename}. Supported file types: ${scope}`;
    },
    getBeyondMaximalFileSizeMsg(filename, maximalSize) {
      return `Maximum file size (MB): ${maximalSize}. Files whose size exceeds the maximum value: ${filename}`;
    },
    getAllFilesBeyondMaximalFileSizeMsg( maximalSize) {
      return `Maximum file size (MB): ${maximalSize}. The selected files exceed the maximum value`;
    },
    getExistSameNameFilesMsg(sameNames) {
      return `Duplicate files exist : "${sameNames}"`;
    },
  },
  modal: {
    warning: 'Warning',
    error: 'Error',
    fail: 'Fail',
    info: 'Information',
    success: 'Success',
  },
  imagePreview: {
    rotate: 'Rotate',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    bestScale: 'Best Ratio',
    originScale: 'Original Ratio',
    pre: 'Previous',
    next: 'Next',
  },
  colorPicker: {
    recentlyUsed: 'Recently Used',
    basicColors: 'Basic Colors',
    moreColors: 'More Colors',
  },
};
