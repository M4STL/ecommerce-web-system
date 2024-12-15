import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

  id: number = this.activated.snapshot.params["id"];
  isSpinning: boolean =false;
  updateProductForm!: FormGroup;
  categories: any;
  imagePreview: string |ArrayBuffer| null = null;
  existingImage: string | null = null;
  selectedFile: any;
  imgChanged = false;

  //updateProductForm!: FormGroup;

  constructor(private adminService: AdminService,
    private activated: ActivatedRoute,
    private fb: FormBuilder,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.updateProductForm = this.fb.group({
      categoryId: [null,Validators.required],
      name:[null,Validators.required],
      price: [null,Validators.required],
      description:[null,Validators.required],
    })
    this.getProductById();
    this.getAllCategories();
  }

  getAllCategories(){
    this.adminService.getAllCategories().subscribe((res => {
      this.categories = res;
      console.log(res);
    }))
  }

  getProductById(){
    this.adminService.getProductById(this.id).subscribe((res) => {
      console.log(res);
      const product =res;
      this.existingImage = "data:image/jpeg;base64," + product.returnedImage;
      this.updateProductForm.patchValue(product);
      this.updateProductForm.get("categoruId")?.setValue(res.categoryId.toString());
    })
  }

  updateProduct(){
    const productDTO: FormData = new FormData();
    if(this.imgChanged){
      productDTO.append('image', this.selectedFile);
    }
    productDTO.append('price',this.updateProductForm.get('price')!.value);
    productDTO.append('name',this.updateProductForm.get('name')!.value);
    productDTO.append('description',this.updateProductForm.get('description')!.value);
    this.adminService.updateProduct(this.updateProductForm.get('categoryId')!.value, this.id, productDTO).subscribe((res) =>{
      console.log(res);
      if(res.id != null){
        this.notification.success("SUCCESS"," Product updated successfuly",{ nzDuration: 5000});
        this.router.navigateByUrl("/admin/dashboard");
      }else{
        this.notification.error("ERROR", "Something went wrong", { nzDuration : 5000 });
      }
    })
  }

  onFileSelected( event: any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
    this.imgChanged = true;
    this.existingImage = null;
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

}
