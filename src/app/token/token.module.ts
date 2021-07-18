import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TokenRoutingModule } from './token.routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { FirstAccessComponent } from './views/first-access/first-access.component';
import { PasswordRecoveryComponent } from './views/password-recovery/password-recovery.component';
import { MatCommonModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from '../directives/directives.module';
import { NgxMaskModule } from 'ngx-mask';
import { ComponentLibraryModule } from '../component-library/component-library.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        TokenRoutingModule,
        MatCommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatToolbarModule,
        MatCardModule,
        MatButtonModule,
        MatProgressBarModule,
        FlexLayoutModule,
        DirectivesModule,
        MatIconModule,
        NgxMaskModule.forRoot(),
        ComponentLibraryModule,
    ],
    declarations: [FirstAccessComponent, PasswordRecoveryComponent]
})
export class TokenModule { }
