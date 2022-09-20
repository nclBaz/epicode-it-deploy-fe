import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Login } from 'src/app/models/login';
import { RestaurantsService } from '../restaurants/restaurants.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router,
    private restSrv:RestaurantsService
  ) { }

  authLogin: Login = {
    email: '',
    password: ''
  }

  city!:string
  restId!:string
  wrongData: boolean = false
  
  ngOnInit(): void {
    this.city = this.restSrv.city
    this.restId = this.restSrv.restId
  }

  login() {
    
    this.auth.login(this.authLogin).subscribe((res: any) => {
      
        this.auth.logUser(res.accessToken)
  
        if (res.user.restaurant) {
          this.router.navigate(['/owners/dashboard'])
        } else if(this.city){
          this.router.navigate(['/restaurants/' + this.city])
        } else if(this.restId){
          this.router.navigate(['/restaurants/details/'+this.restId])
        }else {
          this.router.navigate(['/'])
        }

    })
  
  }

  goToRegisterPage() {
    this.router.navigate(['/signup'])
  }


}
