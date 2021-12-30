import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DClassDirective } from './class.directive';
import { DColComponent } from './col.component';
import { AsideComponent } from './elements/aside.component';
import { ContentComponent } from './elements/content.component';
import { FooterComponent } from './elements/footer.component';
import { HeaderComponent } from './elements/header.component';
import { DFlexDirective } from './flex.directive';
import { DGutterDirective } from './gutter.directive';
import { LayoutComponent } from './layout.component';
import { DRowComponent } from './row.component';
import { DSpaceDirective } from './space.directive';
import { DStyleDirective } from './style.directive';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    AsideComponent,
    DClassDirective,
    DStyleDirective,
    DFlexDirective,
    DRowComponent,
    DColComponent,
    DSpaceDirective,
    DGutterDirective,
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    AsideComponent,
    DClassDirective,
    DStyleDirective,
    DFlexDirective,
    DRowComponent,
    DColComponent,
    DSpaceDirective,
    DGutterDirective,
  ],
  imports: [CommonModule],
})
export class LayoutModule {}
