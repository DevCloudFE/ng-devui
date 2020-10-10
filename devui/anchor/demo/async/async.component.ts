import { Component} from '@angular/core';

@Component({
  selector: 'd-anchor-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.scss']
})
export class AsyncComponent {
  loadMenu = false;
  loadContent = false;
}
