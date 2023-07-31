import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    Titulo:{type: String, 
      required : [true, "O titulo do livro é obrigatório"]},
    Autor:{type:mongoose.Schema.Types.ObjectId, ref: "autores", required: [true, "O(a) autor(a) é obrigatório"]},
    Editora:{type:String, required: [true, "A editora é obrigatório"],
      enum:{
        values:["Casa do código","Alura"],
        message:"A editora fornecida {VALUE} não é um valor permitido."}
    },
    NumeroPaginas:{
      type:Number,
      validate: {
        validator: (valor) =>{
          return valor >= 10 && valor <= 5000;
        },
        message:"O número de paginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"
      }
    }

  });

const livros = mongoose.model("livros", livroSchema);

export default livros;