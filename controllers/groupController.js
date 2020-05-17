import db from "../models/index";
const Group = db.Group;
const User = db.User;
const Training = db.Training;

const create = (req, res) => {
  Group.create(req.body)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

const findAll = (req, res) => {
  // moguca paginacija + filtiranje
  Group.findAll(req.filterAndPagination)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

const findOne = (req, res) => {
  const id = req.params.id;

  Group.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Swimming group not found`
        });
      } else {
        res.status(200).send(data);
      }
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

const findUsers = async (req, res) => {
  const id = req.params.id;
  console.log("Group id", id);

  const group = await Group.findByPk(id);

  if (!group) {
    return res.status(404).send({ message: "Swimming group not found!" });
  }

  User.findAll({
    where: {
      groupId: id,
      roleId: 3
    }
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

const findTrainings = async (req, res) => {
  const id = req.params.id;
  console.log("Group id", id);

  const group = await Group.findByPk(id);

  if (!group) {
    return res.status(404).send({ message: "Swimming group not found!" });
  }

  Training.findAll({
    where: {
      groupId: id,
    }
  })
    .then(data => res.send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};


const update = async (req, res) => {
  const id = req.params.id;
  const group = await Group.findByPk(id);

  if (!group) {
    return res.status(404).send({ message: "Swimming group not found!" });
  }

  group
    .update(req.body)
    .then(data =>
      res.status(200).send({ message: "Swimming group successfully updated" })
    )
    .catch(err => res.status(500).send({ message: err.message }));
};

const deleteGroup = async (req, res) => {
  const id = req.params.id;
  const group = await Group.findByPk(id);

  if (!group) {
    return res.status(404).send({ message: "Swimming group not found!" });
  }

  group
    .destroy()
    .then(data =>
      res.status(200).send({ message: "Swimming group successfully deleted" })
    )
    .catch(err => res.status(500).send({ message: err.message }));
};

export { create, findOne, findAll, findUsers,findTrainings, update, deleteGroup };
