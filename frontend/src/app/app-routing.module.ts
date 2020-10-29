import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './project/components/user/login/login.component';
import { SignupComponent } from './project/components/user/signup/signup.component';

const routes: Routes = [
  {
    path: 'project',
    loadChildren: () => import('./project/project.module').then((m) => m.ProjectModule)
  },
  {
    path : 'login',
    component: LoginComponent,
  },
  {
    path : 'signup',
    component: SignupComponent,
  },
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
