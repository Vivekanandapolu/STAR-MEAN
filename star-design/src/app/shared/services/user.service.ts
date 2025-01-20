import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export default interface UserDetails {
  _id: String;
  email: String;
  role: String;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  interval: any;
  readonly userDetails: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor() {
    // setTimeout(() => {
    this.loadUserDetails();
    // }, 3000);
  }

  loadUserDetails(): void {
    try {
      const user = localStorage.getItem('userDetails');
      if (user) {
        const parsedUser: UserDetails = JSON.parse(user);
        this.userDetails.next(parsedUser);
        return;
      }
      this.userDetails.next(null);
    } catch (error) {
      this.userDetails.next(null); // Reset to null if parsing fails
    }
  }

  // getUserData(): Observable<UserDetails | null> {
  //   return this.userDetails.asObservable();
  // }
}
