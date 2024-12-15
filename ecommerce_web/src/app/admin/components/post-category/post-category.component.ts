import { Component, OnInit } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../admin-service/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-post-category',
  

  templateUrl: './post-category.component.html',
  styleUrls: ['./post-category.component.scss']
})
export class PostCategoryComponent implements OnInit {
  isSpinning: boolean= false ;
  categoryForm!: FormGroup;

  constructor( private adminService: AdminService,
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name:[null,[Validators.required]],
      description: [null,[Validators.required]]
    })
  }
  postCategory(){
    this.isSpinning = true;
    this.adminService.postCategory(this.categoryForm.value).subscribe((res) =>{
      this.isSpinning = false;
      console.log(res);
      if(res.id != null){
        this.notification.success(
          `SUCCESS`,
          "Category posted successfully",
          { nzDuration:5000}
        )
      }else{
        this.notification.error(
          "ERROR",
          `${res.message}`,
          { nzDuration:5000 }
        )
      }
    })
  }

}
