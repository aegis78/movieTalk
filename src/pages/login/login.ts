import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { TabsPage } from '../../pages/tabs/tabs';
import { RegisterPage } from '../../pages/register/register';
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

    constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginServiceProvider, private toastCtrl: ToastController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
    
    googleLogin() {
        this.loginService.googlePlusLogin().then(res=> {
            firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(res.idToken))
            .then(result=>{
                console.log(JSON.stringify(result.uid));                
                this.goPage(result.uid);                
            }).catch (error=>{
                let toast = this.toastCtrl.create({
                    message: 'GooglePlus Login Fail',
                    duration: 3000                
                });
                toast.present();
            });
        });
    }
    
    facebookLogin() {
        this.loginService.fbLoginService().then(result=>{
            console.log(JSON.stringify(result));
                     
        }).catch(ferr=>{
            
        });
    }
    
    goPage( userUid:any ) {
        var isUser = this.loginService.isUser( userUid );
        
        console.log('isUser : '+ isUser);
        
        if ( !isUser ) {
            this.navCtrl.setRoot(RegisterPage);            
        } else {
            this.navCtrl.setRoot(TabsPage);
            
        }
    }
    
}
