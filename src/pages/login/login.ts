import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestPage } from '../request/request';
import { AppointmentPage } from '../appointment/appointment';
import {DbproviderProvider} from '../../providers/dbprovider/dbprovider';
import { TrackProvider } from '../../providers/track/track'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  uname : String;
  password : String;
  latitude : number;
  longitude : number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _dbprovider : DbproviderProvider,public _tp : TrackProvider) {
  }
    

      
    
 
 ionViewDidLoad() {
  console.log('ionViewDidLoad LoginPage');
  }
  onSignIn(){
    //verify username and password/get api token
    let signinvars = {
      name : this.uname,
      password : this.password
    }  
    this._dbprovider.logIn(signinvars).then((value)=>{
      if(value){
        
      this.navCtrl.push(AppointmentPage,); 
      }
    },(err)=>{
      console.log(err);
    })
}
  onSignUp(){
    //send data though api
    this.navCtrl.push(RequestPage,);
  }

}
