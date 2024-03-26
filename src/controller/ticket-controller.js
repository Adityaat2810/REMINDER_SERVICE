const ticketService = require('../services/email-service');

const create = async (req,res)=>{
    try{
        const response = await ticketService.createNotification(req.body);
        return res.status(201).json({
            success:true,
            data:response,
            err:{},
            message:`sucessfully registered a remainder`
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            data:[],
            err:error,
            message:`failed to registered a remainder`
        })

    }
}


module.exports ={
    create
}