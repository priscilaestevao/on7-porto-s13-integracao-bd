const tarefas = require("../models/tarefas");

const getAll = (req, res) => {
  console.log(req.url);
  tarefas.find((err, tarefas) => {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(tarefas);
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  tarefas.find({ id }, (err, tarefas) => {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send(tarefas);
  });
};

const postTarefa = (req, res) => {
  console.log(req.body);

  let tarefa = new tarefas(req.body);

  tarefa.save((err) => {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(201).send(tarefa.toJSON());
  });
};

const deleteTarefa = (req, res) => {
  const id = req.params.id;
  tarefas.find({ id }, (err, tarefa) => {
    if (tarefa.length > 0) {
      tarefas.deleteMany({ id }, (err) => {
        if (err) {
          res.status(500).send({
            message: err.message,
            status: "FAIL",
          });
        }
        res.status(200).send({
          message: "Tarefa removida com sucesso",
          status: "SUCCESS",
        });
      });
    } else {
      res.status(200).send({
        message: "Não há tarefa para ser removida",
        status: "EMPTY",
      });
    }
  });
};

const deleteTarefaConcluida = (req, res) => {
  tarefas.find({ concluido: true }, (err, tarefa) => {
    if (tarefa.length > 0) {
      tarefas.deleteMany({ concluido: true }, (err) => {
        if (err) {
          res.status(500).send({
            message: err.message,
            status: "FAIL",
          });
        }
        res.status(200).send({
          message: "Tarefa removida com sucesso",
          status: "SUCCESS",
        });
      });
    } else {
      res.status(200).send({
        message: "Não há tarefa para ser removida",
        status: "EMPTY",
      });
    }
  });
};

const putTarefa = (req, res) => {
  const id = req.params.id;
  tarefas.update({ id }, { $set: req.body }, (err) => {
    if (err) {
      res.status(500).send({ message: err.message });
    }
    res.status(200).send({ message: "Registro alterado com sucesso!" })
  })
};

module.exports = {
  getAll,
  getById,
  postTarefa,
  deleteTarefa,
  deleteTarefaConcluida,
  putTarefa,
};
