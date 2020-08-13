import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {BackendUrlInterceptor} from './backend-url.interceptor';

export const InterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: BackendUrlInterceptor, multi: true},
];
