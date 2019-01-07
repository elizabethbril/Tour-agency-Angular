import { AccountManagementService } from './../services/account-management-service';
import { UserRepositoryService } from './../services/user-repository-service';
import { Component, OnInit, Input  } from '@angular/core';
import { TourRepositoryService } from '../services/tour-repository-service';
import { UserAccountInfoModel } from '../model/user-account-info-model';
import { TourModel } from '../model/tour-model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(private userService: UserRepositoryService,
    private tourService: TourRepositoryService,
    private accountService: AccountManagementService) { }

  @Input() currentUser: UserAccountInfoModel;

  selectedTour: TourModel;
  showArchiveTours = false;

  ngOnInit() {
  }

  selectTour(tour: TourModel) {
    this.selectedTour = tour;
  }

  reload(shouldReload: boolean) {
    if (shouldReload) {
      this.loadTour();
      this.selectedTour = null;
    }
  }

  loadTour() {
    this.tourService.getUserTour(this.currentUser.Email, 1).subscribe(response => {
      this.currentUser.Tours = response;
    });
  }

  putUser() {
    this.userService.putUser(this.currentUser.Email, this.currentUser).subscribe(
      () => { },
      response => {
        console.log(response);
        if (response.error.status === 404) {
          alert(response.error);
        } else {
          alert(response.error.Message);
        }
      },
      () => { alert('Profile updated'); });
  }

  deleteTour(tourId: number) {
    this.tourService.deleteTour(tourId).subscribe(
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
        this.loadTour();
      });
  }

  deleteCurrentUser() {
    if (confirm('This will delete your account and all tours. Delete account?')) {
      const password = prompt('Password');
      this.accountService.validatePassword(this.currentUser.Email, password).subscribe(() => { },
        () => { alert('Wrong password'); },
        () => {
          this.accountService.deleteAccount(this.currentUser.Email).subscribe(
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
              alert('Deleted successfully');
              this.accountService.logout();
              location.reload();
            });
        });
    }
  }
}

