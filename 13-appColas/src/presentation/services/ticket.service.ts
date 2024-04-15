import { UuidAdapter } from "../../config/uuid.adapter";
import { Ticket } from '../../domain/interfaces/tickets';
import { WssService } from './wss.service';



export class TicketService {

  constructor(
    private readonly wssService = WssService.instance, // Método que devuelve la única instancia de WssService
  ){}

  public tickets:Ticket [] = [
    { id: UuidAdapter.v4(), number: 1, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 2, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 3, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 4, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 5, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 6, createdAt: new Date(), done: false },
    { id: UuidAdapter.v4(), number: 7, createdAt: new Date(), done: false },
  ];

  private readonly workingOnTickets: Ticket[] = []; 


  //Getters

  public get pendingTickets():Ticket[]{
    return this.tickets.filter(ticket => !ticket.handleAtDesk)  // Devuelve los tickets que aún no han sido asignados a un escritorio.
  }

  public get lastWorkingOnTickets():Ticket[]{
    return this.workingOnTickets.slice(0, 4);   // Devuelve los primero cuatro tickets asignados.
  }

  public get lastTicketNumber(): number {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0; // Obtiene el número del último ticket de la lista.
  }

  // Métodos de clase

  // Crear un ticket nuevo incrementando el último número y lo añade a la lista
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

  // Asignamiento de ticket pendiente a un escritorio
  public drawTicket( desk:string ) {  
    const ticket = this.tickets.find(t => !t.handleAtDesk);                             // Primer ticket que no tiene asignado un escritorio
    if(!ticket) return {status: 'error', message: 'No hay tickets pendientes'}
    
    ticket.handleAtDesk = desk;                                                         // A ese ticket se le asigna el escritorio
    ticket.handleAt = new Date();                                                       // y la fecha    

    this.workingOnTickets.unshift({...ticket});                                         // Se agrega a workigOnTicket

    this.onTicketNumberChanged();                                                       // Se envía por ws el evento con el nº de tickets pendientes

    this.onWorkingOnChanged();                                                          // Se envía por ws el evento indicando los 4 tickets en los que se esta trabajando

    return { status: 'ok', ticket }                                                     // Se devuelve el ticket asignado  
  }

  // Marca un ticket como completado y actualiza la lista.
  public onFinishTicket( id: string ) {
    const ticket = this.tickets.find( t => t.id === id );                               // Se busca el ticket que se ha terminado
    if(!ticket) return {status: 'error', message: 'Ticket no encontrado'}

    this.tickets.map( ticket => {                                                       // Se le cambia a ese ticket done = true
      if( ticket.id === id ){
        ticket.done = true
      }
      return ticket;                                                                    // Se devuelve el ticket modificado
    });
    return { status: 'ok'}
  }

  private onTicketNumberChanged(){                                //getter
    this.wssService.sendMessage("on-ticket-count-changed", this.pendingTickets.length); // envía por ws el evento con el nº de tickets pendientes
  }

  private onWorkingOnChanged() {
    this.wssService.sendMessage('on-working-changed', this.lastWorkingOnTickets); // envía por ws el evento los 4 tickets sobre los que se esta trabajando
  }
  
}