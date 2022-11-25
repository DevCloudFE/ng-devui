import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccordionComponent } from 'ng-devui/accordion';
import { ToggleModule } from 'ng-devui/toggle';

@Component({
  selector: 'd-basic',
  standalone: true,
  imports: [AccordionComponent, FormsModule, ToggleModule],
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.css']
})
export class BasicComponent {
  restrictOneOpen = false;
  accordionTypeEmbed = false;
  menu = [{
    title: 'Content 1',
    children: [
      {title: 'Child Content 1'},
      {title: 'Child Content 2'},
      {title: 'Child Content '},
    ]
  }, {
    title: 'Content 2（This is a long sentence for option display.）',
    children: [
      {title: 'Child Content 1 (This is a long sentence for option display.)'},
      {title: 'Child Content 2'},
      {title: 'Child Content 3'},
    ]
  }, {
    title: 'Content 3 (Default Open)',
    open: true,
    children: [
      {title: 'Child Content 1 (Disabled)', disabled: true},
      {title: 'Child Content 2 (Default Active)', active: true},
      {title: 'Child Content 3'},
    ]
  }, {
    title: 'Content 4 (No Child)',
    children: []
  }, {
    title: 'Content 5 (Disabled)',
    disabled: true,
    children: [
    ]
  }, {
    title: 'Content 6 (Dynamic Content)',
    needLoadChildren: true,
    loading: false,
    children: [
    ]
  }];

  itemClick(event) {
    console.log('item click' + JSON.stringify(event));
  }
  menuToggle(event) {
    console.log('menu toggle' + JSON.stringify(event));

    if (event.open && event.item.needLoadChildren) {
      event.item.loading = true;
      setTimeout(() => {
        event.item.children = [
          {title: 'Child Content 1'},
          {title: 'Child Content 2'}
        ];
        event.item.needLoadChildren = false;
        event.item.loading = false;
      }, 1000);
    }
  }
  log(...v) {
    console.log(...v);
  }

}
