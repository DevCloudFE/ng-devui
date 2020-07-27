import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './elements/header.component';
import { ContentComponent } from './elements/content.component';
import { FooterComponent } from './elements/footer.component';
import { AsideComponent } from './elements/aside.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, ContentComponent, FooterComponent, AsideComponent],
  exports: [LayoutComponent, HeaderComponent, ContentComponent, FooterComponent, AsideComponent],
  imports: [CommonModule]
})
export class LayoutModule {}
