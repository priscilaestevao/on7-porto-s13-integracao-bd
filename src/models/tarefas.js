const mongoose = require("mongoose");

const tarefaSchema = new mongoose.Schema(
  {
    id: { type: Number },
    descricao: { type: String },
    dataInclusao: { type: String },
    concluido: { type: Boolean },
    nomeColaboradora: { type: String },
  },
  {
    versionKey: false,
  }
);

const tarefas = mongoose.model("tarefas", tarefaSchema);

module.exports = tarefas;