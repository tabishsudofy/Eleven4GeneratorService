import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {HttpService} from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Component({
  selector: 'app-employee-entry',
  templateUrl: './employee-entry.component.html',
  styleUrls: ['./employee-entry.component.css']
})
export class EmployeeEntryComponent implements OnInit {

  public input :any;
  constructor(private http : HttpService,public toastMessages: ToastsManager
    , vcr: ViewContainerRef) { 
      this.toastMessages.setRootViewContainerRef(vcr);
    this.input={
      employeeName : "",
      employeePassword:"",
      employeeCnic:"",
      employeeContact:"",
      employeeAdress:"",
      employeeAmount:"0",
      employeeJoinMonth:"",
      type:""
    };
  }
  
  newdata;
  insertEmployee(){
      var url = 'saveEmployeeEntry';
      console.log(this.input);
      this.http.addData(url,this.input).subscribe(data1 => {
        if(data1.statusCode === 200){
          this.toastMessages.success('Data Has been Saved!', 'Saved!');
        }
        else{
          this.toastMessages.error('Something went wrong!', 'Error!!');
        }
      },
        err => {
          console.log(err, "error");
        }
      )
    }

  ngOnInit() {
  }

}
