const express =require('express')
const bodyParser = require('body-parser')
const {PORT} = require('./config/server-config')
const {sendBasicEmail} = require('./services/email-service')
const TicketController = require('./controller/ticket-controller')

const EmailService = require('./services/email-service')

const cron = require('node-cron')
const jobs = require('./utils/job')

const {subscribeMessage , createChannel}=require('./utils/messageQueue')
const {REMINDER_BINDING_KEY} = require('./config/server-config')

const setupAndStartServer= async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    app.post('/api/v1/tickets',TicketController.create)

    // we want to use these channel objects inside the controllers 
    const channel = await createChannel()
    //console.log('channel');
    subscribeMessage(channel,EmailService.testingQueue,REMINDER_BINDING_KEY)


    app.listen(PORT,()=>{
        console.log(`Server started at port ${PORT}`);
        jobs()
        // sendBasicEmail(
        //     '"Support" <support@admin.com>',
        //     'adityasainics10@gmail.com',
        //     'this is a testing email',
        //     'hey ,how are you I hope you like the support'
        // )

        // every two minutes it runs
       
    });


}

setupAndStartServer();
