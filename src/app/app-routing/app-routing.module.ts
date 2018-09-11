import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { AddNewBookComponent } from '../components/add-new-book/add-new-book.component';
const appRoutes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'add-new-book', component: AddNewBookComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
