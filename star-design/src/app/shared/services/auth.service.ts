import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; // Return true is the token exists
  }
}
