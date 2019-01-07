import { TourModel } from './../model/tour-model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TourRepositoryService } from '../services/tour-repository-service';

@Component({
  selector: 'app-tour-list',
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.css']
})
export class TourListComponent implements OnInit {

  constructor(private tourService: TourRepositoryService) { }

  page = 1;
  category: '';
  price: '';
  country: '';
  city: '';
  amount = 10;
  shouldLoadAll  = true;
  _tours: TourModel[] = [];
  selectedTour: TourModel;

  @Input() set tours(tours: TourModel[]) {
    this._tours = tours;
    this.selectedTour = null;
    if (this.shouldLoadAll) {
      this.shouldLoadAll = false;
    }
  }

  @Output() shouldLoad = new EventEmitter<{ country: string, city: string, price: string  }>();

  ngOnInit() {
  }

  reload() {
    this.onLoadToursClick();
  }

  onLoadToursClick() {
    this.selectedTour = null;
    if (this.shouldLoadAll) {
      this.tourService.getTours(this.page, this.amount, this.category, this.country, this.city, this.price).subscribe(response => {
        this._tours = response;
      });
     } else {
      this.shouldLoad.emit({ country: this.country, city: this.city, price: this.price });
    }
  }

  onSelect(tour: TourModel) {
    this.selectedTour = tour;
  }
}
