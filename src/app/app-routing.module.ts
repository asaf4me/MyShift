import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddShiftComponent } from './add-shift/add-shift.component';

const routes: Routes = [
  {path: 'add-shifts', component: AddShiftComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
export const routingComponents = [ AddShiftComponent ]