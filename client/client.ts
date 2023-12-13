//const config = require("./utils/config")
import express from "express";
import cors from "cors";
import CalendarRouter from "./controllers/calendars";
import mw from "./utils/middleware";

const Client = express();

//const morgan = require("morgan")
//import * as morgan from "morgan";
//const mongoose = require("mongoose")

//morgan.token("body", (request) => JSON.stringify(request.body))

Client.use(cors())
Client.use(express.static("build"))
Client.use(express.json())
//Client.use(morgan(":method :url :status :res[content-length] :response-time ms :body"))
//Client.use(mw.requestLogger)

Client.use("/api/calendar", CalendarRouter);

Client.use(mw.unknownEndpoint)
Client.use(mw.errorHandler)

export default Client;
