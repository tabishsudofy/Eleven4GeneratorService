import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {HttpService} from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';


@Component({
  selector: 'app-fee-list',
  templateUrl: './fee-list.component.html',
  styleUrls: ['./fee-list.component.css']
})
export class FeeListComponent implements OnInit {

  public input : any;
  public recordsId : any;


  constructor(private http : HttpService,public toastMessages: ToastsManager
    , vcr: ViewContainerRef) { 
      this.toastMessages.setRootViewContainerRef(vcr);
      this.input={
        name: "",
        panel : "",
        phone_no : "",
        month : "",
        paid : "",
        street_no : "",
        ampere : "",
        amount : "",
        balance : ""
      }
    }
  date = new Date();

  url = 'getAllCustomerFee';
  
  list;
  getFeeList(){
    return this.http.getData(this.url).subscribe(data1=>{
      this.list = data1.data;
      
    },err=>{
      console.log(err,"Oops It is an error");
    })
  }
  refresh(){
    location.reload();
  }
  deleteFeeData(id,index){
   
      var url = 'customerFeeDelete/'+id;
      this.http.deleteData(url).subscribe(data1 => {
       if(data1.statusCode === 200){
        this.toastMessages.success('Data Has been Deleted!', 'Deleted!');
        this.list.splice(index, 1);
       }
       else{
        this.toastMessages.error('Error While Deleting!', 'Error!!');
       }
       
      },
        err => {
          console.log(err, "error")
        }
      )
    }
    onClick(items,index){
      this.deleteFeeData(items._id,index);
    }
    onUpdate(items){
    
      this.input.name = items.name;
      this.input.panel = items.panel;
      this.input.phone_no = items.phone_no;
      this.input.month = items.month;
      this.input.paid = items.paid;
      this.input.street_no = items.street_no;
      this.input.ampere = items.ampere;
      this.input.amount = items.amount;
      this.input.balance = items.balance;
      this.recordsId = items._id;
    }
    editPopUpRecords(){
      this.updateModalRecords(this.recordsId,this.input);
    }
    list2;
    updateModalRecords(id,items){
      var url = 'customerFeeUpdate/'+id;
      this.http.editData(url,items).subscribe(data1 => { 
        if(data1.statusCode !== 505){
          this.toastMessages.success('Data Has been Updated!', 'Updated!');
          location.reload();
        }
        else{
          this.toastMessages.error('Error While Updating!', 'Error!!');
          console.log(data1, "Data not save")
        }
     },
      err => {
        console.log(err, "error")
      }
    )
  } 
  check(index){
    if(this.list[index].balance !== 0 ){
      return true;
    }
    else{
      return false;
    }
  }
  findAmount(){
    this.input.amount = this.input.ampere * 2000;
    this.input.balance =  this.input.amount - this.input.paid
  }
  findBalance(){
    console.log("balance")
    this.input.balance =  this.input.amount - this.input.paid
   }
 
  ngOnInit() {
  this.getFeeList();

  }

}
