import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SyncServicesProvider} from '../../providers/sync-services/sync-services';
import {Toast} from '@ionic-native/toast';
import {HomePage} from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 * https://stackoverflow.com/questions/44614255/ionic-2-login-with-laravel-5-4-as-backend
 * https://scotch.io/tutorials/token-based-authentication-for-angularjs-and-laravel-apps
 * https://forum.ionicframework.com/t/authentication-ionic-laravel/95346/6
 * https://www.baljeetsingh.in/blog/build-an-app-with-ionic-framework-and-laravel-602/
 * https://stackoverflow.com/questions/30767020/trying-to-connect-ionic-app-to-a-laravel-api.
 * https://khcode.net/ionic/ionic-3-crud-with-laravel-backend
 * https://github.com/sandrobocon/laravel54-ionic3
 * https://blog.ng-classroom.com/blog/ionic2/rest-api-with-ionic/
 *
 * https://www.djamware.com/post/58c1703e80aca7585c808ec1/step-by-step-tutorial-building-ionic-2-rest-api-authentication
 *
 * https://www.youtube.com/watch?v=6VEdjbuE9As
 * https://github.com/AlbertoIHP/angular4Laravel5Ionic3
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public syncService: SyncServicesProvider, private toast: Toast) {
    console.log('LoginPage - constructor');
  }

  ionViewDidLoad() {
    console.log('LoginPage - ionViewDidLoad');
  }

  checkLogin() {
    console.log('LoginPage - checkLogin');
    this.syncService.checkLogin(this.user)
      .then((res: any) => {
        console.log(res);
        if (res.id) {
          this.navCtrl.push(HomePage, {user_id: res.id});
        } else {
          this.toast.show('Usuario incorrecto', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            });
        }
      })
      .catch(e => {
      console.log(e);
      this.toast.show(e, '5000', 'center').subscribe(
        toast => {
          console.log(toast);
        });
      });
  }

}
