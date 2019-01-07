import { Component, OnInit } from '@angular/core';
import { AccountManagementService } from '../services/account-management-service';
import { UserRegistrationModel } from '../model/user-registration-model';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(private accountService: AccountManagementService) { }

  user: UserRegistrationModel = {
    Email: '',
    Password: '',
    ConfirmPassword: '',
    Name: '',
    Surname: '',
    TelephoneNumber: '',
    Role: '',
  };

  ngOnInit() {
  }

  register() {
    this.accountService.register(this.user).subscribe(
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
        this.user = {
          Email: '',
          Password: '',
          ConfirmPassword: '',
          Name: '',
          Surname: '',
          TelephoneNumber: '',
          Role: '',
        };
        alert('Success, now you can login');
      }
    );
  }
}

