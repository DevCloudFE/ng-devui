import { Component, OnInit } from '@angular/core';

export interface CheckedDataFormat {
  label: string;
  name: string;
  id?: string;
  checked?: boolean;
}
@Component({
  selector: 'd-form-demo-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']

})
export class FilterComponent implements OnInit {
  inputDemoConfig: any;

  isShowFilterPannel = false;

  listOfControls: Array<CheckedDataFormat> = [
    { name: 'userName1', label: '计划名1' },
    { name: 'userName2', label: '计划名2' },
    { name: 'userName3', label: '计划名3' },
    { name: 'userName4', label: '计划名4' },
    { name: 'userName5', label: '计划名5' },
    { name: 'userName6', label: '计划名6' },
    { name: 'userName7', label: '计划名7' },
    { name: 'userName8', label: '计划名8' },
    { name: 'userName9', label: '计划名9' },
    { name: 'userName10', label: '计划名10' },
    { name: 'userName11', label: '计划名11' },
  ];

  checkboxOptions: Array<CheckedDataFormat> = [
    { 'id': '1', name: 'userName12', label: '计划名12' },
    { 'id': '2', name: 'userName13', label: '计划名13' },
    { 'id': '3', name: 'userName14', label: '计划名14' },
    { 'id': '4', name: 'userName15', label: '计划名15' },
    { 'id': '5', name: 'userName16', label: '计划名16' },
    { 'id': '6', name: 'userName17', label: '计划名17' },
    { 'id': '0', name: 'userName18', label: '计划名18' },
    { 'id': '0', name: 'userName19', label: '计划名19' },
    { 'id': '0', name: 'userName20', label: '计划名20' },
    { 'id': '0', name: 'userName21', label: '计划名21' },
    { 'id': '0', name: 'userName22', label: '计划名22' },
    { 'id': '0', name: 'userName23', label: '计划名23' },
    { 'id': '0', name: 'userName24', label: '计划名24' },
    { 'id': '0', name: 'userName25', label: '计划名25' },
    { 'id': '0', name: 'userName26', label: '计划名26' },
    { 'id': '0', name: 'userName27', label: '计划名27' },
    { 'id': '0', name: 'userName28', label: '计划名28' },
    { 'id': '0', name: 'userName29', label: '计划名29' },
  ];

  selectedOptions = [];

  constructor() {
  }

  ngOnInit() {
    this.listOfControls.forEach(item => {
      item.checked = true;
      this.selectedOptions.push(item);
    });
  }

  onToggle(data) {
    console.log(data);
  }

  AddField(event) {
    this.checkboxOptions.filter(item => item.checked === true).forEach(item => {
      this.selectedOptions.push(item);

    });
    this.listOfControls = this.selectedOptions.filter(item => item.checked);
    this.checkboxOptions = this.checkboxOptions.filter(item => item.checked !== true);
    event.toggle();
  }

  cancel(event) {
    event.toggle();
  }

  filter() {
    this.isShowFilterPannel = !this.isShowFilterPannel;
  }
}
