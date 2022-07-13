

module.exports = {

    Clients : [],

    EnterQueue: (req,res,next) => {






        
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
          })


         
    }


        
    
}