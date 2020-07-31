import {NgModule, OnInit} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationLayoutComponent } from './reservation.layout.component';
import { ReservationListComponent } from './reservation.list.component';
import { ReservationAddEditComponent } from './reservation.add-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ReservationsRoutingModule
    ],
    declarations: [
      ReservationLayoutComponent,
      ReservationListComponent,
      ReservationAddEditComponent
    ]
})
export class ReservationsModule{
}
