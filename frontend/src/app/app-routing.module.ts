import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule),
    canActivate : [AuthGuard]
  },
  {
     path: 'account',
     loadChildren :  () => import('./project/components/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: '**',
    redirectTo : 'account'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
