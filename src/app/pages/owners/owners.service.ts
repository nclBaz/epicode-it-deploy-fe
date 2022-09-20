import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant';

@Injectable({
  providedIn: 'root'
})
export class OwnersService {

  constructor(
    private http:HttpClient
  ) { }

  apiUrlRestaurant = 'http://localhost:4201/restaurants/'

  categories:string[] = [
    'Americana',
    'Cibo di strada',
    'Cinese',
    'Contemporanea',
    'Europea',
    'Panineria',
    'Francese',
    'Fusion',
    'Gastronomia',
    'Giapponese',
    'Grill',
    'Internazionale',
    'Italiana',
    'Mediterranea',
    'Pesce',
    'Pizzeria',
    'Pub',
    'Siciliana',
    'Steakhouse',
    'Turca'
  ]

  registerRestaurant(restaurant:Restaurant){    
    return this.http.post(this.apiUrlRestaurant, restaurant)
  }

}
