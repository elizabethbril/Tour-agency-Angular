import { Component, OnInit } from '@angular/core';
import { UserRepositoryService } from '../services/user-repository-service';
import { UserAccountInfoModel } from '../model/user-account-info-model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UsersListComponent implements OnInit {

  constructor(private userService: UserRepositoryService) { }

  users: UserAccountInfoModel[] = [];

  page = 1;
  amount = 10;

  selectedUser: UserAccountInfoModel;
  ngOnInit() {
  }

  reload(shouldReload: boolean) {
    if (shouldReload) {
      this.loadUsers();
      this.selectedUser = null;
    }
  }

  onSelect(user: UserAccountInfoModel) {
    this.selectedUser = user;
  }

  loadUsers() {
    this.userService.getUsers(this.page, this.amount).subscribe(
      result => { this.users = result; },
      response => {
        console.log(response);
        if (response.error.status === 404) {
          alert(response.error);
        } else {
          alert(response.error.Message);
        }
      },
      () => { }
    );
  }

}
