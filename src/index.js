const express =require('express')
const bodyParser = require('body-parser')
const {PORT} = require('./config/server-config')
const {sendBasicEmail} = require('./services/email-service')
const TicketController = require('./controller/ticket-controller')

const cron = require('node-cron')
const jobs = require('./utils/job')

const setupAndStartServer= () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));


    app.post('/api/v1/tickets',TicketController.create)

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
