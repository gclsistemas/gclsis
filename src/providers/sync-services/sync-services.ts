import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';

/*
  Generated class for the SyncServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SyncServicesProvider {

  private apiUrl = 'https://gclsistemas.com.ar/pedidosclientes/';
  private httpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT'
  });

  constructor(public http: HttpClient) {
    console.log('SyncServicesProvider - constructor');
  }

  download(user_id) {
    console.log('SyncServicesProvider - download');
    let url = this.apiUrl + 'download/' + user_id;
    let httpHeaders = this.httpHeaders;
    return new Promise(resolve => {
      this.http.get(url, {headers: httpHeaders}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
    //return this.http.get(url, this.httpHeaders);
  }

}
