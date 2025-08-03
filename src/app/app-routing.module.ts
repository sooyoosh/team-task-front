import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { TeamComponent } from './pages/team/team.component';

const routes: Routes = [
{path:'',component:AuthComponent},
{path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
{path:'team/:id',component:TeamComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
