import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbproviderProvider } from '../../providers/dbprovider/dbprovider';
import { AppointmentPage } from '../appointment/appointment';
/**
 * Generated class for the AppointmentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-appointments',
  templateUrl: 'appointments.html',
})


export class AppointmentsPage {
 name : String;
 city : String;
 contact : String;
 status : String;
 assign : String;

  constructor(public navCtrl: NavController , public navParams: NavParams,private _signup : DbproviderProvider) {
  }
  ionViewDidLoad() {
  }
onAdd(){
 let appointmentData = {
   name : this.name ,
  city : this.city ,
  contact : this.contact ,
  status : this.status ,
  assign : this.assign ,
 }
this._signup.updateAppointment(appointmentData).then(
(value)=>{if(value){
  this.navCtrl.push(AppointmentPage)}},
)
 
}
back(){
  this.navCtrl.push(AppointmentPage);
}
}
