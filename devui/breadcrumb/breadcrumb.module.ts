import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DropDownModule } from 'ng-devui/dropdown';
import { SearchModule } from 'ng-devui/search';
import { BreadCrumbItemComponent } from './breadcrumb-item/breadcrumb-item.component';
import { BreadCrumbComponent } from './breadcrumb.component';
import { BreadCrumbService } from './breadcrumb.service';

@NgModule({
    imports: [CommonModule, RouterModule , DropDownModule, SearchModule],
    exports: [BreadCrumbComponent, BreadCrumbItemComponent],
    declarations: [BreadCrumbComponent, BreadCrumbItemComponent],
    providers: [BreadCrumbService],
})
export class BreadcrumbModule {
}
