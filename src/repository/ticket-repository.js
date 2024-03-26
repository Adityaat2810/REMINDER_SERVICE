const { NotificationTicket } = require('../models/index')

class TicketRepository{

    async getAllTickets(){
        try{
            const tickets = await NotificationTicket.findAll();
            return tickets;
        }catch(error){

        }
    }

    async createTicket(data){
        try{
            const ticket = await NotificationTicket.create(data);
            return ticket;
        }catch(error){
            console.log(`something went wrong in the repository layer`);
            throw {error};
        }
    }

    
}

module.exports = TicketRepository
