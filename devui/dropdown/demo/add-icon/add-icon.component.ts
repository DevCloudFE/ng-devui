import {Component} from '@angular/core';

@Component({
  selector: 'd-dropdown-demo-add-icon',
  templateUrl: './add-icon.component.html',
  styleUrls: ['./add-icon.component.css']
})
export class DropDownDemoAddIconComponent {
  items: any = ['新建', '刪除', '菜单一', '菜单二', '菜单三', '菜单四'];

  onToggle(event) {
    console.log(event);
  }
}
