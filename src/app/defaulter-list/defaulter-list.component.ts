import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {HttpService} from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-defaulter-list',
  templateUrl: './defaulter-list.component.html',
  styleUrls: ['./defaulter-list.component.css']
})
export class DefaulterListComponent implements OnInit {
  public inputModal : any;
  public recordsId : any;
  constructor(private http : HttpService,public toastMessages: ToastsManager
    , vcr: ViewContainerRef) { 
      this.toastMessages.setRootViewContainerRef(vcr);
      this.inputModal={
        name : "",
        panel:"",
        phone_no : "",
        paid : "",
        street_no:"",
        start_month : "",
        ampere :"",
        amount:"",
        remarks : ""
      }
    }

  url = 'getAllDefaulters';
  list;
  getDefaulterList(){
    return this.http.getData(this.url).subscribe(data1=>{
      this.list = data1.data;
      console.log(data1);
    },err=>{
      console.log(err,"Oops It is an error");
    })
  }

  deleteDefaulterData(id,index){
    console.log(id+"this is an id ");
      var url = 'deleteDefaulters/'+id;
      this.http.deleteData(url).subscribe(data1 => {
       if(data1.statusCode === 200){
        this.toastMessages.success('Data Has been Deleted!', 'Deleted!');
         this.list.splice(index,1);
       }
       else{
        this.toastMessages.error('Error While Deleting!', 'Deleted!');
       }
       
      },
        err => {
          console.log(err, "error")
        }
      )
    }
    // Updating
    onUpdate(items){
      this.inputModal.name = items.name;
      this.inputModal.panel = items.panel;
      this.inputModal.phone_no = items.phone_no;
      this.inputModal.paid = items.paid;
      this.inputModal.street_no = items.street_no;
      this.inputModal.start_month = items.start_month;
      this.inputModal.ampere = items.ampere;
      this.inputModal.amount = items.amount;
      this.inputModal.remarks = items.remarks;
      this.recordsId  = items._id;
    }
    editPopUpRecords(){
      this.updateModalRecords(this.recordsId , this.inputModal);
    }
    updateModalRecords(id,items){
      var url = 'defaulterEntryUpdate/'+id;
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

  // Update End
 
refresh(){
  location.reload();
}
onClick(item,index){
  this.deleteDefaulterData(item._id,index);
}
findAmount(){
  this.inputModal.amount = this.inputModal.ampere * 2000;
}

  ngOnInit() {
    this.getDefaulterList();
  }

}
