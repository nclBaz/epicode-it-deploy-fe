import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  apiUrlRegister:string = 'http://localhost:4201/register';

  constructor(
    private http:HttpClient
  ) { }

  registerUser(user:Register) {
    return this.http.post(this.apiUrlRegister, user)
  }
}
