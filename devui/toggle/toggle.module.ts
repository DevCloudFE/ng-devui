import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToggleComponent } from './toggle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ToggleComponent,
  ],
  declarations: [
    ToggleComponent,
  ],
  providers: []
})
export class ToggleModule {}
