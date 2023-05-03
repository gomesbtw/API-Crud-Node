import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req,res,next) =>{
    try{
      const livrosResultados = await livros.find()
        .populate("autor")
        .exec();
      res.status(200).json(livrosResultados);
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
      res.status(200).send(livroResultados);
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

      res.status(200).send({message:"O livro foi atualizado com sucesso"});
    }catch(erro){
      next(erro);
    }

  };

  static excluirLivro = async (req,res,next) =>{
    try{
      const id = req.params.id;

      const livroResultado = await livros.findByIdAndDelete(id, {$set: req.body});

      res.status(200).send({message: "Livro atualizado com sucesso"});
    }catch(erro){
      next(erro);
    }
  };

  static listarLivroPorEditora = async (req,res,next) =>{
    try{
      const editora = req.query.editora;

      const livrosResultado = await livros.find({"Editora": editora});
      res.status(200).send(livrosResultado);
    }catch(erro){
      next(erro);
    }
  };
}

export default LivroController;