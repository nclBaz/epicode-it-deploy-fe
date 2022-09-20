import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  apiUrlLogin: string = `${environment.apiURL}/login`;
  apiUrlUsers = `${environment.apiURL}/users/`;

  jwtHelper = new JwtHelperService();
  wrongData: boolean = false;

  login(authLogin: Login) {
    return this.http.post(this.apiUrlLogin, authLogin).pipe(
      tap((res) => {
        localStorage.setItem('user', JSON.stringify(res));
      })
    );
  }

  logUser(token: string) {
    localStorage.setItem('token', token);
  }

  logout(): boolean {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return true;
  }

  isUserLogged() {
    if (localStorage.getItem('token') != null) {
      return !this.jwtHelper.isTokenExpired(localStorage.getItem('token')!);
    }
    return false;
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiUrlUsers + id);
  }
}
