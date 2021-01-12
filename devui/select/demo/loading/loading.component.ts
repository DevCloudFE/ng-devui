import { Component, ViewChild } from '@angular/core';
import { SelectComponent } from 'ng-devui/select';
import { of, timer } from 'rxjs';

@Component({
  selector: 'd-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent {
  @ViewChild('select', { static: true }) selectComponent: SelectComponent;
  @ViewChild('select1', { static: true }) selectComponent1: SelectComponent;
  options = [];
  currentOption = [];
  dataLoaded = false;
  dataLoaded1 = false;

  options2 = [];
  currentOption1 = '';

  toggleChange($event) {
    if ($event && !this.dataLoaded) {
      this.selectComponent.loadStart();
      this.changeSelect();
    }
  }

  toggleChange1($event) {
    if ($event && !this.dataLoaded1) {
      this.selectComponent1.loadStart();
      this.changeSelect1();
    }
  }

  changeSelect() {
    timer(2000).subscribe(() => {
      console.log('done');
      this.dataLoaded = true;
      this.selectComponent.loadFinish();
      this.options = [{
        name: '选项1',
        value: 1
      }, {
        name: '选项2',
        value: 2
      }, {
        name: '选项3',
        value: 3
      }, {
        name: '选项4',
        value: 4
      }];

      this.currentOption = [{
        name: '选项3',
        value: 3
      }, {
        name: '选项4',
        value: 4
      }];
    });
  }

  changeSelect1() {
    timer(2000).subscribe(() => {
      console.log('done');
      this.dataLoaded1 = true;
      this.options2 = [{
        name: '选项1',
        value: 1
      }, {
        name: '选项2',
        value: 2
      }, {
        name: '选项3',
        value: 3
      }, {
        name: '选项4',
        value: 4
      }];
      this.selectComponent1.forceSearchNext();
      this.selectComponent1.loadFinish();
    });
  }

  onSelectObject = (term) => {
    return of(
      this.options2
        .map((option, index) => ({id: index, option: option}))
        .filter(item => item.option.name.toLowerCase().indexOf(term.toLowerCase()) !== -1)
    );
  }
}
