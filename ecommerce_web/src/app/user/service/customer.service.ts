import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from 'src/app/services/storage-service/local-storage.service';
import { environment } from 'src/environments/environment';

const BASIC_URL = environment['BASIC_URL'];

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllProducts(): Observable<any>{
    return this.http.get<[]>(BASIC_URL + "api/admin/products",{
      headers: this.createAuthorizationHeader()
    })
  }
  searchProductByTitle(title: string): Observable<any>{
    return this.http.get<[]>(BASIC_URL + "api/customer/product/search/" + title ,{
      headers: this.createAuthorizationHeader()
    })
  }
  addProductToCart(productId:number): Observable<any>{
    let cartDTO = {
      productId: productId,
      userId:LocalStorageService.getUser()
    }
    return this.http.post<[]>(BASIC_URL + "api/customer/cart" , cartDTO,{
      headers: this.createAuthorizationHeader()
    })
  }

  getCartByUserId():Observable<any>{
    return this.http.get(BASIC_URL + "api/customer/cart/" + LocalStorageService.getUser(), {
      headers: this.createAuthorizationHeader()
    })
  }

  decreaseQuantityOfProduct(productId: number){
    return this.http.get(BASIC_URL + `/api/customer/${LocalStorageService.getUser()}/deduct/${productId}`,{
      headers: this.createAuthorizationHeader()
    })
  }

  increaseQuantityOfProduct(productId: number){
    return this.http.get(BASIC_URL + `/api/customer/${LocalStorageService.getUser()}/add/${productId}`,{
      headers: this.createAuthorizationHeader()
    })
  }

  placeOrder(placeorderDTO: any):Observable<any>{
    placeorderDTO.userId = LocalStorageService.getUser();
    return this.http.post(BASIC_URL + "api/customer/placeOrder" , placeorderDTO,{
      headers: this.createAuthorizationHeader()
    })
  }

  getOrderByUserId():Observable<any>{
    return this.http.get(BASIC_URL + "api/customer/orders/" + LocalStorageService.getUser(), {
      headers: this.createAuthorizationHeader()
    })
  }

  createAuthorizationHeader(): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + LocalStorageService.getToken()
    )
  }
}
