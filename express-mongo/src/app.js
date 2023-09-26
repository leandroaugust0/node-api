import express from "express";
import conectaNaDataBase from "./config/dbConnect.js";
import routes from "./routes/index.js";

const conexao = await conectaNaDataBase();

conexao.on("error", (erro) => {
  console.error("erro de conexão", erro);
});

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso");
});

const app = express();
routes(app);


// app.put("/livros/:id", (req, res) => {
//   const index = buscaLivro(req.params.id);
//   livros[index].titulo = req.body.titulo;
//   res.status(200).json(livros);
// });

// app.delete("/livros/:id", (req, res) => {
//   const index = buscaLivro(req.params.id);
//   livros.splice(index, 1);
//   res.status(200).send("livro removido com sucesso");
// });

export default app;
