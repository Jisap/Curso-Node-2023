

function renderTickets(tickets = []) {  // Recibe los 4 primeros tickets asignados a un escritorio y los renderiza en el html

  for (let i = 0; i < tickets.length; i++) {
    if (i >= 4) break;

    const ticket = tickets[i];
    if (!ticket) continue;

    const lblTicket = document.querySelector(`#lbl-ticket-0${i + 1}`);
    const lblDesk = document.querySelector(`#lbl-desk-0${i + 1}`);

    lblTicket.innerText = `Ticket ${ticket.number}`;
    lblDesk.innerText = ticket.handleAtDesk

  }
}


async function loadCurrentTickets() {
  const tickets = await fetch('/api/ticket/working-on').then(resp => resp.json()); // Obtiene los 4 primeros tickets asignados
  renderTickets(tickets);                                                          // se renderizan en public.html 

}



function connectToWebSockets() {

  const socket = new WebSocket('ws://localhost:3000/ws');

  socket.onmessage = (event) => {                         // Se reccibe un mensaje por ws
    const { type, payload } = JSON.parse(event.data);     // Se obtiene el type y la data
    if (type !== 'on-working-changed') return;            // Si el type no es 'on-workin-changed' return
    renderTickets(payload);                               // pero si lo es renderizamos los tickets
  };

  socket.onclose = (event) => {

    setTimeout(() => {
      connectToWebSockets();
    }, 1500);

  };

  socket.onopen = (event) => {
    console.log('Connected');
  };

}




loadCurrentTickets();
connectToWebSockets();