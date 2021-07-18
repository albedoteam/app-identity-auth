import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppGuard } from 'src/services/guards/app.guard';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: "",
        pathMatch: "full",
        redirectTo: "page-not-found"
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
    {
        path: "error",
        canActivate: [AppGuard],
        loadChildren: () => import("./error/error.module").then(m => m.ErrorModule),
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
