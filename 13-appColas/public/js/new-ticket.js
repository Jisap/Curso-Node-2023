



const currentTicketLbl = document.querySelector('span');  // Donde se muestran los tickets
const createTicketBtn = document.querySelector('button'); // Botón de generar tickets

async function getLastTicket() {
  const lastTicket = await fetch('/api/ticket/last')      // Petición para obtener el último ticket
    .then(resp => resp.json())
  
  currentTicketLbl.innerText = lastTicket;                // Actualización del html 
}

async function createTicket() {                           // Peticion para crear nuevo ticket
  const newTicket = await fetch('/api/ticket', {
    method: 'POST'  
  }).then( resp => resp.json());

  currentTicketLbl.innerText = newTicket.number;          // Modificación del html
}

createTicketBtn.addEventListener('click', createTicket)   // Listener para el evento click -> createTicket


getLastTicket();                                          // Cuando se entra a new-ticket.html se obtiene el último ticket  