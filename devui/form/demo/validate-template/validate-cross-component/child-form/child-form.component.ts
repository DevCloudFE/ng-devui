import { Component, Input, Optional } from '@angular/core';
import { ControlContainer, NgForm } from '@angular/forms';

export const formInjectFactory = (form: NgForm) => form;

@Component({
  selector: 'child-form-group',
  templateUrl: './child-form.component.html',
  viewProviders: [ { provide: ControlContainer, useExisting: NgForm }]  // 将上层form注入
  /* 若不确定上层NgForm依赖是否存在，可使用工厂函数方式注入，但注意若使用ngModelGroup，则其父级容器必须存在 */
  // viewProviders: [ { provide: ControlContainer, useFactory: formInjectFactory, deps: [[new Optional(), NgForm]]}]
})
export class ChildFormComponent {

  @Input() userGroupData;

  validateRule = [{ required: true, message: '子用户名不能为空' }];
}
