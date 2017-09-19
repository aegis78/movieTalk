import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
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
    
    private emailField:any;
    private passField:any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private loginService: LoginServiceProvider, private toastCtrl: ToastController, private alertCtrl: AlertController
                , private loadingCtrl: LoadingController) {
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
    
    showForgotPassword(){
        let prompt = this.alertCtrl.create({
            title: 'Enter Your Email',
            message: "가입하신 email로 새로운 비밀번호를 보내드립니다.",
            inputs: [
                {
                    name: 'recoverEmail',
                    placeholder: 'you@example.com'
                },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Submit',
                    handler: data => {


                        //add preloader
                        let loading = this.loadingCtrl.create({
                            dismissOnPageChange: true,
                            content: 'Reseting your password..'
                        });
                        loading.present();
                        //call usersservice
                        this.loginService.forgotPasswordUser(data.recoverEmail).then(() => {
                            //add toast
                            loading.dismiss().then(() => {
                                //show pop up
                                let alert = this.alertCtrl.create({
                                    title: 'Check your email',
                                    subTitle: 'Password reset successful',
                                    buttons: ['OK']
                                });
                                alert.present();
                            })

                        }, error => {
                            //show pop up
                            loading.dismiss().then(() => {
                                let alert = this.alertCtrl.create({
                                    title: 'Error resetting password',
                                    subTitle: error.message,
                                    buttons: ['OK']
                                });
                                alert.present();
                            })


                        });
                    }
                }
            ]
        });
        prompt.present();
    }
    
    emailPasswordAuth() {
        let loading = this.loadingCtrl.create({
            dismissOnPageChange: true            
        });
        loading.present();
        
        this.loginService.emailPasswordAuth(this.emailField, this.passField).then(()=>{
            let toast = this.toastCtrl.create({
                message: 'Login Successful',
                duration: 3000                
            });
            toast.present();
        }).catch(error=>{
            let alert = this.alertCtrl.create({
                title: 'Login Fail',
                subTitle: error.message,
                buttons: ['OK']
            }); 
            alert.present();
        })
        
        loading.dismiss();
    }
    
}
