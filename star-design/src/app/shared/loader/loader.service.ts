import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  readonly loadingSubject = new BehaviorSubject<boolean>(false);
  public loading$ = this.loadingSubject.asObservable()

  show(): void {
    // console.log('LoaderService: show()'); // Debug log
    this.loadingSubject.next(true);
  }

  hide(): void {
    // console.log('LoaderService: hide()'); // Debug log
    this.loadingSubject.next(false);
  }
}
