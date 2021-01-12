import { Component, OnInit } from '@angular/core';

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
    this.multipleSelect2DemoConfig = {
      key: 'multipleSelect-demo2',
      label: '委托英雄(多选带删除)',
      isSearch: true,
      multiple: 'true',
      labelization: { enable: true, labelMaxWidth: '120px' },
      options: this.selectOptions
    };
  }
}
