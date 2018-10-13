import { Injectable } from '@angular/core';
import PouchDB from 'pouchdb'
/*
  Generated class for the PostsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PostsProvider {

  constructor() {
    console.log('Hello PostsProvider Provider');

    this.testDB();
    this.testRemoteDB();
  }

  async testRemoteDB():Promise<void> {
    this.remoteDB = new PouchDB('http://localhost:5984/helloremot111e',{auth: {
      username: 'admin',
      password: 'nikhil007'
    }});

    try{
    await this.remoteDB.info();
    } catch(error) {
      console.log(error);
    }

    let writeDoc = {
      _id: 'sa111i',
      phoneNo: 11333111,
      who: 'are'
    };

    try {
    await this.remoteDB.put(writeDoc);
    } catch(error) {
      console.log(error);
    }

    let readDoc = await this.remoteDB.get('sa111i');
    console.log(readDoc);
    console.log(writeDoc);
  }

  async testDB():Promise<void> {
    this.db = new PouchDB('hello1');
    let writeDoc = {
      _id: 'sai',
      phoneNo: 11111,
      who: 'are'
    };
    await this.db.put(writeDoc);

    let readDoc = await this.db.get('sai');
    console.log(readDoc);
    console.log(writeDoc);
  }

  private db: PouchDB.Database;
  private remoteDB: PouchDB.Database;
}
