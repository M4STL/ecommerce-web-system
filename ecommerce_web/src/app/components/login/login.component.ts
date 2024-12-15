import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import {  HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm !: FormGroup;
  isSpinning=false;
  constructor(private authService:AuthService,
    private fb: FormBuilder,
    private router:Router,
    private notification: NzNotificationService
    
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username:[null,[Validators.required]],
      password:[null,[Validators.required]],
      remember:[false]
    })
  }
  login(): void {
    this.authService.login(this.validateForm.get(['username'])!.value,this.validateForm.get(['password'])!.value).subscribe((res:any) => {
      this.isSpinning = true;
        if(LocalStorageService.isAdminLoggedIn()){
          this.router.navigateByUrl("/admin/dashboard");
        }else if(LocalStorageService.isUserLoggedIn()){
          this.router.navigateByUrl("/user/dashboard");
        }
      }, 
      (error: HttpErrorResponse) => {
        console.error(error);
        this.isSpinning = false;
        if(error.status == 406){
          this.notification.error(
            "ERROR",
            "Account is not Active. Please register first.",
            { nzDuration: 5000 }
          )
        }else{
          this.notification.error(
            "ERROR",
            "Bad credentials",
            { nzDuration : 5000 }
          )
        }
        this.isSpinning = false;
      });
    } 
 
  }


