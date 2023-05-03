import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
    {
    id: {type: String},
    Titulo:{type: String, required : true},
    Autor:{type:mongoose.Schema.Types.ObjectId, ref: 'autores', required: true},
    Editora:{type:String, required: true},
    NumeroPaginas:{type:Number}
    });

const livros = mongoose.model('Livros', livroSchema);

export default livros;