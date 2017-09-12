import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { GooglePlus } from '@ionic-native/google-plus';
import firebase from 'firebase';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, googlePlus: GooglePlus) {
        
        firebase.auth().onAuthStateChanged((user) => {

            if (!user) {
                console.log("App.Componets === : not login");
                this.rootPage = LoginPage;
            } else {
                console.log("App.Componets === : login");                
                this.rootPage = TabsPage;
            }

        });
        

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
