import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';

import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCommonModule } from "@angular/material/core";
import { AuthRoutingModule } from './auth.routing.module';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { LinksComponent } from './views/login/components/links/links.component';
import { SocialMediaComponent } from './views/login/components/social-media/social-media.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginFormComponent } from './views/login/components/form/form.component';
import { ForgetPasswordFormComponent } from './views/forgot-password/components/form/form.component';
import { DirectivesModule } from '../directives/directives.module';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        MatCommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        DirectivesModule,
        MatIconModule,
        FlexLayoutModule,
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        LoginFormComponent,
        LinksComponent,
        SocialMediaComponent,
        ForgetPasswordFormComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule { }
