import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {SQLite} from '@ionic-native/sqlite';
import {DatabaseServiceProvider} from '../providers/database-service/database-service';

import {HomePage} from '../pages/home/home';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any = HomePage;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public databaseService: DatabaseServiceProvider, public sqlite: SQLite) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            //splashScreen.hide();
            this.createDatabase();
        });
    }

    private createDatabase() {
        this.sqlite.create({
            name: 'gclsis.db',
            location: 'default' // the location field is required
        })
            .then((db) => {
                this.databaseService.setDatabase(db);
                this.databaseService.createTables();
            })
            .then(() => {
            this.splashScreen.hide();
                this.rootPage = 'HomePage';
            })
            .catch(error => {
                console.log(error);
            });
    }

}

