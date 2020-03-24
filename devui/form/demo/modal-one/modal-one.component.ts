import { Component, OnInit } from '@angular/core';

abstract class FormControlConfig<T> {
  key: string;
  label: string;
  placeholder: string;
  required: boolean;
  controlType: string;
  controlDesc: string;
  helpTip: string;
  value: T;
  constructor(options: {
    key?: string,
    label?: string,
    placeholder?: string,
    required?: boolean,
    controlType?: string,
    controlDesc?: any,
    helpTip?: string
  } = {}) {
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.required = !!options.required;
    this.controlType = options.controlType || '';
    this.controlDesc = options.controlDesc || '';
    this.helpTip = options.helpTip || '';
  }
}

export class FormInputConfig extends FormControlConfig<string> {
  width: string;
  pattern: string;
  maxlength: string;
  inputCheck: any;
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'text';
    this.width = options['width'] || '';
    this.pattern = options['pattern'] || '';
    this.maxlength = options['maxlength'] || '';
    this.inputCheck = options['inputCheck'] || [];
  }
}

export class FormTextAreaConfig extends FormControlConfig<string> {
  width: string;
  pattern: string;
  maxlength: string;
  inputCheck: any;
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'textarea';
    this.width = options['width'] || '';
    this.pattern = options['pattern'] || '';
    this.maxlength = options['maxlength'] || '';
    this.inputCheck = options['inputCheck'] || [];
  }
}

export class FormSelectConfig extends FormControlConfig<Object> {
  width: string;
  options: any;
  multiple: string;
  isSearch: boolean;
  labelization: any;
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'select';
    this.width = options['width'] || '';
    this.multiple = options['multiple'] || '';
    this.options = options['options'] || [];
    this.isSearch = options['isSearch'] || false;
    this.labelization = options['labelization'] || {};
  }
}

export class FormRadioConfig extends FormControlConfig<Object> {
  options: any;
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'radio';
    this.options = options['options'] || [];
  }
}

export class FormToggleConfig extends FormControlConfig<string> {
  options: any;
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'toggle';
    this.options = options['options'] || [];
  }
}

export class FormCheckBoxConfig extends FormControlConfig<Object> {
  options: any;
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'checkbox';
    this.options = options['options'] || [];
  }
}

export class FormSingleDateConfig extends FormControlConfig<string> {
  width: string;
  options: any;
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'single-date';
    this.width = options['width'] || '193px';
    this.options = options['options'] || [];
  }
}

export class FormMultiDateConfig extends FormControlConfig<string> {
  width: string;
  options: any;
  constructor(options: {} = {}) {
    super(options);
    this.controlType = 'multi-date';
    this.width = options['width'] || '193px';
    this.options = options['options'] || [];
  }
}

@Component({
  selector: 'd-form-demo-modal-one',
  templateUrl: './modal-one.component.html'
})
export class ModalOneComponent implements OnInit {
  inputDemoConfig: any;
  textareaDemoConfig: any;
  selectDemoConfig: any;
  multipleSelectDemoConfig: any;
  multipleSelect2DemoConfig: any;
  radioDemoConfig: any;
  toggleDemoConfig: any;
  checkboxDemoConfig: any;
  singleDateDemoConfig: any;
  multiDateDemoConfig: any;
  inputDemoConfig2: any;
  selectDemoconfig2: any;
  multipleSelectDemoConfig3: any;
  singleDateDemoConfig2: any;
  disabled: false;

  labelList = [{
    id: 1,
    label: '选项1'
  },
  {
    id: 2,
    label: '选项2'
  },
  {
    id: 3,
    label: '选项3'
  }];

  addedLabelList = [];

  selectOptions = [{
    id: 1,
    label: '选项1'
  },
  {
    id: 2,
    label: '选项2'
  },
  {
    id: 3,
    label: '选项3'
  }];


  radioOptions = [{
    id: 1,
    label: '手工执行'
  }, {
    id: 2,
    label: '每日定时执行'
  }, {
    id: 3,
    label: '每周定时执行'
  }];

  checkboxOptions = [
    { 'id': '1', 'label': '周一', checked: true },
    { 'id': '2', 'label': '周二' },
    { 'id': '3', 'label': '周三' },
    { 'id': '4', 'label': '周四' },
    { 'id': '5', 'label': '周五' },
    { 'id': '6', 'label': '周六' },
    { 'id': '0', 'label': '周日' }
  ];

  formData = {
    inputValue: '',
    textareaValue: '',
    selectValue: this.selectOptions[1],
    multipleSelectValue: [this.selectOptions[1], this.selectOptions[2]],
    multipleSelect2Value: [this.selectOptions[1], this.selectOptions[2]],
    radioValue: {},
    toggleValue: false,
    singDateValue: '',
    multiDateValue: {
      startDate: '',
      endDate: ''
    },

    inputValue2: '',
    singDateValue2: '',
  };

  ngOnInit() {
    this.multipleSelect2DemoConfig = new FormSelectConfig({
      key: 'multipleSelect-demo2',
      label: '委托英雄(多选带删除)',
      isSearch: true,
      multiple: 'true',
      labelization: { enable: true, labelMaxWidth: '120px' },
      options: this.selectOptions
    });
  }
}


