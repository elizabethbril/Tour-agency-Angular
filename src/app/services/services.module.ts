import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { UserRepositoryService } from './user-repository-service';
import { AccountManagementService } from './account-management-service';
import { TourRepositoryService } from './tour-repository-service';
import { TransportRepositoryService } from './transport-repository-service';


@NgModule({
  imports: [
    HttpClientModule
  ],
  providers: [
    AccountManagementService,
    UserRepositoryService,
    TourRepositoryService,
    TransportRepositoryService
  ]
})
export class ServicesModule { }
