import { Component ,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrackProvider } from '../../providers/track/track';
import { AppointmentsPage } from '../appointments/appointments';
import { DbproviderProvider } from '../../providers/dbprovider/dbprovider';
import { LoginPage } from '../login/login'
@IonicPage()
@Component({
  selector: 'page-appointment',
  templateUrl: 'appointment.html',
})

export class AppointmentPage {
   items : any ;
   latitude : number;
   longitude : number;
  constructor(public navCtrl: NavController,public _tp :TrackProvider ,public navParams: NavParams,private _dbprovider : DbproviderProvider) {
    this._tp.onStart();
    this.latitude =this._tp.lat;
    this.longitude =this._tp.lng;
     this._dbprovider.getAppointmentlist().then((value)=>{
     this.items= value.rows;
            });  
 }
onget(){
  this.navCtrl.push(AppointmentPage);
}
createAppointment(){
    this.navCtrl.push(AppointmentsPage);

  }
  deleteap(data){
    console.log(data);
    this._dbprovider.deleteAppointment(data);
    this.navCtrl.push(AppointmentPage);
    this.navCtrl.push(AppointmentPage);
  }


}
