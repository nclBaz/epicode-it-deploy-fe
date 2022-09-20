import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'login', 
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'signup', 
    loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule) 
  },
  { 
    path: 'restaurants', 
  loadChildren: () => import('./pages/restaurants/restaurants.module').then(m => m.RestaurantsModule) 
  },
  { 
    path: 'owners', 
    loadChildren: () => import('./pages/owners/owners.module').then(m => m.OwnersModule) 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
