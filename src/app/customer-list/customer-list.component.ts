import { Component, OnInit,ViewContainerRef,Renderer,ElementRef} from '@angular/core';
import {HttpService} from '../services/http.service';
import {CalculationService} from '../services/calculation.service';
import {CalculationCustomerService} from '../services/calculationCustomerList.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { timeout } from 'q';
import {CustomerListPipe} from '../pipes/cutomerListPipe.pipe';

@Component({ 
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  public input : any;
  public inputModal : any;
  public recordsId : any;
  searchableList : any = [];
  public dummy_array : any = [];
  

  constructor(private http : HttpService,public toastMessages: ToastsManager
    , vcr: ViewContainerRef,private calculation : CalculationCustomerService
  ,private renderer : Renderer, private elemRef : ElementRef) {
      this.toastMessages.setRootViewContainerRef(vcr);
      this.inputModal={
        name : "",
        panel:"",
        phone_no : "",
        paid : "",
        street_no:"",
        start_month : "",
        ampere :"",
        amount:""
      } 
      this.searchableList = ['name','panel','phone_no','street_no','start_month'] ;
     }
  url = 'getAllEntries';
  
  list;
  getCustomerList(){
     this.http.getData(this.url).subscribe(data1=>{
      this.list = data1.data;
      // this.totalAmpere(this.list);
      // this.totalPaid(this.list);
     this.http.getData(this.fee_list_url).subscribe(data1=>{
        this.fee_list = data1.data;
        this.checkingComparision(this.list,this.fee_list);
      },err=>{console.log("Error while catching fee list data")})
    },
    err=>{
      console.log(err,"Oops It is an error");
    })
  }

  onUpdate(items){
    this.inputModal.name = items.name;
    this.inputModal.panel = items.panel;
    this.inputModal.phone_no = items.phone_no;
    this.inputModal.paid = items.paid;
    this.inputModal.street_no = items.street_no;
    this.inputModal.start_month = items.start_month;
    this.inputModal.ampere = items.ampere;
    this.inputModal.amount = items.amount;
    this.recordsId  = items._id;
  }


  deleteCustomerData(item,index){
      var url = 'customerEntryDelete/'+item._id;
      this.addToDefaulters(item);
     
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
    
        // Updating
        editPopUpRecords(){
          this.updateModalRecords(this.recordsId , this.inputModal);
        }
        updateModalRecords(id,items){
          var url = 'customerEntryUpdate/'+id;
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

      // Key Up  Functions
    
findAmount(){
    this.inputModal.amount = this.inputModal.ampere * 2000;
  }
  
  //  Total Ampere
  // public total_ampere = 0;
  // totalAmpere(list){
  //     for(let i=0; i < list.length; i++){
  //       this.total_ampere = this.total_ampere + this.list[i].ampere;
  //     }
  // }
  // Total Customers Payment
  // public total_paid = 0;
//   totalPaid(list){
//     for(let i=0; i < list.length; i++){
//       this.total_paid = this.total_paid + this.list[i].paid;
//     }
// }
  // checking customers comparision
  fee_list_url = 'getAllCustomerFee';
  fee_list;
  // getFeeList() {
  //   return this.http.getData(this.fee_list_url).subscribe(data1 => {
  //     this.fee_list = data1.data;

  //   }, err => {
  //     console.log(err, "Oops It is an error");
  //   })
  // }
  checkingColor(index){
    
  }
   mydate = new Date();
  //  check = false;
   mlist = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
  checkingComparision(customerList,feeList){
    for(let i =0; i < customerList.length;i++){
      for(let j=0; j < feeList.length;j++){
        if(customerList[i].name == feeList[j].name
        && customerList[i].phone_no == feeList[j].phone_no
        && customerList[i].panel == feeList[j].panel
        && feeList[j].month == this.mlist[this.mydate.getMonth()]
      ){
        customerList[i].checked = true;
     
          // this.renderer.setElementStyle(this.elemRef.nativeElement,'backgroundColor','sandybrown');
          // this.check = true;
        }
        else{
          customerList[i].check = false;
          customerList[i].object = {
            Name : customerList[i].name,
            panel :customerList[i].panel,
            phone_no : customerList[i].phone_no,
            paid : customerList[i].paid,
            street_no : customerList[i].street_no,
            ampere : customerList[i].ampere,
            amount : customerList[i].amount
          };
            this.dummy_array.push(customerList[i].object);
        }
      }
      
    }
    console.log(this.dummy_array);
  }
  ngOnInit() {
    this.getCustomerList();
  }

}
