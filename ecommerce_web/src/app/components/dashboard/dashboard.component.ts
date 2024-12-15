import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  isSpinning: boolean= false ;
  products: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    
    const url = `${environment.BASIC_URL}/api/products`; // Ensure this URL is correct
    this.http.get(url).subscribe({
      next: (response : any) => {
        this.products = response.map((product: { returnedImage: any; }) => ({
          ...product,
          processedImage: `data:image/jpeg;base64,${product.returnedImage}`,
        }));
        console.log('Products:', this.products);
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      }
    });
  }
}
