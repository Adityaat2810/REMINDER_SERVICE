const sender = require('../config/email-config');

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

module.exports = {
    sendBasicEmail
}

/**
 * SMPT -> a@b.com
 * reciever ->d@e.com  
 * 
 * from:support@default.com  // or any thing{not need to be valid email}
 * 
 */