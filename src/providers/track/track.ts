
import { Injectable , NgZone } from '@angular/core';
import 'rxjs/add/operator/filter';
import { BackgroundGeolocation,BackgroundGeolocationConfig  } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { DbproviderProvider } from '../../providers/dbprovider/dbprovider';
import { AppointmentPage } from '../../pages/appointment/appointment';
import { LoginPage } from '../../pages/login/login';
@Injectable()
export class TrackProvider {
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  public date = new Date();
  constructor(public zone: NgZone,public _dbprovider : DbproviderProvider,private backgroundGeolocation: BackgroundGeolocation,private geolocation: Geolocation) {
  
  }
 public async onStart(){
   // Background Tracking
 
   let config = {
    desiredAccuracy: 0,
    stationaryRadius: 20,
    distanceFilter: 10,
    debug: true,
    interval: 2000
  };
 
  this.backgroundGeolocation.configure(config).subscribe((location) => {
 
    console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
 
    // Run update inside of Angular's zone
    this.zone.run(() => {
      this.lat = location.latitude;
      this.lng = location.longitude;
    });
 
  }, (err) => {
 
    console.log(err);
 
  });
 
  // Turn ON the background-geolocation system.
  this.backgroundGeolocation.start();
 
 
  // Foreground Tracking
 
let options = {
  frequency: 3000,
  enableHighAccuracy: true
};
 
this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
 
  console.log(position);
 
  // Run update inside of Angular's zone
  this.zone.run(() => {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  });
 
});
setInterval(()=>{
  this._dbprovider.tracklocation({lat:this.lat,lng:this.lng});
},3000)
    
 }   
    onStop(){
    console.log('stopTracking');
   this.backgroundGeolocation.finish(); //stop bglocation track
    this.watch.unsubscribe(); // stop foreground track
  }
}