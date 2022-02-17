var express = require("express");
var cors = require("cors");
var apiServer = express();
apiServer.use(cors());

var host = "localhost";
var port = 5000;

apiServer.listen(port, host, ()=>{
    console.log("server ---> http://%s:%d", host, port)
})

apiServer.get("/api/login", (req , res) => {
    console.log("ricevuti" , req.query.mail , req.query.psw);
    if (req.query.mail === "chri" && req.query.psw === "porr") {
        res.sendStatus(200)
    } else {
        res.sendStatus(400)
    }
    
})