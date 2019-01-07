import { TransportPlaceModel } from './../model/transport-place-model';
import { TransportModel } from './../model/transport-model';
import { TourModel } from './../model/tour-model';
import { TourRepositoryService } from './../services/tour-repository-service';
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { TransportRepositoryService } from '../services/transport-repository-service';
import { UserRepositoryService } from '../services/user-repository-service';

@Component({
  selector: 'app-tour-information',
  templateUrl: './tour-information.component.html',
  styleUrls: ['./tour-information.component.css']
})
export class TourInformationComponent implements OnInit {

  constructor(private tourService: TourRepositoryService,
    private transportService: TransportRepositoryService,
    private userService: UserRepositoryService) { }

    show = false;
    _tour: TourModel = null;
    transport: TransportModel = null;
    durationTime: string;
    price = 0;

    @Input()
    set tour(tour: TourModel) {
      this._tour = tour;
      this.show = false;
      if (!tour) {
        return;
      }
      this.price = this._tour.Price;
      this.loadTour();
    }

    @Output() shouldReload = new EventEmitter<boolean>();

  ngOnInit() {
  }

  getStartDate(): string {
    return new Date(this._tour.Duration).toLocaleString();
  }

  refreshTour() {
    if (this._tour) {
      this.tourService.getTour(this._tour.Id).subscribe(
        (response) => {
          this._tour.Price = response.Price;
          this._tour.Duration = response.Duration;
          this._tour.Country = response.Country;
          this._tour.City = response.City;
          if (response.ClientSurname) {
            this._tour.ClientSurname = response.ClientSurname;
            this._tour.ClientName = response.ClientName;
          }
          this.price = this._tour.Price;
        },
        () => {
          alert('Sorry, but this tour is sold');
          this.shouldReload.emit(true);
        },
        () => { }
      );
    }
  }

  onShowClick() {
    this.show = true;
  }

  loadTourClients() {
    this.userService.getSellerUser(this._tour.Id).subscribe(
      response => {
        this._tour.ClientSurname = response;
      },
      response => {
        console.log(response);
        if (response.error.status === 404) {
          alert(response.error);
        } else {
          alert(response.error.Message);
        }
      },
      () => { this.show = true; });
    this.userService.getBuyerUser(this._tour.Id).subscribe(
      response => {
        if (response) {
          this._tour.ClientSurname = response;
        }
      },
      response => {
        console.log(response);
        if (response.error.status === 404) {
          alert(response.error);
        } else {
          alert(response.error.Message); }
      });
  }

  loadTour() {
    this.loadTourClients();
    this.loadTourTransport();
  }

  loadTourTransport() {
    this.transportService.getTransport(this.transport.Id).subscribe(response => {
          });
  }

  confirmTour() {
    this.refreshTour();
    const now = new Date();
    if (now.getTime() > Date.parse(this._tour.Duration.toString())) {
      alert('Sorry, this tour is sold');
      return;
    }
    if (confirm('Country to go' + this._tour.Country + ' for ' + this._tour.Price)) {
      this.tourService.postTourOffer(this._tour.Name, this._tour.Price).subscribe(
        () => { },
        response => {
          console.log(response);
          if (response.error.status === 404) {
            alert(response.error);
          } else {
            alert(response.error.Message);
          }
        },
        () => {
          this.refreshTour();
          alert('Success');
        }
      );
    }
  }

  addTransport() {
    if (!this.transport.TransportPlace || !this.transport.TransportPlace) {
      alert('Enter departure point');
    } else {
      this.transportService.addTransport(this._tour.Id, this.transport).subscribe(
        () => { },
        response => {
          console.log(response);
          if (response.error.status = 404) {
            alert(response.error);
          } else {
            alert(response.error.Message);
          }
        },
        () => {
          alert('Success');
          this.loadTourTransport();
        }
      );
    }
  }
}

