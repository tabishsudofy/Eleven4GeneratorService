import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-bank',
  templateUrl: './employee-bank.component.html',
  styleUrls: ['./employee-bank.component.css']
})
export class EmployeeBankComponent implements OnInit {
  public localData :any =[];
  name:any=[];
  constructor() {
   this.localData = JSON.parse(localStorage.getItem("user"));
   for(let i=0; i < this.localData.length;i++){
    this.name = this.localData[i].name;
   }
   
  }
 
 
  ngOnInit() {
  }

}
