import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    Titulo:{type: String, 
      required : [true, "O titulo do livro é obrigatório"]},
    Autor:{type:mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O(a) autor(a) é obrigatório"]},
    Editora:{type:String, required: [true, "A editora é obrigatório"]},
    NumeroPaginas:{type:Number}
  });

const livros = mongoose.model("Livros", livroSchema);

export default livros;