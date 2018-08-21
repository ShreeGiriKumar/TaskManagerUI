import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './UI/add/add.component'
import { EditComponent } from './UI/edit/edit.component';
import { ViewComponent } from './UI/view/view.component';


const routes: Routes = [
  { path: 'Add', component: AddComponent },
  { path: 'Edit', component: EditComponent },
  { path: 'View', component: ViewComponent },
  { path: 'Edit/:id', component: EditComponent },
  { path: '', redirectTo: '/Add', pathMatch: 'full' }
];


@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ]  
})

export class AppRoutingModule { }
