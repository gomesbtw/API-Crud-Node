import mongoose from "mongoose"

mongoose.connect("mongodb+srv://luan:123@cluster0.ufkuy08.mongodb.net/alura-node");

let db = mongoose.connection;

export default db