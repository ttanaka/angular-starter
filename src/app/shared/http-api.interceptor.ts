import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpResponse,
  HttpHeaderResponse,
  HttpErrorResponse,
  HttpHeaders,
  HttpSentEvent,
  HttpEventType,
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';

@Injectable()
export class HttpApiInterceptor implements HttpInterceptor {
  readonly domain: string = environment.domain;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const req = request.clone({
      url: this.domain + request.url,
    });
    return next.handle(req)
            .do((event: HttpEvent<any>) => {
              console.log('event', event);
              if (event.type === HttpEventType.Sent) {
                console.log('sent');
              }
              // マッチしない（普通にHttpResponseに変換されている）
              if (event.type === HttpEventType.ResponseHeader) {
                console.log('header');
              }
              return event;
            })
            .catch((err: any, caught) => {
              console.log('cahtch', err);
              return Observable.throw(err);
            });
  }
}