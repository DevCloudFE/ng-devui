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
    copied: 'Copied'
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
    startDate: 'Start Date',
    endDate: 'End Date',
    yearDisplay(year) {
      return `${year}`;
    }
  },
  form: {
    required(val): string {
      return 'The value cannot be empty.';
    },
    minlength(len): string {
      return `The length cannot be less than ${len}.`;
    },
    maxlength(len): string {
      return `The length cannot be greater than ${len}.`;
    },
    min(val): string {
      return `The value cannot be less than ${val}.`;
    },
    max(val): string {
      return `The value cannot be greater than ${val}.`;
    },
    requiredTrue(val): string {
      return 'The value needs to be true.';
    },
    email(val): string {
      return 'Email format verification failed.';
    },
    whitespace(val): string {
      return 'The value cannot only has whitespace.';
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
    uploadSuccess: 'Upload Successful',
    delete: 'Delete',
    reUpload: 'reupload',
    cancelUpload: 'Upload cancel',
    getNotAllowedFileTypeMsg(filename, scope) {
      return `Files with unsupported types: ${filename}. Supported file types: ${scope}`;
    },
    getBeyondMaximalFileSizeMsg(filename, maximalSize) {
      return `Maximum file size (MB): ${maximalSize}. Files whose size exceeds the maximum value: ${filename}`;
    },
    getAllFilesBeyondMaximalFileSizeMsg(maximalSize) {
      return `Maximum file size (MB): ${maximalSize}. The selected files exceed the maximum value`;
    },
    getExistSameNameFilesMsg(sameNames) {
      return `Duplicate files exist : "${sameNames}"`;
    },
    getSelectedFilesCount(filesCount) {
      return `${filesCount} files added`;
    },
    getUploadingFilesCount(uploadingCount, filesCount) {
      return `${uploadingCount}/${filesCount} is uploading`;
    },
    getFailedFilesCount(failedCount) {
      return `${failedCount} files upload failed`;
    }
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
  stepsGuide: {
    previous: 'Previous',
    next: 'Continue',
    finish: 'OK'
  },
  splitter: {
    collapse: 'Collapse',
    expand: 'Expand'
  },
  relativeTime: {
    yearsAgo: ' years ago',
    monthsAgo: ' months ago',
    weeksAgo: ' weeks ago',
    daysAgo: ' days ago',
    hoursAgo: ' hours ago',
    minutesAgo: ' minutes ago',
    justnow: 'just now',
    later: 'later',
    minutesLater: ' minutes later',
    hoursLater: ' hours later',
    daysLater: ' days later',
    weeksLater: ' weeks later',
    monthsLater: ' months later',
    yearsLater: ' years later',
  },
  tagsInput: {
    tagsReachMaxLength: 'The length of tags has reached maxTags',
  }
};
