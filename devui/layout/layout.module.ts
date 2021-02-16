import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AsideComponent } from './elements/aside.component';
import { ContentComponent } from './elements/content.component';
import { FooterComponent } from './elements/footer.component';
import { HeaderComponent } from './elements/header.component';
import { LayoutComponent } from './layout.component';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, ContentComponent, FooterComponent, AsideComponent],
  exports: [LayoutComponent, HeaderComponent, ContentComponent, FooterComponent, AsideComponent],
  imports: [CommonModule]
})
export class LayoutModule {}
