import { Component, Output ,EventEmitter} from '@angular/core';
import { NgModel,FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-component.component.html',
  styleUrl: './search-component.component.css'
})
export class SearchComponentComponent {
  city:string = ''
  checkinDate:Date = new Date()
  checkoutDate:Date|null = null
  @Output() userPreference = new EventEmitter<any>()
  onSearch(){
    const userPreferenceObject:{city:string,checkinDate:Date,checkoutDate:Date|null} = {
      city:this.city,
      checkinDate:this.checkinDate,
      checkoutDate:this.checkoutDate
    } 
    this.userPreference.emit(userPreferenceObject)
  }
  


  
}
