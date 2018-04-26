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
  public input2 :any;

  constructor(private http : HttpService,public toastMessages: ToastsManager
    , vcr: ViewContainerRef) { 
      this.toastMessages.setRootViewContainerRef(vcr);
    this.input={
      name : "",
      panel:"",
      phone_no:"",
      month_date : "",
      paid:"",
      street_no:"",
      ampere:"",
      amount:"",
      balance : ""
    };
    this.input2 = {
      employeeAmount : "",
    };
  }
  
  newdata;
  dataArray: any=[];
  dataVarId : any;
  amountValue : any;
  list : any =[];
  employeeEntryUrl = 'getAllEmployees';
  insertFee(){
      var url = 'customerFeeEntry';
      this.http.addData(url,this.input).subscribe(data1 => {
        if(data1.statusCode === 200){
          this.toastMessages.success('Data Has been Saved!', 'Saved!');
         this.dataArray = JSON.parse(localStorage.getItem("user"))
         for(let i=0; i < this.dataArray.length; i++ ){
          this.dataVarId =  this.dataArray[i].id;
         }
         
         this.http.getData(this.employeeEntryUrl).subscribe(employeeEntryData=>{
          // this.list.push( employeeEntryData.data);
          this.list = employeeEntryData.data;
          for(let i= 0 ; i < this.list.length;i++){
            if(this.list[i]._id === this.dataVarId){
              this.input2.employeeAmount = this.list[i].employeeAmount;
              this.updateLoginAmount(this.dataVarId,this.input2.employeeAmount);
            }
          }
        },err=>{
          console.log(err,"Oops It is an error");
        })

         
         
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

   
   
  updateLoginAmount(id, empAmount) {
   
    let paidAmount = empAmount;
    paidAmount += this.input.paid;
    var amountDummyObject = {
      employeeAmount : paidAmount
    };
    var url = 'employeeAmountUpdate/' + id;
    this.http.editData(url ,amountDummyObject).subscribe(data1 => {
      if (data1.statusCode !== 505) {
        this.toastMessages.success('Amount has been added to your account!', 'Updated!');
      }
      else {
        this.toastMessages.error('Error While Updating!', 'Error!!');
       
      }
    },
      err => {
        console.log(err, "error")
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
