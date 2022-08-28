import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { DevUIModule } from 'ng-devui';
import { DEVUI_LANG, I18nService, ZH_CN } from 'ng-devui/i18n';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment } from 'src/environments/environment';
import { DevuiCommonsModule } from '../../devui-commons/src/public-api';
import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `${environment.deployPrefix}assets/i18n/`, '.json');
}
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DevUIModule.forRoot(),
    FormsModule,
    HttpClientModule,
    DevuiCommonsModule,
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: 'components/zh-cn',
        pathMatch: 'full'
      },
      {
        path: 'components/:lang',
        loadChildren: () => import('./component/app-content.module').then(m => m.AppContentModule)
      },
      {
        path: '**',
        redirectTo: 'components/zh-cn'
      }
    ], { relativeLinkResolution: 'legacy' }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    {
      provide: DEVUI_LANG,
      useValue: ZH_CN
    },
    I18nService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
