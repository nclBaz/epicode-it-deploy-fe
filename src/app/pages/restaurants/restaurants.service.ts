import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Reservation } from 'src/app/models/reservation';
import { Restaurant } from 'src/app/models/restaurant';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RestaurantsService {
  constructor(private http: HttpClient) {}

  apiUrlRestaurant = `${environment.apiURL}/restaurants`;
  apiUrlReservation = `${environment.apiURL}/reservation`;
  city!: string;
  restId!: string;

  getRestaurants() {
    return this.http.get(this.apiUrlRestaurant);
  }

  getSingleRestaurant(id: number) {
    return this.http.get(this.apiUrlRestaurant + '/' + id);
  }

  modificaRestaurant(id: number, restaurant: Partial<Restaurant>) {
    return this.http.patch(this.apiUrlRestaurant + '/' + id, restaurant);
  }

  deleteRestaurant(id: number) {
    return this.http.delete(this.apiUrlRestaurant + '/' + id);
  }

  getReservation() {
    return this.http.get(this.apiUrlReservation);
  }

  deleteReservation(id: number) {
    return this.http.delete(this.apiUrlReservation + '/' + id);
  }

  postReservation(reservation: Reservation) {
    return this.http.post(this.apiUrlReservation, reservation);
  }
}
