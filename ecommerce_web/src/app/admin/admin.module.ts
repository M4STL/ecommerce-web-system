import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DemoNgZorroAntdModule } "../DemoNgZorroAntdModule";
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostCategoryComponent } from './components/post-category/post-category.component';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzSelectModule } from 'ng-zorro-antd/select';
//import { NzOptionModule } from 'ng-zorro-antd/core/option';
import { PostProductComponent } from './components/post-product/post-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { ViewOrderComponent } from './components/view-order/view-order.component';
import { NzTableModule } from 'ng-zorro-antd/table';
@NgModule({
  declarations: [
    DashboardComponent,
    PostCategoryComponent,
    PostProductComponent,
    UpdateProductComponent,
    ViewOrderComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NzFormModule,
    NzSpinModule,
    ReactiveFormsModule,NzSelectModule,
    NzTableModule
    //NzOptionModule
   // DemoNgZorroAntdModule

  ]
})
export class AdminModule { }
