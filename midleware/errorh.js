const {errors}=require('../constant')

const errorhandler=(err,req,res,next)=>{
    const error=res.statusCode ? res.statusCode:500;
    switch(error){
        case errors.VALIDATIONERR:
            res.json({title:"validation faild",
            message:err.message,
            stackTrace:err.stack});
        break;

        case errors.NOT_FOUNT:
            res.json({title:"not found",
            message:err.message,
            stackTrace:err.stack});
        break;

        case errors.UNAUTHORISED:
            res.json({title:"unauthorised",
            message:err.message,
            stackTrace:err.stack});
        break;

        case errors.FORBIDDEN:
            res.json({title:"forbidden",
            message:err.message,
            stackTrace:err.stack});
        break;

        case errors.SERVER_ERR:
            res.json({title:"server error",
            message:err.message,
            stackTrace:err.stack});
        break;

        default:console.log('no error all perfect..')

    
    }
    

};

module.exports=errorhandler;
