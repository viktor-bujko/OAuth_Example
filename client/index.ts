// Module responsible for importing required application sub-modules, creating the application server and launching the app on the server

import Client from "./client";
import http from "http";
import config from "./utils/config"

const server = http.createServer(Client)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
