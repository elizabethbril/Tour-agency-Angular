import { TransportModel } from './transport-model';

export interface TransportPlaceModel {
  Id: number;
  TransportModel: TransportModel;
  TransportId: number;
  NumberOfTransport: number;
  Price: number;
  IsBooked: boolean;
}
