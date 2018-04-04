import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {HttpService} from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private http : HttpService,public toastMessages: ToastsManager
    , vcr: ViewContainerRef ) {
    this.toastMessages.setRootViewContainerRef(vcr);
  }

  url = 'getAllEmployees';
  
  list;
  getEmployeeList(){
    return this.http.getData(this.url).subscribe(data1=>{
      this.list = data1.data;
      console.log(data1);
    },err=>{
      console.log(err,"Oops It is an error");
    })
  }

  deleteEmployeeData(id,index){
    console.log(id+"this is an id ");
      var url = 'deleteEmployees/'+id;
      this.http.deleteData(url).subscribe(data1 => {
       if(data1.statusCode === 200){
        this.toastMessages.success('Data Has been Deleted!', 'Deleted!');
        this.list.splice(index, 1);
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

onClick(item,index){
  this.deleteEmployeeData(item._id,index);
}

  ngOnInit() {
  this.getEmployeeList();
  }

}
