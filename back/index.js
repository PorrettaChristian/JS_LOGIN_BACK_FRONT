var express = require("express");
var cors = require("cors");
var apiServer = express();
apiServer.use(cors());
var fs = require("fs");
const mysql = require('mysql2');



const connection = mysql.createConnection({
    host: 'porretta.christian.tave.osdb.it',
    user: 'c189_christian',
    password: "Az-72944",
    database: 'c189_5AI_2021',
})
  
var host = "localhost";
var port = 5000;

var array = [];

apiServer.listen(port, host, ()=>{
    console.log("server ---> http://%s:%d", host, port)
})

apiServer.get("/api/login", (req , res) => {
    console.log("ricevuti" , req.query.mail , req.query.psw);
    connection.query(
        'SELECT * FROM `users` WHERE `mail` = ? AND `psw` = ?',
        [req.query.mail, req.query.psw],
        function(err, results, fields) {
            if (results.length === 0) res.status(400).json({message: "log non effettuato"});
            else {
                console.log(results[0].id)
                // localStorage.setItem("id_user", results[0].id);
                
                res.status(200).json({message: "log effettuato"});
            }
        }
    );
})

apiServer.get("/api/reg", (req , res) => {
    console.log("ricevuti" , req.query.mail , req.query.psw);
    connection.query(
        "INSERT INTO users (mail, psw) VALUES (?,?);",
        [req.query.mail, req.query.psw],
        function(err, results, fields) {
            console.log(err);
            if (err)  res.status(400).json({message: "reg non effettuato"});
            else res.status(200).json({message: "reg effettuato"}); 
        }
    );
})

apiServer.get("/api/getVoti", (req , res) => {
    //console.log("ricevuti" , req.query.mail , req.query.psw);
    connection.query(
        'SELECT * FROM `voti` WHERE `id_user` = ? ',
        [localStorage.getItem("id_user")],
        function(err, results, fields) {
            console.log(err);
            if (err)  res.status(400).json({message: "reg non effettuato"});
            else{
                console.log("res: ",results);
                res.status(200).json({message: "reg effettuato"}); 
            } 
        }
    );
})