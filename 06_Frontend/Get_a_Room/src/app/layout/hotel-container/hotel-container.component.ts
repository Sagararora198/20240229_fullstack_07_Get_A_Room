import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-hotel-container',
  standalone: true,
  imports: [],
  templateUrl: './hotel-container.component.html',
  styleUrl: './hotel-container.component.css'
})
export class HotelContainerComponent {

  @Input() Hotel:{hotelName:String,hotelAddress:String,hotelPricerange:String} = {
    hotelName:"sdf",
    hotelAddress:"sf",
    hotelPricerange:"as"


}
}
