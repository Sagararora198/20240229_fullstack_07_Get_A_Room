import { Component } from '@angular/core';
import { RoomResourceComponent } from '../layout/room-resource/room-resource.component';

@Component({
  selector: 'app-add-new-hotel-roomproperty2',
  standalone: true,
  imports: [RoomResourceComponent],
  templateUrl: './add-new-hotel-roomproperty2.component.html',
  styleUrl: './add-new-hotel-roomproperty2.component.css'
})
export class AddNewHotelRoomproperty2Component {

  roomResource:{amenities_name:string,required:boolean}[]=[
    {
      "amenities_name": "security",
      "required": true
    },
    {
      "amenities_name": "surveillance",
      "required": true
    },
    {
      "amenities_name": "fire safety",
      "required": true
    },
    {
      "amenities_name": "emergencyexits",
      "required": true
    },
    {
      "amenities_name": "first aid",
      "required": true
    },
    {
      "amenities_name": "smoke detectors",
      "required": true
    },
    {
      "amenities_name": "CO detectors",
      "required": true
    },
    {
      "amenities_name": "security",
      "required": true
    }
  ]

}
