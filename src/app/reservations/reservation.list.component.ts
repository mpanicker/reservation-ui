import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ReservationService } from '@app/_services';

@Component({ templateUrl: 'reservation.list.component.html' })
export class ReservationListComponent implements OnInit {
  reservations = null;

    constructor(private reservationService: ReservationService) {}

    ngOnInit() {
        this.reservationService.getAll()
            .pipe(first())
           .subscribe(reservations => this.reservations = reservations);
    }

    deleteReservation(bookingNumber: string) {
      const reservation = this.reservations.find(x => x.bookingNumber === bookingNumber);
      reservation.isDeleting = true;
      this.reservationService.delete(bookingNumber)
        .pipe(first())
        .subscribe(() => {
          this.reservations = this.reservations.filter(x => x.bookingNumber !== bookingNumber);
        });
    }
}
