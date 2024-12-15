import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: RegisterComponent },
  {path:"register",component:RegisterComponent},
  {path:"login",component:LoginComponent},
  { path:"admin", loadChildren:() => import("./admin/admin.module").then(m => m.AdminModule)},
  { path:"user", loadChildren:() => import("./user/user.module").then(m => m.UserModule)},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
