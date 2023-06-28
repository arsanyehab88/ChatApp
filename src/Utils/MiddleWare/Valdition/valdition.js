




export const Validition = (schema)=>{
    return (req,res,next)=>{
        let inputs = {...req?.body,...req?.query,...req?.params}
        let {error}= schema.validate(inputs,{abortEarly:true});
        
        if(error){
            let errors = error?.details?.map((detail)=>detail?.message)
            res.status(409).json(errors)
        }else{
            next()
        }
    }
}