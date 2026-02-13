import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { provideNgxStripe } from 'ngx-stripe';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideNgxStripe('pk_test_51T0Pc3PqApFFXkNAl28epeRZlWmr3MMA4U256IanRs8WkXXTKJOc1kkOdX8BdXhdaZdJqtX0oT4XfterHKSCtuo5003PvGPjrb') // Replace with your actual Publishable Key
  ]
};
