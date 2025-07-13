import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient } from '@angular/common/http';           //  Necesario para usar HttpClient
import { FormsModule } from '@angular/forms';                       // Para usar [(ngModel)] en formularios

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),                     //  Activa HttpClientModule
    importProvidersFrom(FormsModule)         //  Activa FormsModule (necesario para ngModel)
  ]
};

