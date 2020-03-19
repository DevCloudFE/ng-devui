import { Component} from '@angular/core';

@Component({
  selector: 'd-anchor-asyn',
  templateUrl: './asyn.component.html',
  styleUrls: ['./asyn.component.css']
})
export class AsynComponent {
  loadMenu = false;
  loadContent = false;
  constructor() { }

}
