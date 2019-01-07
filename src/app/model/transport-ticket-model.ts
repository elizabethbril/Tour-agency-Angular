export interface TransportTicketModel {
  Id: number;
  TransportType: string;
  DeparturePoint: string;
  DepartureTime: Date;
  ArrivalPoint: string;
  ArrivalTime: Date;
  NumberOfSeat: number;
  Price: number;
  PassangerName: string;
  PassangerSurname: string;
}
