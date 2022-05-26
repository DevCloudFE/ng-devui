import { Component } from '@angular/core';

@Component({
  selector: 'd-basic',
  templateUrl: './basic.component.html',
})
export class BasicComponent {
  tabActiveId: string | number = 'tab2';

  activeTabChange(tab) {
    console.log(tab);
  }
}
