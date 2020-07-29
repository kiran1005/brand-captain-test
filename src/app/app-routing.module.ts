import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './modules/registration/registration.component';
import { RegisteredUserListComponent } from './modules/registered-user-list/registered-user-list.component';


const routes: Routes = [
  {path:'',redirectTo:'/register',pathMatch:'full'},
  {path:'register',component:RegistrationComponent},
  {path:'register/:userId',component:RegistrationComponent},
  {path:'user-list',component:RegisteredUserListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[
  RegistrationComponent,
  RegisteredUserListComponent
]
