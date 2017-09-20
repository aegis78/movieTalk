import { Component } from '@angular/core';
import { Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home'; 
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any = HomePage;

    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, loadingCtrl: LoadingController) {
        this.initializeApp();
    }
    
    initializeApp() {
        
        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                console.log("App.Componets === : login");
                this.rootPage = TabsPage;
            } else {
                console.log("App.Componets === : not login");                
                this.rootPage = LoginPage;
            }
        });
        
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
        
    }
}

