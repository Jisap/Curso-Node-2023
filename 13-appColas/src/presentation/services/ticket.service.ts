import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from '../../domain/interfaces/tickets';
import { WssService } from './wss.service';



export class TicketService {

  constructor(
    private readonly wssService = WssService.instance, // Método que devuelve la única instancia de WssService
  ){}

  readonly tickets:Ticket [] = [
    { id: UuidAdapter.v4(), number: 1, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 2, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 3, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 4, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 5, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 6, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 7, createdAt: new Date(), done: false },
  ];

  private readonly workingOnTickets: Ticket[] = []; 

  public get pendingTickets():Ticket[]{
    return this.tickets.filter( ticket => !ticket.handleAtDesk )
  }

  public get lastWorkingOnTickets():Ticket[]{
    return this.workingOnTickets.splice(0,4);
  }

  public get lastTicketNumber() {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0;
  }

  // Crear un ticket nuevo
  public createTicket() {
    const ticket : Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber + 1,
      createdAt: new Date(),
      done: false,
      handleAt: undefined,
      handleAtDesk: undefined,
    }

    this.tickets.push(ticket);
    this.onTicketNumberChanged();   // método -> getter para obtener tickets pendientes -> send por websocket

    return ticket
  }

  // Asignamiento de ticket a un escritorio
  public drawTicket( desk:string ) {  
    const ticket = this.tickets.find(t => !t.handleAtDesk);                             // Primer ticket que no tiene asignado un escritorio
    if(!ticket) return {status: 'error', message: 'No hay tickets pendientes'}
    
    ticket.handleAtDesk = desk;                                                         // A ese ticket se le asigna el escritorio
    ticket.handleAt = new Date();                                                       // y la fecha    

    this.workingOnTickets.unshift({...ticket});                                         // Se agrega a workigOnTicket

    this.onTicketNumberChanged();                                                       // Se envía por ws el evento con el nº de tickets pendientes

    return { status: 'ok', ticket }                                                     // Se devuelve el ticket asignado  
  }

  public onFinishTicket( id: string ) {
    const ticket = this.tickets.find( t => t.id === id );
    if(!ticket) return {status: 'error', message: 'Ticket no encontrado'}

    this.tickets.map( ticket => {
      if( ticket.id === id ){
        ticket.done = true
      }
      return ticket;
    });
    return { status: 'ok'}
  }

  private onTicketNumberChanged(){                                //getter
    this.wssService.sendMessage("on-ticket-count-changed", this.pendingTickets.length); // envía por ws el evento con el nº de tickets pendientes
  }
  
}