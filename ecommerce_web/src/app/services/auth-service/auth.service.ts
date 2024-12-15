import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageService } from '../storage-service/local-storage.service';

const BASIC_URL = environment["BASIC_URL"];

export const AUTH_HEADER = "authorization";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 // private loginUrl = `${BASIC_URL}/api/auth/login`

  constructor(private http: HttpClient,private storageService: LocalStorageService) { }

  register(signupDTO:any): Observable<any>{
    return this.http.post(`${BASIC_URL}/signup`,signupDTO)
  }
  login(username:string,password:string): any{
    return this.http.post<[]>(`${BASIC_URL}/authenticate`,{username,password},
      {observe:'response'}
    ).pipe(
      tap(_ => this.log("User Authentication")),
      map((res:HttpResponse<any>)=>{
        this.storageService.saveUserId(res.body.userId);
        this.storageService.saveUserRole(res.body.role);
        const tokenLength = res.headers.get(AUTH_HEADER)?.length;
        const bearerToken = res.headers.get(AUTH_HEADER)?.substring(7,tokenLength);
        this.storageService.saveToken(bearerToken);
        return res;
      })
    )
  }
log(message:string):void{
  console.log(`User Auth Service: ${message}`);
}

storeToken(token:string){
  localStorage.setItem('jwtToken', token);
}

getToken(): string | null{
  return localStorage.getItem('jwtToken');
}

clearToken(){
  localStorage.removeItem('jwtToken');
}
  
}
