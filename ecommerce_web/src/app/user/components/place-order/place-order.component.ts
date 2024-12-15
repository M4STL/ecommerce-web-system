import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from '../../service/customer.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {

  isSpinning = false;
  Payment = ["Cash on Delivery","Online"]
  placeOrderForm!: FormGroup;
  constructor( private fb: FormBuilder,
    private service: CustomerService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.placeOrderForm = this.fb.group({
      address:[null, Validators.required],
      payment:[null, Validators.required],
      orderDescription:[null, Validators.required]
    })
  }

  placeOrder(){
    this.isSpinning = true;
    this.service.placeOrder(this.placeOrderForm.value).subscribe((res) => {
      console.log(res);
      this.isSpinning = false;
      this.notification.success("SUCCESS","Order placed successfully", { nzDuration:5000 });
      this.router.navigateByUrl("/user/dashboard");
    })

  }

}
