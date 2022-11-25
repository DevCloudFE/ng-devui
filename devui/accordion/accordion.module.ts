import { NgModule } from '@angular/core';
import { AccordionItemHreflinkComponent } from './accordion-item-hreflink.component';
import { AccordionItemRouterlinkComponent } from './accordion-item-routerlink.component';
import { AccordionItemComponent } from './accordion-item.component';
import { AccordionListComponent } from './accordion-list.component';
import { AccordionMenuComponent } from './accordion-menu.component';
import { AccordionComponent } from './accordion.component';
import { AccordionService } from './accordion.service';

@NgModule({
  imports: [
    AccordionComponent,
    AccordionListComponent,
    AccordionMenuComponent,
    AccordionItemComponent,
    AccordionItemHreflinkComponent,
    AccordionItemRouterlinkComponent
  ],
  exports: [
    AccordionComponent,
    AccordionListComponent,
    AccordionMenuComponent,
    AccordionItemComponent,
    AccordionItemHreflinkComponent,
    AccordionItemRouterlinkComponent,
  ]
})
export class AccordionModule {}
