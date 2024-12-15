import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient) { }

  postCategory(categoryDTO: any): Observable<any>{
    return this.http.post<[]>(BASIC_URL + "api/admin/category",categoryDTO,{
      headers: this.createAuthorizationHeader(),
    });
  }
  getAllCategories(): Observable<any>{
    return this.http.get<[]>(BASIC_URL + "api/admin/categories",{
      headers: this.createAuthorizationHeader(),
    });
  }
  postProduct(categoryId: number, productDTO: any): Observable<any>{
    return this.http.post<[]>(BASIC_URL + "api/admin/product" + categoryId ,productDTO,{
      headers: this.createAuthorizationHeader(),
    });
  }
  getAllProducts(): Observable<any>{
    return this.http.get<[]>(BASIC_URL + "api/admin/products",{
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteProduct(id: number): Observable<any>{
    return this.http.delete<[]>(BASIC_URL + "api/admin/product/" + id,{
      headers: this.createAuthorizationHeader(),
    });
  }

  getProductById(id: number): Observable<any>{
    return this.http.get<[]>(BASIC_URL + "api/admin/product/" + id ,{
      headers: this.createAuthorizationHeader(),
    });
  }
  updateProduct(categoryId: number, productId: number,productDTO: any): Observable<any>{
    return this.http.put<[]>(BASIC_URL + `api/admin/${categoryId}/product/${productId}`,productDTO,{
      headers: this.createAuthorizationHeader(),
    });
  }
getAllOrders(): Observable<any>{
  return this.http.get<[]>(BASIC_URL + "api/admin/orders" ,{
    headers: this.createAuthorizationHeader(),
  });
}

  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      `Authorization`,
      `Beare`+ LocalStorageService.getToken()
    )
  }
}
