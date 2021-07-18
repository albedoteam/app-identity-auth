import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FirstAccessComponent } from './views/first-access/first-access.component';
import { PasswordRecoveryComponent } from './views/password-recovery/password-recovery.component';

const routes: Routes = [
    {
        path: "first-access",
        component: FirstAccessComponent
    },
    {
        path: "password-recovery",
        component: PasswordRecoveryComponent
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class TokenRoutingModule { }
