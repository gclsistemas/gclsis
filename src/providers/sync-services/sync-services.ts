import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DatabaseServiceProvider} from '../../providers/database-service/database-service';

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

  constructor(public http: HttpClient, public databaseService: DatabaseServiceProvider) {
    console.log('SyncServicesProvider - constructor');
  }

  checkLogin(data: any) {
    console.log('SyncServicesProvider - checkLogin');
    let url = this.apiUrl + 'checklogin';
    let httpHeaders = this.httpHeaders;
    return new Promise(resolve => {
      /*this.http.post(url, data, {headers: httpHeaders}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });*/
      this.http.get(url, {headers: httpHeaders, params: data}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
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

  upload(user_id) {
    // http://www.nikola-breznjak.com/blog/codeproject/posting-data-from-ionic-app-to-php-server/
    // http://www.nikola-breznjak.com/blog/javascript/ionic3/posting-data-ionic-3-app-php-server/
    // https://ampersandacademy.com/tutorials/materialize-css/send-data-and-receive-data-in-the-ionic-2-framework-using-angular2-http-post-method
    console.log('SyncServicesProvider - upload');
    // let url = this.apiUrl + 'upload/' + user_id;
    let url = this.apiUrl + 'upload';
    let httpHeaders = this.httpHeaders;
    // let body: any = JSON.stringify({lista: pedidos, user_id: user_id});
    let body: any = {lista: this.databaseService.getPedidosForWebUpload(), user_id: user_id};
    return new Promise(resolve => {
      this.http.post(url, body,{headers: httpHeaders}).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

}
