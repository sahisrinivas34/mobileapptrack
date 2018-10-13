import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb';
import { TrackProvider } from '../../providers/track/track';
import moment from 'moment';
var nameid : string;
var checkfirst : boolean = true;
var lastdata : {lat : any ,lng:any} = {lat :0,lng :0}
var starttime;
var endtime;

@Injectable()
export class DbproviderProvider {

  constructor() {
    this.initDatabases();
  }
  public async signUp(data): Promise<String> {
    //check unique user name
    console.log(data);
    let bUnique: boolean = false;
    try {
    await this.remoteUsersDB.get(data.name);
    //not unique
    } catch(error) {
      //no internet
      if(error.reason === 'missing' || error.reason === 'deleted'){
//no document/deleted so unique
bUnique = true;
      } else if(error.code === 'EHOSTUNREACH' || error.code === 'ENETUNREACH') {
        throw 'No Internet. Try Again.';
      }
      
    }

    if(!bUnique) {
      throw 'Enter Unique Username';
    }

    data._id = data.name;
    try {
    this.remoteUsersDB.put(data);  
    } catch(error) {
      throw 'Sign Up Failed. Try Again';
    }
    //if unique username continue and write to database

    return 'true';

  };
//login 
  public async logIn(data): Promise<boolean> {
    let userDoc;
    try{
userDoc = await this.localUsersDB.get(data.name);
    } catch(error) {
      if(error.reason === 'missing' || error.reason === 'deleted'){
        //no document/deleted so unique
        throw 'User doesnot exist, Please SignUp before login';
              }
throw 'Unknown Reason, Try agian.';
    }
    nameid =userDoc.name;
return userDoc.password === data.password;
    
  };
  //location tracking
  public async tracklocation(data) : Promise<void>{
   let date = moment().format('DDMMYY')
   let userdoc;
   let bcheck  : boolean=false;
   try{
     userdoc = await this.localActivityDB.get(nameid);
   bcheck=true;}
   catch(error){
     if(error.reason==='missing'|| error.reason==='deleted'){
      userdoc= await this.localActivityDB.put({_id:nameid});
      bcheck=true;
     }else{
        console.log('unknown reason');
     }
}
if(bcheck){
   let obj=userdoc;
   let time = moment(moment());
    if(userdoc[date]){
      let bUpdate=false;
    if(lastdata.lat!=data.lat && lastdata.lng!=data.lng){
      let tempArray=[data.lat,data.lng];
      if(bUpdate){
        tempArray = [data.lat,data.lng,time.valueOf()];
        bUpdate=false;
      }
       let datatosend = {[time.valueOf()] : tempArray}
      obj[date].push(datatosend);
      console.log(obj);
       await this.localActivityDB.put(obj); 
       lastdata = data;
       starttime = time; 
      }else{
      //   if(!bUpdate){
      //     let datatoprev = obj[date][starttime.valueOf()];
      //     datatoprev.push(time.valueOf());
      //     console.log(datatoprev)
      //     obj[date] = datatoprev; 
      //     console.log("sameloc"+obj)
      // await this.localActivityDB.put(obj);
      // bUpdate=true;
      
        }
      //  let difference = this.getTimeInterval(starttime,moment(moment(),'HH:mm:ss'));
       
      }
    else{
      obj[date]=[];
       await this.localActivityDB.put(obj);
    }
      };
}
getTimeInterval( startTime,endTime){
  var duration = moment.duration(endTime.diff(startTime));
return Math.round(duration.as('h'))+":"+Math.round(duration.as('m'));
  }
  
  //appointment add
 public async updateAppointment(data): Promise<boolean> {
    data._id = nameid+"_"+data.name;
    try{
    await this.localMainDB.put(data);
    } catch(error) {
      throw 'updateAppointment::Not Expected To Come Here.'
    }

return true;
  };
  public async deleteAppointment(doc) : Promise <any>{
   
    this.localMainDB.get(doc).then( (doc)=>{
      // doc._deleted = true;
     return this.localMainDB.put(doc) ;
     

     },(err)=>{console.log(err)});
    
}
  //get appointments
 public async getAppointmentlist() : Promise<any>{
  try{
   let data  = await this.localMainDB.allDocs({include_docs: true})
   return data;
  }
  catch(error){
    throw 'Unable to get list'
  }
 };
private async initDatabases(): Promise<void> {
    //creating local users and main database
    this.localUsersDB = new PouchDB(this.USERS_DB_NAME); // name of db 
    this.localMainDB = new PouchDB(this.MAIN_DB_NAME);
    this.localActivityDB = new PouchDB(this.ACTIVITY_DB_NAME);

    //creating remote users and main database
    let remoteUsersDBUrl = this.formRemoteDBUrl(this.REMOTE_COUCH_SERVER_URL,this.USERS_DB_NAME);
    this.remoteUsersDB = new PouchDB(remoteUsersDBUrl, {auth: this.REOMTE_AUTH});
    let remoteMainDBUrl = this.formRemoteDBUrl(this.REMOTE_COUCH_SERVER_URL,this.MAIN_DB_NAME);
    this.remoteMainDB = new PouchDB(remoteMainDBUrl, {auth: this.REOMTE_AUTH});
    let remoteActivityDBurl = this.formRemoteDBUrl(this.REMOTE_COUCH_SERVER_URL,this.ACTIVITY_DB_NAME);
    this.remoteActivityDB = new PouchDB(remoteActivityDBurl,{auth : this.REOMTE_AUTH });
    //sync local and remote users and main database
    let syncOptions = {
      live: true,
      retry: true
    };
    this.localUsersDB.sync(this.remoteUsersDB, syncOptions);
    this.localMainDB.sync(this.remoteMainDB, syncOptions);
    this.localActivityDB.sync(this.remoteActivityDB,syncOptions)
    
  };

  public registerForChanges(callback) {
this.listener = callback;
  };

  private async listen2Changes(): Promise<void> {
    this.localMainDB.changes({
      live: true,
      include_docs: true
    }).on('change', function(change) {
  
      this.listener(change);
    
    }) 
  };

  private formRemoteDBUrl(remoteServerUrl:string, dbName: string): string {
    return remoteServerUrl + '/'+ dbName;
  };


  private readonly USERS_DB_NAME:string = 'users';
  private readonly MAIN_DB_NAME:string = 'main';
  private readonly ACTIVITY_DB_NAME : string = 'activity'
  private readonly REMOTE_COUCH_SERVER_URL: string = 'http://localhost:5984';
  private readonly REOMTE_AUTH: {
    username: string;
    password: string;
  } = {username: 'admin', password: 'nikhil007'};
  
  private localUsersDB: PouchDB.Database;
  private remoteUsersDB: PouchDB.Database;
  private localMainDB: PouchDB.Database;
  private remoteMainDB: PouchDB.Database;
  private localActivityDB : PouchDB.Database;
  private remoteActivityDB : PouchDB.Database;

  private listener;
  
}
