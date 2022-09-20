import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { RegisterService } from 'src/app/auth/register.service';
import { Register } from 'src/app/models/register';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private registerSrv:RegisterService,
    private auth:AuthService,
    private router:Router
  ) { }

  authRegister:Register = {
    email : '',
    password : '',
    first_name: '',
    last_name: ''
  }

  regEx = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm

  ngOnInit(): void {
  }

  register(){
    this.validation()
    if(!this.signupCondition()){
      this.registerSrv.registerUser(this.authRegister).subscribe(data => {
        this.auth.login(this.authRegister).subscribe((res:any) => {
          this.auth.logUser(res.accessToken)
          this.router.navigate(['/'])
        })
      })
    }
  }

  wrongFirstName:boolean = false
  wrongLastName:boolean = false
  wrongEmail:boolean = false
  wrongPassword:boolean = false

  validation(){
    if(this.authRegister.first_name.length < 2){
      this.wrongFirstName = true
    }
    if(this.authRegister.last_name.length < 2){
      this.wrongLastName = true
    }
    if(!this.authRegister.email.match(this.regEx)){
      this.wrongEmail = true
    }
    if(this.authRegister.password.length < 4){
      this.wrongPassword = true
    }
    
  }

  signupCondition() {
    return this.authRegister.first_name.length < 2 ||
    this.authRegister.last_name.length < 2 ||
    !this.authRegister.email.match(this.regEx) ||
    this.authRegister.password.length < 4;
  }

}
