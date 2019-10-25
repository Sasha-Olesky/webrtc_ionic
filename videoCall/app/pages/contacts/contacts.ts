import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Observable} from "rxjs";
declare var cordova : any;

/*
  Generated class for the ContactsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/contacts/contacts.html',
})
export class ContactsPage {

  users : any [];
  socket : any;
  session: any;

  constructor(private navParam : NavParams) {
    this.users = navParam.get('success');
    this.socket = navParam.get('socket');
  }


  call(isInitiator, contactName) {
    console.log(new Date().toString() + ': calling to ' + contactName + ', isInitiator: ' + isInitiator);

    // creatting config for turn server
    var config = {
      isInitiator: isInitiator,
      turn: {
        host: 'turn:ec2-54-68-238-149.us-west-2.compute.amazonaws.com:3478',
        username: 'test',
        password: 'test'
      },
      streams: {
        audio: true,
        video: true
      }
    };


    // creating session for phonertc if it is made then we can make call
    var sessionObservable = Observable.create( (observer) =>{

      console.log(config)
      var session = new cordova.plugins.phonertc.Session(config);

      console.log('session is created !!');

        session.on('sendMessage', (data) => {
          this.socket.emit('sendMessage', contactName, {
            type: 'phonertc_handshake',
            data: JSON.stringify(data)
          });
          console.log('handshakr is complete !!');
          observer.next(data);
        });

        this.session.on('answer', (data) => {
          console.log('Answered!');
          observer.next(data);
        });

        this.session.on('disconnect', (data) => {

          this.socket.emit('sendMessage', contactName, { type: 'ignore' });

          observer.next(data);
        });

    });

    sessionObservable.subscribe(data => {

      console.log("data for making call " + data);
      this.session.call();
    });

  }






}
