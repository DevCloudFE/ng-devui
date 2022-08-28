import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafePipeModule } from 'ng-devui/utils';
import { ToggleComponent } from './toggle.component';

@NgModule({
  imports: [CommonModule, FormsModule, SafePipeModule],
  exports: [ToggleComponent],
  declarations: [ToggleComponent],
})
export class ToggleModule {}
