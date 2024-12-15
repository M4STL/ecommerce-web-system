import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer.service';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { FormBuilder ,FormGroup} from '@angular/forms';
import { error } from 'console';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: any [] =[];
  size: NzButtonSize = "large";
  searchForm!: FormGroup;

  constructor(private service: CustomerService,
    private fb: FormBuilder,
    private notification: NzNotificationService
    
  ) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      title:[null]
    })
    this.getAllProducts();
  }

  searchProduct(){
    console.log(this.searchForm.value);
    this.service.searchProductByTitle(this.searchForm.get(["title"])!.value).subscribe((res) => {
      console.log(res);
    })
  }

  getAllProducts(){
    this.products = [];
    this.service.getAllProducts().subscribe((res) => {
      console.log(res);
      res.forEach((element: any) =>{
        element.processedImage = "data:image/jpeg;base64," + element.returnedImage;
        this.products.push(element);
      });
    })
  }

  addProductToCart(productId: number){
    console.log(productId);
    this.service.addProductToCart(productId).subscribe((res) => {
      console.log(res);
      this.notification.success("SUCCESS","Product added to cart successfully", { nzDuration:5000});
    }, error => {
      this.notification.error("ERROR","Product already exist in cart", { nzDuration : 5000 });
    })
  }

 
}
