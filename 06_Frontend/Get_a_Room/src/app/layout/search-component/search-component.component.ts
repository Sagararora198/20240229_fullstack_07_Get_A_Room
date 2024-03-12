import { CommonModule } from '@angular/common';
import { Component, Output ,EventEmitter} from '@angular/core';
import { NgModel,FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css'
})
export class SearchComponentComponent {
  constructor(private router: Router) { }
  city:string = ''
  checkinDate:Date = new Date()
  checkoutDate:Date|null = null
  @Output() userPreference = new EventEmitter<any>()
  @Output() searchParameters: EventEmitter<any> = new EventEmitter();
  onSearch(){
    const userPreferenceObject:{city:string,checkinDate:Date,checkoutDate:Date|null} = {
      city:this.city,
      checkinDate:this.checkinDate,
      checkoutDate:this.checkoutDate
    }
    this.userPreference.emit(userPreferenceObject);
    const searchParams = {
      searchLocation: this.city,
      checkInDate: this.checkinDate,
      checkOutDate: this.checkoutDate
    };
    this.searchParameters.emit(searchParams);
    this.router.navigate(['/properties']);
  }

  dateError: boolean = false;
  checkDates(): void {
    if (this.checkinDate && this.checkoutDate && this.checkoutDate <= this.checkinDate) {
      this.dateError = true;
    } else {
      this.dateError = false;
    }
  }


}
