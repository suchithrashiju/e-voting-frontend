import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoterRoutingModule } from './voter-routing.module';
import { VoterComponent } from './voter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewComponent } from './pages/view/view.component';
import { LoginComponent } from './pages/login/login.component';
import { AadharValidateComponent } from './pages/view/elements/aadhar-validate/aadhar-validate.component';

@NgModule({
  declarations: [
    VoterComponent,
    DashboardComponent,
    ViewComponent,
    LoginComponent,
    AadharValidateComponent,
  ],
  imports: [CommonModule, VoterRoutingModule, ReactiveFormsModule, FormsModule],
})
export class VoterModule {}
