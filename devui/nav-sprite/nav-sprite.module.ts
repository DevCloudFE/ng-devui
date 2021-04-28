import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'ng-devui/button';
import { TooltipModule } from 'ng-devui/tooltip';
import { NavSpriteComponent } from './nav-sprite.component';

@NgModule({
  imports: [CommonModule, DragDropModule, ButtonModule, TooltipModule],
  declarations: [NavSpriteComponent],
  exports: [NavSpriteComponent],
})
export class NavSpriteModule {}
