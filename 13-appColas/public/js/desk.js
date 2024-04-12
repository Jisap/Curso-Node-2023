
const lblPending = document.querySelector('#lbl-pending'); 
const deskHeader = document.querySelector('h1');
const noMoreAlert = document.querySelector('.alert');

const searchParams = new URLSearchParams(window.location.search); // params que se reciben en url desde el input del index.html (escritorio x)
if(!searchParams.has('escritorio')){                              // Sino se envía el escritorio redirección al index y error
  window.location = 'index.html';
  throw new Error('Escritorio es requerido');
}
const deskNumber = searchParams.get('escritorio');                // Si si se envía el escritorio
deskHeader.innerText = deskNumber;                                // se modifica el h1


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




loadInitialCount()
connectToWebSockets()