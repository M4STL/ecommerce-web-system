import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin-service/admin.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  products: any [] =[];
  isSpinning: boolean= false ;

  constructor(private adminService: AdminService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getAllProducts();
  }
  getAllProducts(){
    this.adminService.getAllProducts().subscribe((res)=> {
      next: (res: any[]) => {
      console.log(res);
      res.forEach((element : any) => {
        element.processedImage = "data:image/jpeg;base64," + element.returnedImage;
        this.products.push(element);
      });
    }
    })
  }

  deleteProduct(id: number){
    console.log(id);
    this.adminService.deleteProduct(id).subscribe((res) => {
      console.log(res);
      next:() => {
      this.notification.success("SUCCESS","Product deleted successfully",{nzDuration: 5000 });
      }
      this.getAllProducts();
    })
  }

}
