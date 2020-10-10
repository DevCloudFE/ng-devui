import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { DevUIModule } from 'ng-devui';
import { ThemePickerModule } from './theme-picker/theme-picker.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DevUIModule.forRoot(),
    FormsModule,
    ThemePickerModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'components',
          pathMatch: 'full'
        },
        {
          path: 'components',
          loadChildren: () => import('./component/app-content.module').then(m => m.AppContentModule)
        },
        {
          path: '**',
          redirectTo: 'components'
        }
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
