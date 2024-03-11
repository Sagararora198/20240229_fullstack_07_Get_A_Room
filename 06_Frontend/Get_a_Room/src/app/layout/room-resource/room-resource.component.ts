import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-room-resource',
  standalone: true,
  imports: [],
  templateUrl: './room-resource.component.html',
  styleUrl: './room-resource.component.css'
})
export class RoomResourceComponent {

  @Input() amenity:{amenities_name:String,required:Boolean}={
    amenities_name:'asd',
    required:true
  }

}
