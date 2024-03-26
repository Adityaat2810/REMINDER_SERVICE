const cron=require('node-cron')
const {sendBasicEmail,fetchPendingEmails} = require('../services/email-service')

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
        console.log(response);
    });
}

module.exports = setupJobs;
