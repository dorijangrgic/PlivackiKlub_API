import db from "../models";
const Task = db.Task;

const create = (req, res) => {
  Task.create(req.body)
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: err.message
      })
    );
};

const findAll = (req, res) => {
  Task.findAll(req.filterAndPagination)
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: err.message
      })
    );
};

const findOne = (req, res) => {
  const id = req.params.id;

  Task.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Task with id=${id} could not be found`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err =>
      res.status(500).send({
        message: err.message
      })
    );
};

const update = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByPk(id);

  if (!task) {
    return res.status(404).send({ message: "Task does not exist" });
  }

  task
    .update(req.body)
    .then(data =>
      res.status(200).send({ message: "Task updated successfully" })
    )
    .catch(err => res.status(500).send({ message: err.message }));
};

const deleteTask = async (req, res) => {
  const id = req.params.id;
  const task = await Task.findByPk(id);

  if (!task) {
    return res.status(404).send({ message: "Task does not exist" });
  }

  task
    .destroy()
    .then(data =>
      res.status(200).send({ message: "Task deleted successfully" })
    )
    .catch(err => res.status(500).send({ message: err.message }));
};

export { create, findAll, findOne, update, deleteTask };
