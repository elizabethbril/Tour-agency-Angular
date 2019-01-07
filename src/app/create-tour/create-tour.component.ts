import { UserAccountInfoModel } from './../model/user-account-info-model';
import { TransportModel } from './../model/transport-model';
import { Component, OnInit } from '@angular/core';
import { TourRepositoryService } from '../services/tour-repository-service';
import { TourRequestModel } from '../model/tour-request-model';
import { TransportTicketModel } from '../model/transport-ticket-model';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {

  constructor(private tourService: TourRepositoryService) { }

  determinedDuration = true;
  startNow = true;
  days = 0;

  tour: TourRequestModel = {
    Name: '',
    Description: '',
    Type: '',
    Country: '',
    City: '',
    Duration: null,
    Price: 0,
    Transport: []
  };

  ngOnInit() {
  }

  getTransportCount() {
    return new Array(this.tour.Transport.length + 1);
  }

  addTour() {

    const now = new Date();
    console.log(now);
    if (this.startNow) {
      this.tour.Duration = now;
    }
    this.tour.Duration = new Date(this.tour.Duration);
    this.tourService.postTour(this.tour).subscribe(
      () => { },
      response => {
        console.log(response);
        if (response.error.status === 404) {
          alert(response.error);
        } else {
          alert(response.error.Message);
        }
        this.tour.Transport.forEach(transport => {
          transport.Tour = transport.Tour;
        });
      },
      () => {
        alert('Success');
        for (let i = 0; i <= this.tour.Transport.length; i++) {
          this.getTransportCount();
        }
        this.tour = {
          Name: '',
          Description: '',
          Type: '',
          Country: '',
          City: '',
          Duration: null,
          Price: 0,
          Transport: []
        };
      }
    );
  }

  onFileChanged(event, i: number) {
    if (!event.target.files[0]) {
      return;
    }
    console.log(event);
    const transport: TransportTicketModel = {
      Id: 0,
      TransportType: '',
      DeparturePoint: '',
      DepartureTime: null,
      ArrivalPoint: '',
      ArrivalTime: null,
      NumberOfSeat: 0,
      Price: 0,
      PassangerName: '',
      PassangerSurname: ''
    };
      transport.TransportType = transport.TransportType;
      transport.DeparturePoint = transport.DeparturePoint;
  }
}
