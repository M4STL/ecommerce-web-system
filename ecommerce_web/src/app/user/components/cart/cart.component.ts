import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  totalAmount: number= 0;
  cartProducts: any[] =[];

  constructor( private service: CustomerService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(){
    this.service.getCartByUserId().subscribe((res) => {
      console.log(res);
      this.cartProducts = res.cartItemDTOList;
      this.totalAmount = res.amount;
    })
  }

  minusProduct(productId: number){
    this.service.decreaseQuantityOfProduct(productId).subscribe((res) => {
      console.log(res);
      this.notification.success("SUCCESS","Decrease",{ nzDuration:5000});
      this.getCart();
    })
  }
  plusProduct(productId: number){
    this.service.increaseQuantityOfProduct(productId).subscribe((res) => {
      console.log(res);
      this.notification.success("SUCCESS","Increase",{ nzDuration:5000});
      this.getCart();
    })
  }

}
