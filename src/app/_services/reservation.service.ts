import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import {Reservation} from '@app/_models';

@Injectable({ providedIn: 'root' })
export class ReservationService {
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.http.get<Reservation[]>(`${environment.apiUrl}/api/v1/reservations`);
  }

  getById(id: string) {
    return this.http.get<Reservation>(`${environment.apiUrl}/api/v1/reservation/${id}`);
  }

  update(id, params) {
    return this.http.put<Reservation>(`${environment.apiUrl}/api/v1/reservation/${id}`, params)
      .pipe(map(x => {
        return x;
      }));
  }

  delete(bookingNumber: string) {
    return this.http.delete(`${environment.apiUrl}/api/v1/reservation/${bookingNumber}`)
      .pipe(map(x => {
        return x;
      }));
  }

  register(reservation: Reservation) {
    return this.http.post<Reservation>(`${environment.apiUrl}/api/v1/reservation`, reservation);
  }

}
