// Import
import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import helmet from "helmet";
import api_v1 from "./api/v1/index.js";
import mongoose from "mongoose";



// Configurations

const app = express();
dotenv.config();
const port = process.env.ENV_PORT;


// Middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));
app.use(helmet());


// Prefix 'api/v1' via api/v1/index.js
app.use('/api/v1', api_v1);


// Request GET
app.get("/", (req, res) => {
    res.json("Hi' World")
})


/**
 * Connect mongoDB. After that server is run.
 * @param {mongoose.connect} Url , Option: Database Name
 */
mongoose.connect(process.env.MONGO_URL,{dbName:process.env.MONGO_DB_NAME}).then(() => {
    app.listen(port, (req, res) => {
        console.log("[Server]",
            {
                "Connect": "Ok",
                "Port": port,
                "Database":"mongoDB",
            }
        )
    })
}).catch((error) => {
    // Catch error of mongoDB
    console.log(error, {
        "mongoDB":
            {
                "msg": "Connection Fail!",
                "Log": 1
            }
    })
})

