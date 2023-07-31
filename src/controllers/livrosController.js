import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, livros} from "../models/index.js";
class LivroController {
  static listarLivros = async (req,res,next) =>{
    try{
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    }catch(erro){
      next(erro);
    }
  };
  static listarLivroPorId =  async (req,res,next) =>{
    try{
      const id = req.params.id;
      const livroResultados = await livros.findById(id)
        .populate("Autor","nome")
        .exec();
      if (livroResultados !== null) {
        res.status(200).send(livroResultados);
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    }catch(erro){
      next(erro);
    }
  };
       
  static cadastrarLivro = async (req,res,next) =>{
    try{
      let livro = new livros(req.body);

      const livroResultado = await livro.save();

      res.status(201).send(livroResultado.toJSON());
    }catch(erro){
      next(erro);
    }
  };
  static atualizarLivro =async  (req,res,next) =>{
    try{
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndUpdate(id,{$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro atualizado com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    }catch(erro){
      next(erro);
    }

  };

  static excluirLivro = async (req,res,next) =>{
    try{
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id, {$set: req.body});

      if (livroResultado !== null) {
        res.status(200).send({message: "Livro removido com sucesso"});
      } else {
        next(new NaoEncontrado("Id do livro não localizado."));
      }
    }catch(erro){
      next(erro);
    }
  };

  static listarLivroPorFiltro = async (req,res,next) =>{
    try{
      const busca = await processaBusca(req.query);

      if (busca !== null){
        const livrosResultado =  livros
          .find(busca)
          .populate("Autor");
        
        req.resultado = livrosResultado;

        next();
      }else{
        res.status(200).send([]);
      }
      
      
    }catch(erro){
      next(erro);
    }
  };
}

async function processaBusca(parametros){
  const {Editora,Titulo, minPaginas,maxPaginas,nomeAutor } = parametros;
      
  //const regex = new RegExp(Titulo,"i");

  let busca = {};

  if (Editora) busca.Editora = Editora;
  //if (Titulo) busca.Titulo = regex;
  if (Titulo) busca.Titulo = {$regex: Titulo, $options: "i"};

  if (minPaginas || maxPaginas) busca.NumeroPaginas = {}; 



  //gte = Greater than or Equal = Maior ou igual Que
  if (minPaginas) busca.NumeroPaginas.$gte = minPaginas;
  //lte = Less Than or Equal = Menor ou igual Que
  if (maxPaginas) busca.NumeroPaginas.$lte = maxPaginas;

  if (nomeAutor){
    const autor = await autores.findOne({nome:nomeAutor});

    if (autor !== null){
      busca.autor = autor._id;
    }else{
      busca = null;
    }

    
  }

  return busca;
}

export default LivroController;