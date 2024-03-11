import { Component } from '@angular/core';
import { RoomResourceComponent } from '../layout/room-resource/room-resource.component';

@Component({
  selector: 'app-add-new-hotel-roomproperty3',
  standalone: true,
  imports: [RoomResourceComponent],
  templateUrl: './add-new-hotel-roomproperty3.component.html',
  styleUrl: './add-new-hotel-roomproperty3.component.css'
})
export class AddNewHotelRoomproperty3Component {

  roomAmenity:{amenities_name:string,required:boolean}[]=[
    {
      "amenities_name": "Television",
      "required": true
    },
    {
      "amenities_name": "Wifi",
      "required": true
    },
    {
      "amenities_name": "Washer",
      "required": true
    },
    {
      "amenities_name": "Balcony",
      "required": true
    },
    {
      "amenities_name": "Cleaner",
      "required": true
    },
    {
      "amenities_name": "Radio",
      "required": true
    },
    {
      "amenities_name": "Lift",
      "required": true
    },
    {
      "amenities_name": "Other",
      "required": true
    }
  ]

}
