import ticketModel from '../models/ticket.model.js';
export default class TicketService {
    constructor(){

    }

    async getTickets() {
        let tickets = await ticketModel.find();
        return tickets
    }

    async getTicketById(id) {
        let ticket = await ticketModel.findById(id);
        return ticket
    }

    async createTicket(ticket) {
        let result = await ticketModel.create(ticket);
        return result
    }

    async updateTicket(id, ticket) {
        let result = await ticketModel.updateOne({_id:id},ticket)
        return result
    }
}