import { Component } from '@angular/core';

@Component({
  selector: 'd-manual',
  templateUrl: './manual.component.html',
})
export class ManualComponent {
  name;
  nameErrMsg = 'The value must contain at least four characters!';
}
