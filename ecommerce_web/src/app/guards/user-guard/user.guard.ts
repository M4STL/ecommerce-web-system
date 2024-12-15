import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
 constructor(
  private router:Router,
  private notification: NzNotificationService
 ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      if(LocalStorageService.isAdminLoggedIn()){
        this.router.navigateByUrl("/admin/dashboard");
        this.notification.error(
          "ERROR",
          "You don't have access of this page.",
          { nzDuration: 5000}
        );
        return false;
    }else if(!LocalStorageService.hasToken()){
      LocalStorageService.signOut();
      this.router.navigateByUrl("/login");
      this.notification.error(
        "ERROR",
        "You are not logged in. Please login first",
        { nzDuration : 5000 }
      );
    }
    return false;
  }
  
}
