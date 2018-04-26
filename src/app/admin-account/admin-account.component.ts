import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { NavigateLoginService } from '../services/navigateLogin.service';
import {HttpService} from '../services/http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-admin-account',
  templateUrl: './admin-account.component.html',
  styleUrls: ['./admin-account.component.css']
})
export class AdminAccountComponent implements OnInit {
  public input: any;
  constructor(private navigateService : NavigateLoginService,
    private http : HttpService, public toastMessages: ToastsManager
    , vcr: ViewContainerRef) {
    this.toastMessages.setRootViewContainerRef(vcr);
   }
  list;
  checkAmount = false;
  getBankEmployeeList(){
    let url= 'getAllRecieved';
    return this.http.getData(url).subscribe(data1=>{
      this.list = data1.data.newdata;
      console.log(this.list);
      for(let i=0; i < this.list.length;i++){
        if(this.list[i].recievedAmount > 0){
          this.list[i].checkAmount = true;
        }
      }
    },err=>{
      console.log(err,"Oops It is an error");
    })
  }
  
  newdata;
  updateBankAmount(items){
      var url = 'saveSend';
      this.input= {
        from: items.from,
        to: items.to,
        sendAmount : items.recievedAmount
      };
      console.log(this.input);
      this.http.addData(url,this.input).subscribe(data1 => {
        if(data1.statusCode === 200){
          this.toastMessages.success('Amount has been sent to bank!', 'Saved!',1000);
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


  ngOnInit() {
    this.navigateService.checkUser();
    this.getBankEmployeeList();
  }

}
