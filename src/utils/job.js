const cron=require('node-cron')
const {sendBasicEmail,fetchPendingEmails, updateTicket} = require('../services/email-service')
const sender = require('../config/email-config')

/**
 * 10:00 am
 * Every 5 min 
 * We will ckeck are their any pending email
 * which was expected to be sent by now and 
 * is pending
 */

const setupJobs = () =>{
    
    // cron that run after every 5 minute
    cron.schedule('*/2 * * * *',async () => {
        const response = await fetchPendingEmails();
        response.forEach((email) => {
            /**
             * sender also gives us callback with 
             * err and data as argument 
             */
            sender.sendMail({
                from:"reminderservice",
                to:email.recipientEmail,
                subject:email.subject,
                text:email.content
            },async (err,data)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log(data)
                    await updateTicket(email.id,{status:"SUCCESS"})
                }

            })
           
        });

        // after sending the email update the status of notification ticket 

        console.log(response);
    });
}


/**
 * 
 * There should be multible jobs 
 * => for high priority remainders less time 
 * => less priority remainder crone jobs taking more time 
 * 
 */
module.exports = setupJobs;
