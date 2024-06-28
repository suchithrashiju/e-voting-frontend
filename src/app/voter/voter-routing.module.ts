import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VoterComponent } from './voter.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ViewComponent } from './pages/view/view.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', component: VoterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'vote', component: ViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoterRoutingModule {}
