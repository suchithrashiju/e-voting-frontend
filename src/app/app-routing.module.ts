import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndexComponent } from './candidate/index/index.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'candidates', component: IndexComponent },
  {
    path: 'voter',
    loadChildren: () =>
      import('./voter/voter.module').then((m) => m.VoterModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
