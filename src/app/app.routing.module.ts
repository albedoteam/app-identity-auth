import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuard } from 'src/services/guards/app.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "auth/404",
    pathMatch: "full"
  },
  {
    path: "error",
    loadChildren: () => import("./error/error.module").then(m => m.ErrorModule),
  },
  {
    path: "auth",
    canActivate: [AppGuard],
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
  },
  {
    path: "callback",
    canActivate: [AppGuard],
    loadChildren: () => import("./callback/callback.module").then(m => m.CallbackModule),
  },
  {
    path: "tokens",
    canActivate: [AppGuard],
    loadChildren: () => import("./token/token.module").then(m => m.TokenModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
