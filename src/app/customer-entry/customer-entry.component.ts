import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {HttpService} from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-customer-entry',
  templateUrl: './customer-entry.component.html',
  styleUrls: ['./customer-entry.component.css']
})
export class CustomerEntryComponent implements OnInit {

  public input :any;
  constructor(private http : HttpService,public toastMessages: ToastsManager
    , vcr: ViewContainerRef) { 
      this.toastMessages.setRootViewContainerRef(vcr);
    this.input={
      name : "",
      panel:"",
      phone_no:"",
      paid:"",
      street_no:"",
      start_month:"",
      ampere:"",
      amount:""
    };
  }
   
  newdata;
  insertCustomer(){
      var url = 'saveCustomerEntry';

      this.http.addData(url,this.input).subscribe(data1 => {
        if(data1.statusCode === 200){
          this.toastMessages.success('Data Has been Saved!', 'Saved!',1000);
        }
        else{
          this.toastMessages.error('Something went wrong!', 'Error!!',{timeout:2000});
        }
      },
        err => {
          console.log(err, "error");
        }
      )
    }
    findAmount(){
      this.input.amount = this.input.ampere * 2000;
    }

  ngOnInit() {
  }
 
}
