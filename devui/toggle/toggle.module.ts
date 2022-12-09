import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SafePipe } from 'ng-devui/utils';
import { ToggleComponent } from './toggle.component';

@NgModule({
  imports: [CommonModule, FormsModule, SafePipe],
  exports: [ToggleComponent],
  declarations: [ToggleComponent],
})
export class ToggleModule {}
