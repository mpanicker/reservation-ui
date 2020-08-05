import {GuestDetails} from '@app/_models/guest-details';
import {PaymentDetails} from '@app/_models/payment-details';
import {RoomDetails} from '@app/_models/room-details';
import {HotelDetails} from '@app/_models/hotel-details';
import {Validators} from '@angular/forms';

export class Reservation {
  bookingNumber: string;
  check_in_date: string;
  check_out_date: string;
  num_of_guest: number;
  num_of_rooms: number;
  dateCreated: string;
  reservation_total_price: number;
  reservation_currency: string;
  reservation_tax: number;
  payment_method: string;
  guestDetails: GuestDetails;
  paymentDetails: PaymentDetails;
  roomDetails: RoomDetails;
  hotelDetails: HotelDetails;
}
