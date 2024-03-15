import { Component, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookingService } from '../../adminbookings/booking.service';
import EventEmitter from 'events';

@Component({
  selector: 'app-bookingsbox',
  standalone: true,
  imports: [],
  templateUrl: './bookingsbox.component.html',
  styleUrl: './bookingsbox.component.css'
})
export class BookingsboxComponent {


  // hotelname:string=""
  // hotelImg:string=""
  // duration:string=""
  // amount:string=""
  // guests:string=""

  bookingDate:string =""
  bookedBy:string=""
  bookedRoom:string=""
  checkinDate:string=""
  checkoutDate:string=""
  paymentDetails:string="wallet"

  @Input() booking:any

  // @Output() cancelReservationEvent: EventEmitter<any> = new EventEmitter<any>();

  // deleteBooking():void{
  //   this.cancelReservation.emit(this.booking);
  // }

  // cancelReservation() {
  //   // Emitting an event to notify the parent component
  //   this.cancelReservationEvent.emit(x);
  // }

 }

