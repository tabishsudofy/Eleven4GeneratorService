import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 input = {
  username : '',
  password : ''
 };

  constructor() { }
 onClick(){
   console.log(this.input);
   if(this.input.username =="Admin" && this.input.password == "123"){
     window.location.href="/dashboard";
   }
 }
  ngOnInit() {
  }

}
