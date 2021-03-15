import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

const routes: Routes = [
  {
    path: "",
    component: AuthComponent,
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },
      {
        path: "login",
        component: LoginComponent,
      },
      {
        path: "register",
        component: RegisterComponent,
      },
      {
        path: "forgot-password",
        component: ForgotPasswordComponent,
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }