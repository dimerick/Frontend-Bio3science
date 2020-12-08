import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityComponent } from './components/community/community.component';
import { MapComponent } from './components/map/map.component';
import { ProjectNetworkComponent } from './components/project-network/project-network.component';
import { ProjectComponent } from './components/project/project.component';
import { RecoveryPasswordComponent } from './components/recovery-password/recovery-password.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UniversityComponent } from './components/university/university.component';
import { ProjectListComponent } from './components/project-list/project-list.component';


const routes: Routes = [
  { path: '', component: MapComponent}, 
  { path: 'login', component: SigninComponent}, 
  { path: 'registro', component: SignupComponent}, 
  { path: 'project-network', component: ProjectNetworkComponent}, 
  { path: 'map', component: MapComponent}, 
  { path: 'recovery-password', component: RecoveryPasswordComponent}, 
  { path: 'university', component: UniversityComponent}, 
  { path: 'project', component: ProjectComponent}, 
  { path: 'community', component: CommunityComponent}, 
  { path: 'project-list', component: ProjectListComponent}, 
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
