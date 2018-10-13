import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import{ LoginPage } from '../pages/login/login';
import { WelcomePage } from '../pages/welcome/welcome';
import { RequestPage } from '../pages/request/request';
import { MyApp } from './app.component';
import { RequestconfirmPage } from '../pages/requestconfirm/requestconfirm';
import { AppointmentPage } from '../pages/appointment/appointment';
import { TrackProvider } from '../providers/track/track';
import { PostsProvider } from '../providers/posts/posts';
import { DbproviderProvider } from '../providers/dbprovider/dbprovider';
import { AppointmentsPage } from '../pages/appointments/appointments';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation } from '@ionic-native/geolocation';


@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    RequestPage,
    RequestconfirmPage,
    AppointmentPage,
    AppointmentsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    RequestPage,
    RequestconfirmPage,
    AppointmentPage,
      AppointmentsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TrackProvider, 
    PostsProvider,
    PostsProvider,
    DbproviderProvider,
    
  
  ]
})
export class AppModule {}
