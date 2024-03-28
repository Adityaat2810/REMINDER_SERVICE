const amqplib = require('amqplib')
const {EXCHANGE_NAME  , MESSAGE_BROKER_URL} = require('../config/server-config')
//creating the channel 
const createChannel = async()=>{
   try{

        const connection = await amqplib.connect(MESSAGE_BROKER_URL);
        const channel = await connection.createChannel();
    
        /*
        one the channel is creted ,this meggage broker like(rabbitmq)
        aslo helped to distribute the message between the queues .
        assertExchange(exchange_name,exchange_type,[options ,[functions(err,ok){...}]] )
        */
        await channel.assertExchange(EXCHANGE_NAME,'direct',false);
        return channel;

   }catch(error){

        throw{error}

   }
}

//subscribing to the message queue
const subscribeMessage = async (channel,service ,binding_key)=>{
    try{
        //console.log(channel);
        const applicationQueue = await channel.assertQueue('REMINDER_QUEUE');
       // console.log('clg')
        console.log(applicationQueue);
         channel.bindQueue(applicationQueue.queue,EXCHANGE_NAME,binding_key);
       


        channel.consume(applicationQueue.queue,msg =>{
            console.log('recieved data');
            console.log(msg.content.toString());
            service(msg.content)
            channel.ack(msg);
         })

    }catch(error){
        console.log(error)
        throw {error}
    }
    
}

//publish the message 
const publishMessage = async(channel, binding_key,message) =>{
    try{

        await channel.assertQueue('REMINDER_QUEUE')
        await channel.publish(EXCHANGE_NAME,binding_key,Buffer.from(message));


    }catch(error){
        throw {error};
    }
}

module.exports ={
    subscribeMessage,
    createChannel,
    publishMessage
}