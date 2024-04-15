
const lblPending = document.querySelector('#lbl-pending');        // Tickets pendientes
const deskHeader = document.querySelector('h1');                  // Nº de escritorio
const noMoreAlert = document.querySelector('.alert');             // Alerta de "no hay más tickets"
const lblCurrentTicket = document.querySelector('small');         // "Atendiendo a ...." si hay error se mostrará ahí.
const btnDraw = document.querySelector('#btn-draw');              // Boton de siguiente
const btnDone = document.querySelector('#btn-done');              // Boton de terminar




const searchParams = new URLSearchParams(window.location.search); // params que se reciben en url desde el input del index.html (http://localhost:3000/desk.html?escritorio=Dr+Cabrera)
if(!searchParams.has('escritorio')){                              // Sino se envía el escritorio redirección al index y error
  window.location = 'index.html';
  throw new Error('Escritorio es requerido');
}
const deskNumber = searchParams.get('escritorio');                // Si si se envía el escritorio se obtiene el "escritorio" (value del input)
deskHeader.innerText = deskNumber;                                // se modifica el h1



let workingTicket = null;                                         // Ticket en el que se está trabajando

function checkTicketCount(currentCount = 0) {   
  if (currentCount === 0) {                                       // Si la cuenta de tickets = 0  
    noMoreAlert.classList.remove('d-none');                       // quita la clase d-none que quita la alerta  
  } else {                                                        // sino
    noMoreAlert.classList.add('d-none');                          // la añade y vemos la alerta de los tickets que quedan.
  }
                           
  lblPending.innerHTML = currentCount;                            // Actualiza los tickets pendiente en html con el arg recibido                                          
}



async function loadInitialCount() {                               // Muestra los ticket no asignados a un escritorio
  const pendingTickets = await fetch('/api/ticket/pending')
    .then(resp => resp.json());

  checkTicketCount(pendingTickets.length);                        // Actualiza pendientes en el html  
}



async function getTicket(){                                       // Obtiene el ticket asignado a un escritorio    
  await finishTicket()
  const { status, ticket, message } = await fetch(`/api/ticket/draw/${deskNumber}`)  // message es el "posible" error
    .then(resp => resp.json())
  
    if(status === 'error'){
    lblCurrentTicket.innerText = message;
    return;
  }

  workingTicket = ticket;                                         // Se asigna a la variable workingTicket   
  lblCurrentTicket.innerText = ticket.number;                     // y se modifica el html  
}


async function finishTicket(){
  if(!workingTicket) return

  const { status, message } = await fetch(`/api/ticket/done/${workingTicket.id}`,{ // Se
    method: 'PUT'
  }).then(resp => resp.json());

  console.log({status, message})

  if(status === 'ok') {
    workingTicket = null;
    lblCurrentTicket.innerText = 'Nadie'
  }
}



function connectToWebSockets() {

  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (event) => {   // A la escucha del  Evento on-ticket-count-changed (emitido al crear un ticket) y que devuelve el nº de tickets pendientes
    console.log(event.data); 
    const { type, payload } = JSON.parse(event.data);    
    if (type !== 'on-ticket-count-changed') return; // Si el type es 'on-ticket-count-changed' cambiamos el html
  
    checkTicketCount(payload);      // Actualiza pendientes en el html
  };

  socket.onclose = (event) => {
    console.log('Connection closed');
    setTimeout(() => {
      console.log('retrying to connect');
      connectToWebSockets();
    }, 1500);

  };

  socket.onopen = (event) => {
    console.log('Connected');
  };

}

// Listeners
btnDraw.addEventListener('click', getTicket);
btnDone.addEventListener('click', finishTicket)

// Init
loadInitialCount()
connectToWebSockets()