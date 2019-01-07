import { TransportPlaceModel } from './transport-place-model';
import { TourModel } from './tour-model';

export interface TransportModel {
  Id: number;
  Type: string;
  DeparturePoint: string;
  DepartureTime: Date;
  ArrivalPoint: string;
  ArrivalTime: Date;
  TransportPlace: TransportPlaceModel[];
  Tour: TourModel;
}
