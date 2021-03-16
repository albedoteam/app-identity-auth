import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    redirectTo: "redirect",
    pathMatch: "full"
  },
  {
    path: "error",
    loadChildren: () => import("./error/error.module").then(m => m.ErrorModule),
  },
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
  },
  {
    path: "callback",
    loadChildren: () => import("./callback/callback.module").then(m => m.CallbackModule),
  },
  {
    path: "redirect",
    loadChildren: () => import("./redirect/redirect.module").then(m => m.RedirectModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
