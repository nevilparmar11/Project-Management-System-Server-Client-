import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './project/components/user/login/login.component';
import { SignupComponent } from './project/components/user/signup/signup.component';
import { UserProfileComponent } from './project/components/user/user-profile/user-profile.component';

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
    path : 'user-profile',
    component: UserProfileComponent,
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
