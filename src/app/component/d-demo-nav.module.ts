import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DDemoNavComponent } from './d-demo-nav.component';
import { DevUIModule } from 'ng-devui';



@NgModule({
imports: [
    CommonModule,
    DevUIModule
],
declarations: [
    DDemoNavComponent
],
exports: [
    DDemoNavComponent
]
})
export class DDemoNavModule { }