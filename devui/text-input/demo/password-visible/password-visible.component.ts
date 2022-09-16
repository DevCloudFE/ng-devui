import { Component } from '@angular/core';

@Component({
  selector: 'd-password-visible',
  templateUrl: './password-visible.component.html',
  styleUrls: ['./password-visible.component.scss'],
})
export class PasswordVisibleComponent {
  constructor() {}

  showPassword = false;
}
