import { Injectable } from "@nestjs/common";

@Injectable()
export class ReservationService {
  getListReservations(): string[] {
    return ["Reservation1", "Reservation2", "Reservation3"];
  }
}
