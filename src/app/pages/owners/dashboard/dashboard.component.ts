import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/models/reservation';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { OwnersService } from '../owners.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private restSrv: RestaurantsService,
    private ownersSrv: OwnersService
  ) { }

  restaurant!: Restaurant
  name!: string
  isLoading: boolean = false
  info: boolean = true
  dati: boolean = false
  orari: boolean = false
  recensioni: boolean = false
  prenotazioni: boolean = false
  categories!: string[]
  reservation: Reservation[] = []
  reviews: any[] = []
  date: string[] = []

  dateArray: number[] = []
  dateArrayString: string[] = []

  ngOnInit(): void {
    this.categories = this.ownersSrv.categories
    this.getRestaurant()
    this.getName()
    this.checkReservation()
    this.getDays()


  }

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

  checkDayOff(day?: string): boolean {
    
    if (day!.toLowerCase().includes(this.restaurant.dayOff.toLowerCase()) && this.restaurant.dayOff != "") {
      return true
    } else if (this.restaurant.dayOff == "") {
      return false
    } else {
      return false
    }

  }

  checkResForDay(day: string, i: number) {
    if (day == this.date[i]) {
      return true
    } else {
      return false
    }
  }

  logout() {
    this.authSrv.logout()
    this.router.navigate(['/'])
  }

  getName() {
    if (localStorage.getItem('user')) {
      let user: any = localStorage.getItem('user');
      this.name = JSON.parse(user).user.first_name;
    }
  }

  getRestaurant() {
    this.isLoading = true
    let id: number = JSON.parse(localStorage.getItem('user')!).user.restaurant

    if (id) {
      this.restSrv.getSingleRestaurant(id).subscribe((res: any) => {
        this.restaurant = res
        this.reviews = res.reviews
        this.isLoading = false
      })
    } else {
      this.router.navigate(['/'])
    }

  }

  setInfo() {
    this.info = true
    this.dati = false
    this.orari = false
    this.recensioni = false
    this.prenotazioni = false
  }
  setDati() {
    this.info = false
    this.dati = true
    this.orari = false
    this.recensioni = false
    this.prenotazioni = false
  }
  setOrari() {
    this.info = false
    this.dati = false
    this.orari = true
    this.recensioni = false
    this.prenotazioni = false
  }
  setRecensioni() {
    this.info = false
    this.dati = false
    this.orari = false
    this.recensioni = true
    this.prenotazioni = false
  }
  setPrenotazioni() {
    this.info = false
    this.dati = false
    this.orari = false
    this.recensioni = false
    this.prenotazioni = true
  }

  modCategory(cat: string) {
    if (this.restaurant.categories.includes(cat)) {
      this.restaurant.categories = this.restaurant.categories.filter(c => c != cat)
    } else {
      this.restaurant.categories.push(cat)
    }
  }

  checkCat(cat: string): boolean {
    if (this.restaurant.categories.includes(cat)) {
      return true
    } else {
      return false
    }
  }

  editDati() {
    this.isLoading = true
    this.dati = false
    this.info = true
    let id: number = JSON.parse(localStorage.getItem('user')!).user.restaurant

    let data: Partial<Restaurant> = {
      address: this.restaurant.address,
      cap: this.restaurant.cap,
      city: this.restaurant.city,
      phone: this.restaurant.phone,
      categories: this.restaurant.categories
    }
    this.restSrv.modificaRestaurant(id, data).subscribe((res: any) => {
      this.isLoading = false
      this.restaurant = res
    })
  }

  editOrari() {
    this.isLoading = true
    this.orari = false
    this.info = true
    let id: number = JSON.parse(localStorage.getItem('user')!).user.restaurant

    let data: Partial<Restaurant> = {
      lunchStart: this.restaurant.lunchStart,
      lunchEnd: this.restaurant.lunchEnd,
      dinnerStart: this.restaurant.dinnerStart,
      dinnerEnd: this.restaurant.dinnerEnd,
      dayOff: this.restaurant.dayOff
    }
    this.restSrv.modificaRestaurant(id, data).subscribe((res: any) => {
      this.isLoading = false
      this.restaurant = res
    })
  }

  checkReservation() {
    let id: number = JSON.parse(localStorage.getItem('user')!).user.restaurant
    this.restSrv.getReservation().subscribe((res: any) => {

      let hours = new Date().getHours() * 1000 * 60 * 60
      let minutes = new Date().getMinutes() * 1000 * 60
      let seconds = new Date().getSeconds() * 1000

      let today = new Date().getTime() - hours - minutes - seconds

      this.reservation = res.filter((r: any) => r.restaurant == id && r.day > today)
      this.getDateRes()
    })
  }

  getDateRes() {
    for (let res of this.reservation) {
      this.date.push(new Date(Number(res.day)).toLocaleDateString('it-IT', {
        dateStyle: 'full'
      }))
    }
  }

  deleteRestaurant() {
    this.isLoading = true
    let id: number = JSON.parse(localStorage.getItem('user')!).user.id
    this.authSrv.deleteUser(id).subscribe(res => {
      this.restSrv.deleteRestaurant(this.restaurant.id).subscribe((res: any) => {
        this.authSrv.logout()
        this.router.navigate(['/'])
      })
    })
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

}
