import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ShowResultComponent } from './show-result/show-result.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'result', component: ShowResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
