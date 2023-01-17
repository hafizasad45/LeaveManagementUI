import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MasterpageComponent } from './components/masterpage/masterpage.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: MasterpageComponent,
    children: [
      { path: '', redirectTo: '/LMS/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
