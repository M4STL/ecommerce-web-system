import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  isSpinning = false;
  MyOrders: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders(){
    this.isSpinning = true;
    this.adminService.getAllOrders().subscribe((res) => {
      this.isSpinning = false;
      console.log(res);
      this.MyOrders = res;
    })
  }

}
