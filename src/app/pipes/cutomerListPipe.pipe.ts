import { Pipe, PipeTransform } from '@angular/core';

import {CalculationCustomerService} from '../services/calculationCustomerList.service';

@Pipe({
  name: 'FilterCustomerPipe',
})
export class CustomerListPipe implements PipeTransform {
  constructor(private customerService : CalculationCustomerService) { }
  public amount: any;
  public balance: any;

  transform(value: any, input: string, searchableList: any) {
    if (input) {
      input = input.toLowerCase();
      return value.filter(function (el: any) {
        var isTrue = false;
        for (var k in searchableList) {
          if (el[searchableList[k]].toLowerCase().indexOf(input) > -1) {
            isTrue = true;

          }
          if (isTrue) {
            return el
          }
        }
      })
    }console.log("=============")
    console.log(value);
    if(value) {
      this.customerService.totalPaidCustomer(value);
      this.customerService.totalAmpereCustomer(value);
      console.log(value);
    }
    return value;
  }
}