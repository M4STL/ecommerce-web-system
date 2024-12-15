import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {

  isSpinning = false;
  MyOrders: any;

  constructor( private service: CustomerService) { }

  ngOnInit(): void {
    this.getMyOrders();
  }

  getMyOrders(){
    this.isSpinning = true;
    this.service.getOrderByUserId().subscribe((res) => {
      console.log(res);
      this.MyOrders = res;
    })
  }
}
