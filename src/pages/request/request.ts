import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestconfirmPage } from '../requestconfirm/requestconfirm';
import { DbproviderProvider } from '../../providers/dbprovider/dbprovider';
/**
 * Generated class for the RequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request',
  templateUrl: 'request.html',
})
export class RequestPage {
  name : String;
  city : String ;
  phone : String;
  email :String;
  password : String;
  constructor(public navCtrl: NavController, public navParams: NavParams,private _signUp : DbproviderProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestPage');
  }
signUp(){
  // new user
  let user = {
    name : this.name,
    city : this.city,
    phone : this.phone,
    email :this.email,
    password : this.password
  }
  //calling service
this._signUp.signUp(user).then((value)=>{
if(value=='true')
  this.navCtrl.push(RequestconfirmPage);

 },) 
}
}
