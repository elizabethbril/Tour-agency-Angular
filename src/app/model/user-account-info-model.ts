import { TourModel } from './tour-model';
import { TransportTicketModel } from './transport-ticket-model';

export interface UserAccountInfoModel {
    Email: string;
    Name: string;
    Surname: string;
    TelephoneNumber: string;
    Tours: TourModel[];
    Transport: TransportTicketModel[];
}
