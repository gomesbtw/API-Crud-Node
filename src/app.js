import express from "express";
import db from "./config/dbConnect.js";
// eslint-disable-next-line no-unused-vars
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";
import manipulador404 from "./middlewares/manipulador404.js";
import url from "url";
import path from "path";



db.on("error", console.log.bind(console,"Erro de conexão"));
db.once("open", () =>{
  console.log("conexão com o banco feita com sucesso");
});

const caminhoAtual = url.fileURLToPath(import.meta.url);
const diretorioPublico = path.join(caminhoAtual, "../..","netflix-clone-main");

const app = express();

//app.use(express.json());
app.use(express.static(diretorioPublico));
//routes(app);

app.use(manipulador404);

// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);




export default app;