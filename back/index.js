var express = require("express");
var cors = require("cors");
var apiServer = express();
apiServer.use(cors());
var fs = require("fs");

var host = "localhost";
var port = 5000;

var array = [];

apiServer.listen(port, host, ()=>{
    console.log("server ---> http://%s:%d", host, port)
})

apiServer.get("/api/login", (req , res) => {
    console.log("ricevuti" , req.query.mail , req.query.psw);
    fs.readFile("users.json", (err, data) => {
        if (err) {
            console.log("error: " + err);
            res.status(500).json({message: "errore generico"});
        } else {
            var users = JSON.parse(data);
            var mail = users.find(x => x.mail  === req.query.mail)
            var psw = users.find(x => x.psw  === req.query.psw)
            if (mail && psw) {
                res.status(200).json({message: "login effettuato"});
            } else {
                res.status(400).json({message: "login non effettuato"});
            }
        }
    });
})

apiServer.get("/api/reg", (req , res) => {
    console.log("ricevuti" , req.query.mail , req.query.psw);
    var str = {"mail" : req.query.mail, "psw" : req.query.psw};
    array.push(str);
    fs.writeFile("users.json", JSON.stringify(array), (err) =>{
        if(err){
            console.log(err);
            res.status(400).json({message: "reg non effettuato"});
        }
        else{
            console.log("ho scritto");
            res.status(200).json({message: "reg effettuato"});
        }
    });
})