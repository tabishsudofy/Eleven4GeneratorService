import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {HttpService} from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public input : any;
  constructor(private http : HttpService,public toastMessages: ToastsManager
    , vcr: ViewContainerRef) {
      this.toastMessages.setRootViewContainerRef(vcr);
     
     }
  url = 'getAllEntries';
  
  list;
  getCustomerList(){
    return this.http.getData(this.url).subscribe(data1=>{
      this.list = data1.data;
      console.log(data1);
    },err=>{
      console.log(err,"Oops It is an error");
    })
  }


  deleteCustomerData(item,index){
    console.log(item._id+"this is an id ");
      var url = 'customerEntryDelete/'+item._id;
      this.addToDefaulters(item);
      console.log(item)
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
refresh(){
  location.reload();
}
defaultersData;
addToDefaulters(item){
 this.input={
    name : item.name,
    panel:item.panel,
    phone_no:item.phone_no,
    paid:item.paid,
    street_no:item.street_no,
    start_month:item.start_month,
    ampere:item.ampere,
    amount:item.amount,
    remarks : "No Remarks Exist"

  };
      var url = 'saveDefaulterEntry';
      console.log(this.input);
      this.http.addData(url,this.input).subscribe(data1 => {
        if(data1.statusCode === 200){
          this.toastMessages.success('Data has been entered in Defaulter List!', 'Saved!');
          
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
onClick(item, index){
//  this.addToDefaulters(item);
  this.deleteCustomerData(item, index);
 
}
      // add to defaulters

      newdata;
      insertFee(){
          var url = 'saveDefaulterEntry';
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
    this.getCustomerList();
  }

}
