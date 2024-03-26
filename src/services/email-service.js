const sender = require('../config/email-config');
const TicketRepository= require('../repository/ticket-repository')
const ticketRepository = new TicketRepository();

const sendBasicEmail =async (mail1 ,mail2 ,mailSubject,mailBody)=>{
   try{
        const response = await sender.sendMail(
        {
            from:mail1,
            to:mail2,
            subject:mailSubject,
            text:mailBody
        });
    
        console.log(response);
   }catch(error){

        console.log(`something went wrong in the email services`);
        throw {error}
   }
}

const fetchPendingEmails = async (timestamp)=>{

    try{
        const response = await ticketRepository.getAllTickets();
        return response;

    }catch(error){
        console.log(`something went wrong in the email services`);
        throw {error}
    }

}

const createNotification = async(data)=>{
    try{

        const response = await ticketRepository.createTicket(data);
        return response;

    }catch(error){
        console.log(`something went wrong in the email services`);
        throw {error}
    }
}

module.exports = {
    sendBasicEmail,
    fetchPendingEmails,
    createNotification
}

/**
 * SMPT -> a@b.com
 * reciever ->d@e.com  
 * 
 * from:support@default.com  // or any thing{not need to be valid email}
 * 
 */