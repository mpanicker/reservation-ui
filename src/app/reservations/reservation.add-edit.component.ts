import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ReservationService, AlertService } from '@app/_services';

@Component({ templateUrl: 'reservation.add-edit.component.html' })
export class ReservationAddEditComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private reservationService: ReservationService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['bookingNumber'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
          check_in_date: ['', Validators.required],
          check_out_date: ['', Validators.required],
          num_of_guest: ['', Validators.required],
          num_of_rooms: ['', Validators.required]
        });

        if (!this.isAddMode) {
            this.reservationService.getById(this.id)
                .pipe(first())
                .subscribe(x => {
                    this.f.check_in_date.setValue(x.check_in_date);
                    this.f.check_out_date.setValue(x.check_out_date);
                    this.f.num_of_guest.setValue(x.num_of_guest);
                    this.f.num_of_rooms.setValue(x.num_of_rooms);
                });
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createReservation();
        } else {
            this.updateReservation();
        }
    }

    private createReservation() {
        this.reservationService.register(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Reservation added successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['.', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

    private updateReservation() {
        this.reservationService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['..', { relativeTo: this.route }]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
