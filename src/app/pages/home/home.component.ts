import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/models/reservation';
import { Restaurant } from 'src/app/models/restaurant';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router:Router,
    private authSrv:AuthService,
    private restSrv:RestaurantsService
  ) { }

  city:string = ''
  restaurants:Restaurant[] = []
  user!:any
  reservation: Reservation[] = [];
  expiredRes:Reservation[] = []
  date: string[] = [];
  dateExp: string[] = []
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getName()
    this.getReservation();
  }

  searchRestaurantByCity(){
    this.router.navigate(['/restaurants/'+this.city])
  }

  isUserLogged(){
    return this.authSrv.isUserLogged()
  }

  getName() {
    if (localStorage.getItem('user')) {
      let user: any = localStorage.getItem('user');
      this.user = JSON.parse(user).user;
    }
  }

  logout(){
    this.authSrv.logout()
  }

  deleteUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authSrv.deleteUser(this.user.id).subscribe((res: any) => {
      this.router.navigate(['/']);
    });
  }

  deleteReservation(i: number) {
    this.isLoading = true;
    
    let id = this.reservation[i].id;
    if (id) {
      this.restSrv.deleteReservation(id).subscribe((res) => {
        this.getReservation();
        this.isLoading = false;
      });
    }
  }

  deleteExpRes(i:number){
    this.isLoading = true;
    
    let id = this.expiredRes[i].id;
    if (id) {
      this.restSrv.deleteReservation(id).subscribe((res) => {
        this.getReservation();
        
      });
    }
  }

  getReservation() {
    this.restSrv.getReservation().subscribe((res: any) => {
      let hours = new Date().getHours() * 1000 * 60 * 60
      let minutes = new Date().getMinutes() * 1000 * 60
      let seconds = new Date().getSeconds() * 1000

      let today = new Date().getTime() - hours - minutes - seconds
      this.expiredRes = []
      for (let i = 0; i < res.length; i++) {
        if (res[i].day < today) {
          this.expiredRes.push(res[i])
          this.dateExp.push(
            new Date(Number(res[i].day)).toLocaleDateString('it-IT', {
              dateStyle: 'full',
            })
          );
        }
      }
      if(this.isUserLogged()){
        this.reservation = res.filter((r: any) => r.user == this.user.id && r.day > today);
        this.getDateRes();
      }
      this.isLoading = false;
    });
  }

  getDateRes() {
    for (let res of this.reservation) {
      this.date.push(
        new Date(Number(res.day)).toLocaleDateString('it-IT', {
          dateStyle: 'full',
        })
      );
    }
  }

  reloadRes(){
    console.log('test');
    
  }


}
