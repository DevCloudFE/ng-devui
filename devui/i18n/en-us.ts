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
    copied: 'Copied',
  },
  autoComplete: {
    latestInput: 'Latest input',
  },
  datatable: {
    tableSetting: 'Table Setting',
    ensure: 'Ensure',
    cancel: 'Cancel',
    compact: 'Compact',
    standard: 'Standard',
    loose: 'Loose',
    divideLine: 'Divide Line',
    striped: 'Striped',
    tableShadow: 'Table Shadow',
    styles: 'Table Style',
    colSelected: 'Selected',
    colCanSelect: 'Selectable',
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
      'December',
    ],
    startDate: 'Start Date',
    endDate: 'End Date',
    yearDisplay(year) {
      return `${year}`;
    },
  },
  datePickerPro: {
    placeholder: 'select date',
    startPlaceholder: 'select start date',
    endPlaceholder: 'select end date',
    daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
    monthsOfYear: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'June',
      'July',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
    getYearMonthStr(year, month) {
      return `${year} - ${month}`;
    },
    hour: 'Hr',
    min: 'Min',
    second: 'Sec'
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
    },
  },
  gantt: {
    today: 'today',
    day: 'Day',
    week: 'Week',
    month: 'Month',
    milestone: 'milestone',
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
      'December',
    ],
    yearDisplay(year) {
      return `${year}`;
    },
    monthDisplay(strMonthIndex: string) {
      return this.monthsOfYear[Number(strMonthIndex) - 1];
    },
    yearAndMonthDisplay(year: string, strMonthIndex: string) {
      return this.yearDisplay(year) + this.monthDisplay(strMonthIndex);
    },
  },
  pagination: {
    goTo: 'Go To',
    pageSize: 'Page Size',
    page: 'Page',
    perPage: 'Per Page',
    totalItem(total) {
      return `Total ${total} Records`;
    }
  },
  quadrant: {
    xAxisLabel: 'Urgency',
    yAxisLabel: 'Importance',
    defaultTitleConf: [
      { title: 'Important and urgent' },
      { title: 'Important not urgent' },
      { title: 'Not important not urgent' },
      { title: 'Not important urgent' },
    ],
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
    origin: 'View the original image',
  },
  colorPicker: {
    recentlyUsed: 'Recently Used',
    basicColors: 'Basic Colors',
    moreColors: 'More Colors',
  },
  stepsGuide: {
    previous: 'Previous',
    next: 'Continue',
    finish: 'OK',
  },
  splitter: {
    collapse: 'Collapse',
    expand: 'Expand',
  },
  relativeTime: {
    yearsAgo(num: number) {
      return num === 1 ? 'last year' : `${num} years ago`;
    },
    monthsAgo(num: number) {
      return num === 1 ? 'last month' : `${num} months ago`;
    },
    weeksAgo(num: number) {
      return num === 1 ? 'last week' : `${num} weeks ago`;
    },
    daysAgo(num: number) {
      return num === 1 ? 'yesterday' : `${num} days ago`;
    },
    daysLater(num: number) {
      return num === 1 ? 'tomorrow' : `${num} days later`;
    },
    weeksLater(num: number) {
      return num === 1 ? 'next week' : `${num} weeks later`;
    },
    monthsLater(num: number) {
      return num === 1 ? 'next month' : `${num} months later`;
    },
    yearsLater(num: number) {
      return num === 1 ? 'next year' : `${num} years later`;
    },
    hoursAgo: ' hours ago',
    minutesAgo: ' minutes ago',
    justnow: 'just now',
    later: 'later',
    minutesLater: ' minutes later',
    hoursLater: ' hours later',
  },
  tagsInput: {
    tagsReachMaxLength: 'The length of tags has reached maxTags',
    tagsReachMaxNumber: 'Maximum number reached: ',
  },
  categorySearch: {
    confirm: 'Confirm',
    cancel: 'Cancel',
    selectFilterCondition: 'Please select a filter condition:',
    getFindingMessage(msg) {
      return `find in '${msg}'`;
    },
    getSearchMessage(msg) {
      return `only search '${msg}'`;
    },
    saveFilter: 'Save Filter',
    filterTitle: 'Filter Title',
    placeholder: 'Please enter...',
    searchPlaceholder: 'Click here to choose a filter condition',
    noFilterConditions: 'No filter conditions',
    clearFilterCondition: 'Clear Filter Condition',
    seeMore: 'See more',
    selected: 'Selected',
    switchToStart: 'Switch To Start',
    switchToEnd: 'Switch To End',
    keyword: 'Keyword',
  },
  userGuide: {
    guide: 'Guide',
    prev: 'Prev',
    next: 'Next',
    finish: 'Finish',
    autoFill: 'Click here to auto-populate'
  }
};
