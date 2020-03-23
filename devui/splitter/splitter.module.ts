import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SplitterComponent } from './splitter.component';
import { SplitterBarComponent } from './splitter-bar.component';
import { SplitterPaneComponent } from './splitter-pane.component';
import { ResizeDirective } from './resize.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SplitterComponent,
    SplitterPaneComponent,
    SplitterBarComponent,
    ResizeDirective
  ],
  declarations: [
    SplitterComponent,
    SplitterPaneComponent,
    SplitterBarComponent,
    ResizeDirective
  ],
  providers: []
})
export class SplitterModule {}
