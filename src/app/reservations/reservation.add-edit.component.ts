import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ReservationService, AlertService } from '@app/_services';
import {Reservation} from '../_models';
import {GuestDetails} from '../_models/guest-details';

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
      num_of_rooms: ['', Validators.required],
      reservation_total_price: ['', Validators.required],
      reservation_currency: ['', Validators.required],
      reservation_tax: ['', Validators.required],
      payment_method: ['', Validators.required],
      guestDetails: this.formBuilder.group({ // make a nested group
        full_name: ['', Validators.required],
        address: ['', Validators.required],
        country: ['', Validators.required],
        phone: ['', Validators.required],
        email: ['', Validators.required],
        language: ['', Validators.required]
      }),
      paymentDetails: this.formBuilder.group({ // make a nested group
        credit_card_num: ['', Validators.required],
        credit_card_type: ['', Validators.required],
        expiry_date: ['', Validators.required],
        sec_code: ['', Validators.required]
      }),
      roomDetails: this.formBuilder.group({ // make a nested group
        room_id: ['', Validators.required],
        room_name: ['', Validators.required],
        room_desc: ['', Validators.required],
        notes: ['', Validators.required]
      }),
      hotelDetails: this.formBuilder.group({ // make a nested group
        hotel_name: ['', Validators.required],
        hotel_address: ['', Validators.required],
        hotel_phone: ['', Validators.required],
      })

    });

    if (!this.isAddMode) {
      this.reservationService.getById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.f.check_in_date.setValue(x.check_in_date);
          this.f.check_out_date.setValue(x.check_out_date);
          this.f.num_of_guest.setValue(x.num_of_guest);
          this.f.num_of_rooms.setValue(x.num_of_rooms);
          this.f.reservation_total_price.setValue(x.reservation_total_price);
          this.f.reservation_currency.setValue(x.reservation_currency);
          this.f.reservation_tax.setValue(x.reservation_tax);
          this.f.payment_method.setValue(x.payment_method);
          this.form.get('guestDetails.full_name').setValue(x.guestDetails.full_name);
          this.form.get('guestDetails.address').setValue(x.guestDetails.address);
          this.form.get('guestDetails.country').setValue(x.guestDetails.country);
          this.form.get('guestDetails.phone').setValue(x.guestDetails.phone);
          this.form.get('guestDetails.email').setValue(x.guestDetails.email);
          this.form.get('guestDetails.language').setValue(x.guestDetails.language);
          this.form.get('paymentDetails.credit_card_num').setValue(x.paymentDetails.credit_card_num);
          this.form.get('paymentDetails.credit_card_type').setValue(x.paymentDetails.credit_card_type);
          this.form.get('paymentDetails.expiry_date').setValue(x.paymentDetails.expiry_date);
          this.form.get('paymentDetails.sec_code').setValue(x.paymentDetails.sec_code);
          this.form.get('roomDetails.room_id').setValue(x.roomDetails.room_id);
          this.form.get('roomDetails.room_name').setValue(x.roomDetails.room_name);
          this.form.get('roomDetails.room_desc').setValue(x.roomDetails.room_desc);
          this.form.get('roomDetails.notes').setValue(x.roomDetails.notes);
          this.form.get('hotelDetails.hotel_name').setValue(x.hotelDetails.hotel_name);
          this.form.get('hotelDetails.hotel_address').setValue(x.hotelDetails.hotel_address);
          this.form.get('hotelDetails.hotel_phone').setValue(x.hotelDetails.hotel_phone);

        });
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  get guestDetailsForm() { return this.form.get('guestDetails'); }

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
