import { TransportModel } from './transport-model';

export class TourRequestModel {

  Name: string;
  Price: number;
  Type: string;
  Country: string;
  City: string;
  Duration: Date;
  Description: string;
  Transport: TransportModel[];
}


