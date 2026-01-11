export const fileValidator=(ALLOWED_TYPES,MAX_SIZE)=>{
    return(req,res,next)=>{
        const contentLength=parseInt(req.headers['content-length']);
        const contentType = req.headers['content-type'];
        if(contentLength>MAX_SIZE){
            return res.json({error:"Dosya cok buyuk",status:400})
        }
        
        if(contentLength==null){
            return 
        }
        if (!ALLOWED_TYPES.includes(contentType)) {
           return res.status(415).send('Unsupported Media Type');
        }
        next();
    }

}