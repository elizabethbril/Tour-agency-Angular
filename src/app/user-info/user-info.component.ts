import { AccountManagementService } from './../services/account-management-service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TourRepositoryService } from '../services/tour-repository-service';
import { TransportRepositoryService } from '../services/transport-repository-service';
import { UserAccountInfoModel } from '../model/user-account-info-model';
import { TourModel } from '../model/tour-model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  constructor(private tourService: TourRepositoryService,
    private transportService: TransportRepositoryService,
    private accountService: AccountManagementService) { }

  @Input()
  set currentUser(currentUser: UserAccountInfoModel) {
    this._currentUser = currentUser;
    this.showTransport = false;
    this.showTours = false;
  }

    _currentUser: UserAccountInfoModel;

  selectedTour: TourModel;
  showTours = false;
  showTransport = false;

  @Output() shouldReload = new EventEmitter<boolean>();

  ngOnInit() {
  }

  selectTour(tour: TourModel) {
    this.selectedTour = tour;
  }

  loadTours(event) {
    // If event == null, it means that we pressed button LoadTours on this component,
    // so we download 1 page
    if (!event) {
      this.tourService.getUserTour(this._currentUser.Email, 1).subscribe(
        response => {
          this._currentUser.Tours = response;
          this.showTours = true;
          this.showTransport = true;
        },
        response => {
          console.log(response);
          if (response.error.status === 404) {
            alert(response.error);
          } else {
            alert(response.error.Message);
          }
        });
    } else {
    this.tourService.getUserTour(this._currentUser.Email, event.page, event.amount).subscribe(
      response => {
        this._currentUser.Tours = response;
        this.showTours = true;
        this.showTransport = false;
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
}

loadTransport() {
  this.transportService.getUserTransport(this._currentUser.Email, 1, this._currentUser.Surname).subscribe(
    response => {

      this.showTours = false;
      this.showTransport = true;
    },
    response => {
      console.log(response);
      if (response.error.status = 404) {
        alert(response.error);
      } else {
        alert(response.error.Message);
      }
    });
}

deleteUser() {
  if (!confirm('This will delete account and all tours. Delete account?')) {
    return;
  }
  if (!confirm('Account can`t be restored. Delete account?')) {
    return;
  }
  if (!confirm('Maybe no?')) {
    return;
  }
  alert('Оkay. Delete!');
  this.accountService.deleteAccount(this._currentUser.Email).subscribe(
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
      this.shouldReload.emit(true);
    });
  }
}
