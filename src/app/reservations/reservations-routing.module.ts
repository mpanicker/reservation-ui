import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservationLayoutComponent } from './reservation.layout.component';
import { ReservationListComponent } from './reservation.list.component';
import { ReservationAddEditComponent } from './reservation.add-edit.component';

const routes: Routes = [
    {
        path: '', component: ReservationLayoutComponent,
        children: [
            { path: '', component: ReservationListComponent },
            { path: 'add', component: ReservationAddEditComponent },
            { path: 'edit/:bookingNumber', component: ReservationAddEditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReservationsRoutingModule { }
