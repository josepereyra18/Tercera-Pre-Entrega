export default class TicketService {

    constructor() {
        this.data = [];
    }

    getTickets() {
        return this.data;
    }

    getTicketById(id) {
        let ticket = this.data.find(ticket => ticket.id === id);
        return ticket ? ticket : null;
    }

    createTicket(ticket) {
        let newTicket = { _id: this.data.length + 1, ...ticket };
        let result = this.data.push(newTicket);
        return result
    }

    updateTicket(id, ticket) {
        let index = this.data.findIndex(ticket => ticket.id === id);
        if (index !== -1) {
            this.data[index] = { ...this.data[index], ...ticket };
            return this.data[index];
        }
    }

}