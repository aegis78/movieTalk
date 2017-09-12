import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { GooglePlus } from '@ionic-native/google-plus';
import { Facebook } from '@ionic-native/facebook';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {
    
    private userProfile:any;
    
    constructor(public http: Http, private googlePlsu: GooglePlus, private facebook: Facebook) {
        console.log('Hello LoginServiceProvider Provider');
        this.userProfile = firebase.database().ref('users');
        
    }
   
    googlePlusLogin() {
        
        //var result:boolean = false;
        
        return this.googlePlsu.login({
            'webClientId': '679912936973-j6n9iohnqpesvobqrkm0kko4e3udn87b.apps.googleusercontent.com'
            //'webClientId': '679912936973-f0e0d1ssu1ff9fr6sb9u7chatncvup9b.apps.googleusercontent.com'
            
        });
        
        //return result;
        
    }
    
    fbLoginService() {
        return this.facebook.login(['email']).then (res=>{            
            const fc = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
            firebase.auth().signInWithCredential(fc);            
        }).catch(err=>{
           alert(JSON.stringify(err)); 
            
        });
        
    }
    
    firebaseUserInfo ( userUid:any ) {
        return firebase.database().ref('/users/' + userUid).once('value').then(function(snapshot) {});
    }
    
    isUser( userUid:any ) {
        
        var result = false;
        
        var userRef = this.userProfile.child(userUid);
        var value = userRef.once('value');
        
        console.log('isUser Value : '+ value);
        
        if( value.email ) {
            result = true;
        }
        
        return result;
        
    }
    
    
    
    
}
