import { Injectable } from '@angular/core';

const TOKEN = "I_token";
const USERID = "I_user";
const USERROLE = "I_role";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  

  constructor() { }

  saveUserId(userId:any){
    window.localStorage.removeItem(USERID);
    window.localStorage.setItem(USERID,userId);
  }
  saveUserRole(role:any){
    window.localStorage.removeItem(USERROLE);
    window.localStorage.setItem(USERROLE,role);
  }
  saveToken(token:any){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN,token);
  }
 static getToken():string{
    return localStorage.getItem(TOKEN) ?? '';
  }
  static hasToken():boolean{
    if(this.getToken()==null){
      return false;
    }
    return true;
  }
  static isUserLoggedIn(): boolean{
    if(this.getToken() ===null){
      return false;
    }
    const role:string = this.getUserRole();
    return role == "USER"
  }
  static getUserRole(): string{
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.role;
  }

  static getUser(): any {
    const userData = localStorage.getItem(USERID);
    try {
      return userData ? JSON.parse(userData) : null; // Parse only if data exists
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null; // Return null on parsing error
    }
  }

 /*static getUser(){
    return JSON.parse(localStorage.getItem(USERID) ?? '');
  }*/
  static isAdminLoggedIn(){
    if(this.getToken()=== null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == "ADMIN"
  }
  static signOut(){
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USERID);
    window.localStorage.removeItem(USERROLE);
  }
}
