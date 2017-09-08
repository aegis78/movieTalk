import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import firebase from 'firebase';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyBqAEgi6HSIpHwDsndcPis41LVuFUBarX4",
            authDomain: "movietalk-56761.firebaseapp.com",
            databaseURL: "https://movietalk-56761.firebaseio.com",
            projectId: "movietalk-56761",
            storageBucket: "movietalk-56761.appspot.com",
            messagingSenderId: "679912936973"
        };        
        firebase.initializeApp(config);
        // End Firebase
        firebase.auth().onAuthStateChanged((user) => {


            if (!user) {

                console.log("not login");
                this.rootPage = LoginPage;


            } else {
                console.log("login");
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
