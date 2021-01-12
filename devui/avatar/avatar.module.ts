import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AvatarComponent } from './avatar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    AvatarComponent,
  ],
  declarations: [
    AvatarComponent,
  ]
})
export class AvatarModule {}
