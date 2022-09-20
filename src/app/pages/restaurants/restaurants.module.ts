import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RestaurantsRoutingModule } from './restaurants-routing.module';
import { RestaurantsComponent } from './restaurants.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { FormsModule } from '@angular/forms';
import { RestaurantDetailsComponent } from './restaurant-details/restaurant-details.component';


@NgModule({
  declarations: [
    RestaurantsComponent,
    NavbarComponent,
    RestaurantComponent,
    RestaurantDetailsComponent
  ],
  imports: [
    CommonModule,
    RestaurantsRoutingModule,
    FormsModule
  ]
})
export class RestaurantsModule { }
