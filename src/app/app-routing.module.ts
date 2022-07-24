import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// pages
import { IndexComponent } from './pages/index/index.component';
const routes: Routes = [
  { path: "", component: IndexComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
