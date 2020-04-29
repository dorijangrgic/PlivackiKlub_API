import db from "../models";
import {
  getTaskIdsForTrainingId,
  getTasksById
} from "../models/training/trainingProvider";

const Training = db.Training;
const Group = db.Group;
const TaskTraining = db.TaskTraining;
const Task = db.Task;

const create = (req, res) => {
  const groupId = req.body.groupId;
  const taskIds = req.body.taskIds;
  const training = {};

  training["groupId"] = groupId;
  if (req.body.finished) training["finished"] = req.body.finished;
  if (req.body.note) training["note"] = req.body.note;

  Training.create(training)
    .then(data => {
      // training is created, add tasks
      taskIds.forEach(async element => {
        await TaskTraining.create({ trainingId: data.id, taskId: element });
      });
      res.status(200).send({ message: "Training created successfully" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

const findAll = (req, res) => {
  req.filterAndPagination["include"] = [Group, Task];

  Training.findAll(req.filterAndPagination)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

const findOne = (req, res) => {
  const id = req.params.id;

  Training.findByPk(id, { include: [Task, Group] })
    .then(data => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Training with id ${id} does not exist` });
      } else {
        res.status(200).send(data);
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

const update = async (req, res) => {
  const groupId = req.body.groupId;
  const taskIds = req.body.taskIds;
  const trainingBody = {};

  trainingBody["groupId"] = groupId;
  if (req.body.finished) trainingBody["finished"] = req.body.finished;
  if (req.body.note) trainingBody["note"] = req.body.note;

  const id = req.params.id;
  const training = await Training.findByPk(id);

  if (!training) {
    res.status(404).send({ message: `Training with id ${id} does not exist` });
    return;
  }

  await TaskTraining.destroy({ where: { trainingId: id } });

  training
    .update(trainingBody)
    .then(data => {
      taskIds.forEach(async element => {
        await TaskTraining.create({ trainingId: data.id, taskId: element });
      });
      res.status(200).send({ message: "Training updated successfully" });
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

const deleteTraining = async (req, res) => {
  const id = req.params.id;
  const training = await Training.findByPk(id);

  if (!training) {
    res.status(404).send({ message: `Training with id ${id} does not exist` });
    return;
  }

  training
    .destroy()
    .then(data =>
      res.status(200).send({ message: "Training deleted successfully" })
    )
    .catch(err => res.status(500).send({ message: err.message }));
};

export { create, findAll, findOne, update, deleteTraining };
