import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';
import { RestaurantsComponent } from './restaurants.component';

const routes: Routes = [
  { 
    path: '', 
    component: RestaurantsComponent 
  },
  {
    path: ':city',
    component: RestaurantsComponent
  },
  {
    path: 'details/:id',
    canActivate: [AuthGuard],
    component: RestaurantDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantsRoutingModule { }
