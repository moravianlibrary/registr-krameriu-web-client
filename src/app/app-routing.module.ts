import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  { path: '', component:  HomeComponent},
  { path: 'table', component: TableComponent },
  { path: 'library/:code', component: DetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
