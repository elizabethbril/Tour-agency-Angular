import { Component, OnInit } from '@angular/core';
import { TourRepositoryService } from '../services/tour-repository-service';
import { TourModel } from '../model/tour-model';

@Component({
  selector: 'app-tour-search',
  templateUrl: './tour-search.component.html',
  styleUrls: ['./tour-search.component.css']
})
export class TourSearchComponent implements OnInit {

  constructor(private tourService: TourRepositoryService) { }

  name: string = null;
  country: string = null;
  city: string = null;
  minPrice: string;
  maxPrice: string;

  searchResult: TourModel[] = [];

  ngOnInit() {
  }

  loadTours(event) {
    if (!event) {
      event = { page: 1, amount: 10 };
    }
    this.tourService.getTours(event.page, event.amount, this.name, this.country, this.city, this.minPrice).subscribe(
      result => { this.searchResult = result; },
      response => {
        console.log(response);
        if (response.error.status === 404) {
          alert(response.error);
        } else {
          alert(response.error.Message);
        }
      });
  }
}
