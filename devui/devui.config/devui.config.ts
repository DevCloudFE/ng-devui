import { Injectable } from '@angular/core';

@Injectable()
export class DevUIConfig {
  autoComplete = {
    delay: 300,
    minLength: 1,
    itemTemplate: null,
    noResultItemTemplate: null,
    formatter: (item) => item ? (item.label || item.toString()) : '',
    valueParser: (item) => item
  };
  datePickerEN = {
    locale: 'en-US',
    timePicker: false,
    current: 'Today',
    dateConverter: null, // DateConverter
    weeks: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January',
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
    min: 1900,
    max: 2099,
    format: {
      date: 'YYYY-MM-DD',
      time: 'YYYY-MM-DD HH:mm'
    }
  };

  datePickerCN = {
    locale: 'zh-CN',
    timePicker: false,
    current: '今天',
    dateConverter: null, // DateConverter
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['一月',
      '二月',
      '三月',
      '四月',
      '五月',
      '六月',
      '七月',
      '八月',
      '九月',
      '十月',
      '十一月',
      '十二月'],
    min: 1900,
    max: 2099,
    format: {
      date: 'YYYY-MM-DD',
      time: 'YYYY-MM-DD HH:mm'
    }
  };

  datePicker = this.datePickerCN;

  paginationEN = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
    maxItems: 10,
    size: '',
    totalItemText: 'Total Records',
    goToText: 'Go',
  };

  paginationCN = {
    pageSize: 10,
    pageSizeOptions: [5, 10, 20, 50],
    maxItems: 10,
    size: '',
    totalItemText: '所有条目',
    goToText: '跳至',
  };

  pagination = this.paginationCN;

  uploadEN = {
    UPLOAD: 'Upload',
    CHOOSE_FILE: 'Choose File',
    CHOOSE_FILES: 'Choose Files',
    UPLOAD_STATUS: {
      PRELOAD: 'preload',
      UPLOADING: 'uploading...',
      UPLOADED: 'uploaded',
      FAILED: 'upload failed',
    },
    DELETE: 'Delete',
    ERROR_MSG: {
      getNotAllowedFileTypeMsg(filename, scope) {
        return `This file "${filename}" is beyond the scope "${scope}", please choose another file`;
      },
      getBeyondMaximalFileSizeMsg(filename, maximalSize) {
        return `This file "${filename}" is beyond the maximal size ${maximalSize} M, please choose another file`;
      }
    }
  };

  uploadCN = {
    UPLOAD: '上传',
    CHOOSE_FILE: '选择文件',
    CHOOSE_FILES: '选择多个文件',
    UPLOAD_STATUS: {
      PRELOAD: '预加载',
      UPLOADING: '上传中...',
      UPLOADED: '已上传',
      FAILED: '上传失败',
    },
    DELETE: '删除',
    ERROR_MSG: {
      getNotAllowedFileTypeMsg(filename, scope) {
        return `${filename}" 不是支持的类型文件, 请选择正确类型"`;
      },
      getBeyondMaximalFileSizeMsg(filename, maximalSize) {
        return `${filename}" 超过了上传文件尺寸 ${maximalSize} M, 请选择其他文件`;
      }
    }
  };

  upload = this.uploadCN;

  modalCN = {
    BUTTON_TEXT: {
      OK: 'OK'
    },
  };

  modalEN = {
    BUTTON_TEXT: {
      OK: '确定'
    },
  };

  modal = this.modalCN;

  accordionEN = {
    LOADING_TEXT: 'loading...',
    NO_DATA: 'No Data'
  };
  accordionCN = {
    LOADING_TEXT: '加载中...',
    NO_DATA: '没有数据'
  };

  dataTableEN = {
    placeholder: 'Please Enter Keywords',
    buttonText: 'OK',
    checkAll: 'All'
  };
  dataTableCN = {
    placeholder: '请输入关键字',
    buttonText: '确认',
    checkAll: '全选'
  };
}
