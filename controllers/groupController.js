import db from "../models/index";
const Group = db.Group;

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

const update = async (req, res) => {
  const id = req.params.id;
  const group = await Group.findByPk(id);

  if (!group){
    res.status(404).send({ message: "Swimming group not found!" });
    return;
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

  if (!group){
    res.status(404).send({ message: "Swimming group not found!" });
    return;
  }

  group
    .destroy()
    .then(data =>
      res.status(200).send({ message: "Swimming group successfully deleted" })
    )
    .catch(err => res.status(500).send({ message: err.message }));
};

export { create, findOne, findAll, update, deleteGroup };
