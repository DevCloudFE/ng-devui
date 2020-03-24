import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionComponent } from './accordion.component';
import { AccordionListComponent } from './accordion-list.component';
import { AccordionItemRouterlinkComponent } from './accordion-item-routerlink.component';
import { AccordionItemHreflinkComponent } from './accordion-item-hreflink.component';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionMenuComponent } from './accordion-menu.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    AccordionComponent,
    AccordionListComponent,
    AccordionMenuComponent,
    AccordionItemComponent,
    AccordionItemHreflinkComponent,
    AccordionItemRouterlinkComponent,
  ],
  exports: [
    AccordionComponent,
    AccordionListComponent,
    AccordionMenuComponent,
    AccordionItemComponent,
    AccordionItemHreflinkComponent,
    AccordionItemRouterlinkComponent,
  ],
})

export class AccordionModule {}
