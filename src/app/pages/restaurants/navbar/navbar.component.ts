import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Reservation } from 'src/app/models/reservation';
import { RestaurantsService } from '../restaurants.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(
    private authSrv: AuthService,
    private router: Router,
    private restSrv: RestaurantsService,
    private route: ActivatedRoute
  ) { }

  name!: string;
  user!: any;
  reservation: Reservation[] = [];
  expiredRes:Reservation[] = []
  date: string[] = [];
  dateExp: string[] = []
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getName();
    this.getReservation();
  }

  isUserLogged() {
    return this.authSrv.isUserLogged();
  }

  login(){
    this.route.params.subscribe(res => {
      this.restSrv.city = res['city']
      this.router.navigate(['/login']);
    })
  }

  register(){
    this.router.navigate(['/signup']);
  }

  getName() {
    if (localStorage.getItem('user')) {
      let user: any = localStorage.getItem('user');
      this.user = JSON.parse(user).user;
      this.name = JSON.parse(user).user.first_name;
    }
  }

  logout() {
    this.authSrv.logout();
    this.router.navigate(['/']);
  }

  goToHome() {
    this.router.navigate(['/']);
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
        
      });
    }
  }
  deleteExpRes(i: number) {
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

      if(this.isUserLogged()){
        this.expiredRes = res.filter((r: any) => r.user == this.user.id && r.day < today);
        this.reservation = res.filter((r: any) => r.user == this.user.id && r.day > today);
        this.getDateRes(this.reservation, this.expiredRes);
      }
      
      this.isLoading = false;
    });
  }

  getDateRes(arr1:Reservation[], arr2:Reservation[]) {
    for (let res of arr1) {
      this.date.push(
        new Date(Number(res.day)).toLocaleDateString('it-IT', {
          dateStyle: 'full',
        })
      );
    }
    for (let res of arr2) {
      this.dateExp.push(
        new Date(Number(res.day)).toLocaleDateString('it-IT', {
          dateStyle: 'full',
        })
      );
    }
  }
}
