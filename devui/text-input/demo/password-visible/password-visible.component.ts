import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'd-password-visible',
  templateUrl: './password-visible.component.html',
  styleUrls: ['./password-visible.component.scss'],
})
export class PasswordVisibleComponent implements OnInit {
  constructor() {}

  showPassword = false;

  ngOnInit(): void {}
}
