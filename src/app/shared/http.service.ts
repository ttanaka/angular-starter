import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  get() {
    this.httpClient.get(`http://localhost:3000/api/test`, {
      observe: 'body',
      responseType: 'text',
    })
      .subscribe(
        response => {
          console.log('レスポンスが返ってきた', response);
        }
      );
  }
}
