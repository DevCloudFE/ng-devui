import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputGroupComponent } from './input-group.component';
import { InputGroupPipe } from './input-group.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [InputGroupComponent, InputGroupPipe],
  exports: [InputGroupComponent, InputGroupPipe],
})
export class InputGroupModule {}
