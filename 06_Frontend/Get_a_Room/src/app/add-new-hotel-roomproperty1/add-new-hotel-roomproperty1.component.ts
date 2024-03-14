import { Component } from '@angular/core';
import { AddNewHotelRoomproperty2Component } from '../add-new-hotel-roomproperty2/add-new-hotel-roomproperty2.component';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-new-hotel-roomproperty1',
  standalone: true,
  imports: [AddNewHotelRoomproperty2Component],
  templateUrl: './add-new-hotel-roomproperty1.component.html',
  styleUrl: './add-new-hotel-roomproperty1.component.css'
})
export class AddNewHotelRoomproperty1Component {

  receivedData: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        const hotelDesc = JSON.parse(decodeURIComponent(params['data']));
        console.log(hotelDesc);
        // Use hotelDesc as needed
      }
    });

  }

}
