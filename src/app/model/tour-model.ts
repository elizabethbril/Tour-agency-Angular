import { UserAccountInfoModel } from './user-account-info-model';
import { TransportModel } from './transport-model';

export interface TourModel {

  length: number;
  Id: number;
  Name: string;
  Price: number;
  Type: string;
  Country: string;
  City: string;
  Duration: string;
  Description: string;
  ClientName: UserAccountInfoModel;
  ClientSurname: UserAccountInfoModel;
  Transport: TransportModel[];
}
