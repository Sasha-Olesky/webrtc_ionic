import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable} from "rxjs";
import * as io from "socket.io-client";
import {ContactsPage} from "../contacts/contacts";

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

  socket : any;
  users : any[];
  constructor(public navCtrl: NavController) {

  }

  // showthis(){
  //   console.log("here it is ");
  //   this.socket = io('http://192.168.3.133:3000');
  //   console.log("here it is 1" + this.socket);
  //   var socketObserver = new Observable(observer => {
  //     this.socket.emit('login', 'rahul');
  //
  //     this.socket.on('login_successful', data =>{
  //       observer.next(data);
  //     });
  //
  //     console.log("here it is 3");
  //     this.socket.on('login_error', data =>{
  //       observer.next(data);
  //     });
  //
  //   });
  //
  //   socketObserver.subscribe( (success) => {
  //
  //     console.log("here it is 4");
  //     if(success !== 'This name already exists.'){
  //       console.log('all users' + success);
  //       this.setOnlineUsers(success, name);
  //       // finally nav to contacts page with all new users detail
  //       // this.navCtrl.push(ContactsPage, {success: success , socket: this.socket});
  //       this.goToPage4({success: success , socket: this.socket});
  //     }else {
  //       console.log(success);
  //     }
  //   });
  //
  // }

  login(name){

      this.socket = io('http://192.168.3.133:3000');

      var socketObserver = new Observable(observer => {
        this.socket.emit('login', name);

        this.socket.on('login_successful', data =>{
          observer.next(data);
        });

        this.socket.on('login_error', data =>{
          observer.next(data);
        });

      });

      socketObserver.subscribe( (success) => {

        if(success !== 'This name already exists.'){
          console.log('all users' + success);
          this.setOnlineUsers(success, name);
          // finally nav to contacts page with all new users detail
          // this.navCtrl.push(ContactsPage, {success: success , socket: this.socket});
          this.goToPage4({success: success , socket: this.socket});
        }else {
          console.log(success);
        }
      });

  }

  goToPage4(variable) {
    this.navCtrl.push(ContactsPage, variable).then(
      response => {
        console.log('Response ' + response);
      },
      error => {
        console.log('Error: ' + error);
      }
    ).catch(exception => {
      console.log('Exception ' + exception);
    });;
  }

  setOnlineUsers(success, name){
    this.users = success;
  }

}
