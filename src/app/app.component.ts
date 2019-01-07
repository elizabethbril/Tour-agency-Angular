import { Component, OnInit } from '@angular/core';
import { TourRepositoryService } from './services/tour-repository-service';
import { UserRepositoryService } from './services/user-repository-service';
import { AccountManagementService } from './services/account-management-service';
import { TransportRepositoryService } from './services/transport-repository-service';
import { UserAccountInfoModel } from './model/user-account-info-model';
import { TourModel } from './model/tour-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Tour Agency';

  constructor(private tourService: TourRepositoryService,
    private userService: UserRepositoryService,
    private accountService: AccountManagementService,
    private transportService: TransportRepositoryService) { }

    currentUser: UserAccountInfoModel;
    Id: number;
    tourById: TourModel;
    tourByName: TourModel[];
    searchName: string;
    allTours = false;
    oneTour = false;
    createTour = false;
    searchTour = false;
    detailedSearch = false;
    register = false;
    login = false;
    allUsers = false;
    profile = false;

    ngOnInit() {
      if (sessionStorage.getItem('tokenKey')) {
        this.userService.getCurrentUser().subscribe(
          response => {
            this.currentUser = response;
          },
          () => {
            this.logout();
          });
      }
    }

    reloadCurrentUser() {
      this.userService.getCurrentUser().subscribe(
        response => {
          this.currentUser = response;
        });
    }

    loadTours(event) {
      this.tourService.getTours( event.number, event.name, event.category, event.ciy, event.county, this.searchName).subscribe(
        result => { this.tourByName = result; },
        () => { alert('Error'); },
        () => {
          this.tourByName.forEach(tour => {
            this.transportService.getTransport(tour.Id).subscribe(response => {
              tour.Transport = [response];
            });
          });
        }
      );
    }

    showAllTours() {
      this.allTours = true;
      this.oneTour = false;
      this.createTour = false;
      this.searchTour = false;
      this.register = false;
      this.login = false;
      this.allUsers = false;
      this.profile = false;
      this.detailedSearch = false;
    }

    showOneTour() {
      this.allTours = false;
      this.oneTour = true;
      this.createTour = false;
      this.searchTour = false;
      this.register = false;
      this.login = false;
      this.allUsers = false;
      this.tourService.getTour(this.Id).subscribe(
        response => {
          this.tourById = response;
        },
        response => {
          console.log(response);
          if (response.error.status === 404) {
            alert(response.error);
          } else {
            alert(response.error.Message);
          }
        });
      this.profile = false;
      this.detailedSearch = false;
    }

  showSearch() {
    this.allTours = false;
    this.oneTour = false;
    this.createTour = false;
    this.searchTour = true;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.loadTours({ page: 1, amount: 10, name});
    this.profile = false;
    this.detailedSearch = false;
  }

  showCreateTour() {
    this.allTours = false;
    this.oneTour = false;
    this.createTour = true;
    this.searchTour = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.profile = false;
    this.detailedSearch = false;
  }

  showRegister() {
    this.allTours = false;
    this.oneTour = false;
    this.createTour = false;
    this.searchTour = false;
    this.register = true;
    this.login = false;
    this.allUsers = false;
    this.profile = false;
    this.detailedSearch = false;
  }
  showLogin() {
    this.allTours = false;
    this.oneTour = false;
    this.createTour = false;
    this.searchTour = false;
    this.register = false;
    this.login = true;
    this.allUsers = false;
    this.profile = false;
    this.detailedSearch = false;
  }

  showAllUsers() {
    this.allTours = false;
    this.oneTour = false;
    this.createTour = false;
    this.searchTour = false;
    this.register = false;
    this.login = false;
    this.allUsers = true;
    this.profile = false;
    this.detailedSearch = false;
  }

  showProfile() {
    this.allTours = false;
    this.oneTour = false;
    this.createTour = false;
    this.searchTour = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.profile = true;
    this.detailedSearch = false;
  }
  showDetailedSearch() {
    this.allTours = false;
    this.oneTour = false;
    this.createTour = false;
    this.searchTour = false;
    this.register = false;
    this.login = false;
    this.allUsers = false;
    this.profile = false;
    this.detailedSearch = true;
  }

  logout() {
    this.currentUser = null;
    this.accountService.logout();
    document.location.reload();
  }

}
