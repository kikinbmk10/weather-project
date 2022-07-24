import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { IndexComponent } from './index/index.component';

// Module y Loaders para traducciones
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
// AoT requires an exported function for factories (Funcion para mandar llamar al archivo del lenguaje)
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
  ]
})
export class PagesModule { }
