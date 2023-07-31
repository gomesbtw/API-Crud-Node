import app from "./src/app.js";
import "dotenv/config";
import http from "http";
import { Server } from "socket.io";
const port = process.env.PORT || 3003;


app.listen(port,() => {
  console.log(`Servidor escutando em http://localhost:${port}`);
});

const servidorHttp = http.createServer(app);

const io = new Server(servidorHttp);

io.on("connection", () => {
  console.log("Um cliente se conectou!");
});

  