import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { UserRoutingModule } from './user-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './components/cart/cart.component';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NzTableModule } from 'ng-zorro-antd/table';


@NgModule({
  declarations: [
    DashboardComponent,
    CartComponent,
    PlaceOrderComponent,
    MyOrdersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzButtonModule,
    ReactiveFormsModule,
    FormsModule,
    NzGridModule,
    NzCardModule,
    NzSpinModule,
    NzSelectModule,
    NzTableModule
   
  ]
})
export class UserModule { }
