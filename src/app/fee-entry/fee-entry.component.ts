import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {HttpService} from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-fee-entry',
  templateUrl: './fee-entry.component.html',
  styleUrls: ['./fee-entry.component.css']
})
export class FeeEntryComponent implements OnInit {

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
      ampere:"",
      amount:"",
      balance : ""
    };
  }
  
  newdata;
  insertFee(){
      var url = 'customerFeeEntry';
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

    findAmount(){
      this.input.amount = this.input.ampere * 2000;
     this.input.balance =  this.input.amount - this.input.paid
    }
    findBalance(){
     this.input.balance =  this.input.amount - this.input.paid
    }


  ngOnInit() {
  } 
 
}
