import { Component, Input } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

export const formInjectFactory = (form: NgForm) => form;

@Component({
  selector: 'd-child-form-group',
  templateUrl: './child-form.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm }]  // Inject the parent form.
  /* If you are not sure whether the upper-layer NgForm dependency exists,
  you can use the factory function to inject it. Note that if ngModelGroup is used, its parent container must exist. */
  // viewProviders: [ { provide: ControlContainer, useFactory: formInjectFactory, deps: [[new Optional(), NgForm]]}]
})
export class ChildFormComponent {

  @Input() userGroupData;

  validateRule = [{ required: true, message: 'The subuser name cannot be empty.' }];
}
