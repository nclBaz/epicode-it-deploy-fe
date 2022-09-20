import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../models/register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  apiUrlRegister: string = `${environment.apiURL}/register`;

  constructor(private http: HttpClient) {}

  registerUser(user: Register) {
    return this.http.post(this.apiUrlRegister, user);
  }
}
