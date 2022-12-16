import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavSpriteModule } from 'ng-devui/nav-sprite';
import { SafePipe } from 'ng-devui/utils';
import { CodeCopyModule } from '../../../devui-commons/src/codecopy/codecopy.module';
import { DevUIApiComponent } from './devui-api.component';

@NgModule({
  imports: [CommonModule, SafePipe, NavSpriteModule, CodeCopyModule],
  declarations: [DevUIApiComponent],
  exports: [DevUIApiComponent],
})
export class DevUIApiModule {}
