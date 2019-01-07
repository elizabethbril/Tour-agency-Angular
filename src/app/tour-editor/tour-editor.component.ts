import { TransportTicketModel } from './../model/transport-ticket-model';
import { UserRepositoryService } from './../services/user-repository-service';
import { TransportRepositoryService } from './../services/transport-repository-service';
import { TourRepositoryService } from './../services/tour-repository-service';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TourModel } from '../model/tour-model';
import { TransportModel } from '../model/transport-model';

@Component({
  selector: 'app-tour-editor',
  templateUrl: './tour-editor.component.html',
  styleUrls: ['./tour-editor.component.css']
})
export class TourEditorComponent implements OnInit {

  constructor(private tourService: TourRepositoryService,
    private transportService: TransportRepositoryService,
    private userService: UserRepositoryService) { }

  @Input()
  set tour(tour: TourModel) {
    if (!tour) {
      return;
    }
    this._tour = tour;
    this.loadTourUsers();
    this.show = false;
  }

    show = false;
    _tour: TourModel;
    transport: TransportModel[] = [];

  @Output() shouldReload = new EventEmitter<boolean>();

  ngOnInit() {
  }

  getTourName(): string {
    return new Array(this._tour.Name).toLocaleString();
  }

  getTourDuration(): string {
    return new Date(this._tour.Duration).toLocaleString();
  }

  getTourCount() {
    return new Array(this._tour.length + 1);
  }

  replaceInputElem(i: number) {
    const inputElem = <HTMLInputElement>document.getElementById('input' + i);
    const nextInputElem = <HTMLInputElement>document.getElementById('input' + (i + 1));

    if (!nextInputElem) {
      inputElem.value = '';
      console.log(this._tour);
      return;
    }

    inputElem.files = nextInputElem.files;

    this.replaceInputElem(i + 1);
  }

  loadTourUsers() {
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
          alert(response.error.Message);
        }
      });
    }

    onShowClick() {
      this.show = true;
    }

    updateTour() {
      this.tourService.putTour(this._tour.Id, this._tour).subscribe(
        () => { },
        response => {
          console.log(response);
          if (response.error.status === 404) {
            alert(response.error);
          } else {
            alert(response.error.Message);
          }
        },
        () => { alert('Success'); });
    }

    deleteTour() {
      this.tourService.deleteTour(this._tour.Id).subscribe(
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
          alert('Success');
          this.show = false;
          this._tour = null;
          this.shouldReload.emit(true);
        });
    }
}

