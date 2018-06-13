import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {HttpClientModule} from '@angular/common/http';
import {DatabaseServiceProvider} from '../providers/database-service/database-service';
import {SyncServicesProvider} from '../providers/sync-services/sync-services';
import {SQLite} from '@ionic-native/sqlite';
import {Toast} from '@ionic-native/toast';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {AddPedidoPage} from '../pages/add-pedido/add-pedido';
import {EditPedidoPage} from "../pages/edit-pedido/edit-pedido";
import {ClientePage} from "../pages/cliente/cliente";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ClientePage,
    AddPedidoPage,
    EditPedidoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ClientePage,
    AddPedidoPage,
    EditPedidoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseServiceProvider,
    SyncServicesProvider,
    SQLite,
    Toast
  ]
})
export class AppModule {
}
