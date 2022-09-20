import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Reservation } from 'src/app/models/reservation';
import { Restaurant } from 'src/app/models/restaurant';
import { Review } from 'src/app/models/review';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit {

  restaurant!: Restaurant
  restId!: number
  isLoading: boolean = false
  isLoadingRev: boolean = false
  isReserved: boolean = false

  dateArray: number[] = []
  dateArrayString: string[] = []

  getDays() {
    let today: number = new Date().getTime()
    let day: number = 1000 * 60 * 60 * 24;

    for (let i = 0; i < 8; i++) {
      this.dateArray.push(today + (day * i))
      this.dateArrayString.push(new Date(today + (day * i)).toLocaleDateString('it-IT', {
        dateStyle: 'full'
      }))
    }
  }

  checkDayOff(day: string): boolean {

    if (day.toLowerCase().includes(this.restaurant.dayOff.toLowerCase())) {
      return true
    } else {
      return false
    }

  }

  isReview: boolean = false
  reviews: any = []
  reviewDate!: string

  review: Review = {
    autor: '',
    description: '',
    stars: 0,
    date: ''
  }

  orariPranzo: string[] = [
    '11.00',
    '11.30',
    '12.00',
    '12.30',
    '13.00',
    '13.30',
    '14.00',
    '14.30',
    '15.00',
    '15.30',
    '16.00'
  ]

  orariCena: string[] = [
    '19.00',
    '19.30',
    '20.00',
    '20.30',
    '21.00',
    '21.30',
    '22.00',
    '22.30',
    '23.00',
    '23.30',
    '00.00',
    '00.30',
    '01.00',
    '01.30',
    '02.00',
    '02.30',
    '03.00',
    '03.30',
    '04.00'
  ]

  date!: number
  time!: string
  person!: number

  constructor(
    private restSrv: RestaurantsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res: any) => {
      this.restId = res.id
    })

    this.getRestaurant()
    this.getDays()
  }

  getRestaurant() {
    this.isLoading = true

    this.restSrv.getSingleRestaurant(this.restId).subscribe((res: any) => {
      this.restaurant = res
      this.reviews = res.reviews
      this.chechOrari(this.restaurant.lunchStart, this.restaurant.lunchEnd, this.restaurant.dinnerStart, this.restaurant.dinnerEnd)
      this.isLoading = false
    })
  }

  chechOrari(lunchStart: string, lunchEnd: string, dinnerStart: string, dinnerEnd: string) {

    if (lunchStart) {
      this.orariPranzo = this.orariPranzo.slice(this.orariPranzo.indexOf(lunchStart))
      this.orariPranzo = this.orariPranzo.slice(0, this.orariPranzo.indexOf(lunchEnd) - 1)
    } else {
      this.orariPranzo = []
    }

    if (dinnerStart) {
      this.orariCena = this.orariCena.slice(this.orariCena.indexOf(dinnerStart))
      this.orariCena = this.orariCena.slice(0, this.orariCena.indexOf(dinnerEnd) - 1)
    } else {
      this.orariCena = []
    }

  }

  setReservation() {
    this.isLoading = true
    let user = JSON.parse(localStorage.getItem('user')!).user

    let reservation: Reservation = {
      user: user.id,
      name: user.first_name,
      restaurant: this.restaurant.id,
      restName: this.restaurant.restaurant,
      email: user.email,
      day: this.date,
      time: this.time,
      people: this.person,
    }

    this.restSrv.postReservation(reservation).subscribe(res => {
      this.isLoading = false
      this.isReserved = true
    })

  }

  checkStars(s: number, n: number): boolean {
    if (s == n || s > n) {
      return false
    } else {
      return true
    }
  }

  sendReview() {
    this.isLoadingRev = true
    this.isReview = true
    let user = JSON.parse(localStorage.getItem('user')!).user
    this.review.autor = user.first_name
    this.review.date = new Date().toLocaleDateString('it-IT', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })

    this.reviews.push(this.review)

    this.restSrv.modificaRestaurant(this.restaurant.id, { reviews: this.reviews }).subscribe(res => this.isLoadingRev = false)

  }

  valutation(): string {
    let arrayValutation: number[] = []

    for (let val of this.reviews) {
      arrayValutation.push(val.stars)
    }
    if (arrayValutation.length > 0) {

      let sum = arrayValutation.reduce((a: number, b: number) => {
        return a + b;
      });

      return (sum / arrayValutation.length).toPrecision(2)
    } else {
      return 'n.d.'
    }
  }

  validateReservation(){
    return 
  }

}
