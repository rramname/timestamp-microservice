const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/api/timestamp/:timestamp', (req, res) => 
    {
      console.log("with ts")
      var inp=new Date(req.params.timestamp);
      var output={};
      if(inp == "Invalid Date")
        output={error:"Invalid Date"};
      else      
      var output={unix:inp.getTime(),utc:inp.toUTCString()}
      res.send(JSON.stringify(output))
    }
  )
  .get('/api/timestamp/', (req, res) => 
    {
      console.log("no timestamp")
      var inp=new Date();
      var output={};
      if(inp == "Invalid Date")
        output={error:"Invalid Date"};
      else      
      var output={unix:inp.getTime(),utc:inp.toUTCString()}
      res.send(JSON.stringify(output))
    }
  )
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
