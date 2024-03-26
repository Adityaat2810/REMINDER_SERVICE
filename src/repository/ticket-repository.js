const { NotificationTicket } = require('../models/index')
const { Op } = require('sequelize');

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

    async update(ticketId,data){
        try{

            const response = await NotificationTicket.findByPk(ticketId);
            if(data.status){
                response.status = data.status;
                await response.save();
            }
            return response

        }catch(error){
            console.log(`something went wrong in the repository layer`);
            throw {error};
        }
    }

    async get(filter){
        try{

            const tickets= await NotificationTicket.findAll({
                where:{
                    status:"PENDING",
                    notificationTime: {
                        [Op.lte]:new Date()
                    }
                    // [Op.lt]: givenTime
                }
            });

            return tickets;

        }catch(error){
            console.log(`something went wrong in the repository layer`);
            throw {error};

        }
    }

    
}

module.exports = TicketRepository
