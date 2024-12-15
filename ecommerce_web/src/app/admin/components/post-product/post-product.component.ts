import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-product',
  templateUrl: './post-product.component.html',
  styleUrls: ['./post-product.component.scss']
})
export class PostProductComponent implements OnInit {

  isSpinning: boolean = false;
  categories:any;
  postProductForm!: FormGroup;
  selectedFile: File | null = null;

  constructor( private adminService: AdminService,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router:Router,
   private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.postProductForm = this.fb.group({
      categoryId: [null,Validators.required],
      name:[null,Validators.required],
      price: [null,Validators.required],
      description:[null,Validators.required],
    })
    this.getAllCategories();
  }
  getAllCategories(){
    this.adminService.getAllCategories().subscribe((res => {
      this.categories = res;
      console.log(res);
    }))
  }
  postProduct(){
    const productDTO:FormData = new FormData();
    if (this.selectedFile) {
      productDTO.append("image", this.selectedFile);
    } else {
      console.error("No file selected for upload.");
    }
    
    productDTO.append("name",this.postProductForm.get(["name"])!.value);
    productDTO.append("price",this.postProductForm.get(["price"])!.value);
    productDTO.append("description",this.postProductForm.get(["description"])!.value);
    this.adminService.postProduct(this.postProductForm.get(['categoryId'])!.value,productDTO).subscribe((res)=> {
      console.log(res);
      if(res.id != null){
        this.notification.success(
          `SUCCESS`,
          "Product posted successfully",
          { nzDuration:5000}
        )
        this.router.navigateByUrl("/admin/dashboard")
      }else{
        this.notification.error(
          "ERROR",
          `${res.message}`,
          { nzDuration:5000 }
        )
      }
    })
   
  }
  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
  }

}
