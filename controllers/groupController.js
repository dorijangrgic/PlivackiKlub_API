import db from "../models/index";
const Group = db.Group;

const create = (req, res) => {
  const group = {
    name: req.body.name
  };

  Group.create(group)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Something went wrong when creating new swimming group"
      });
    });
};

const findAll = (req, res) => {
  console.log("Trazim sve grupe");
  // moguca paginacija + filtiranje
  Group.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occured while retrieving swimming groups"
      });
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

  Group.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Swimming group with id=${id} could not be found`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving swimming group with id=" + id
      });
    });
};

const update = (req, res) => {
  const id = req.params.id;

  Group.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Swimming group successfully updated"
        });
      } else {
        res.send({
          message: `Cannot update swimming group with id=${id}. Maybe swimming group was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating swimming group with id=" + id
      });
    });
};

const deleteGroup = (req, res) => {
  const id = req.params.id;

  Group.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: `Swimming group with id=${id} is successfully deleted`
        });
      } else {
        res.send({
          message: `Swimming group with id=${id} cannot be deleted`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete swimming group with id=${id}`
      });
    });
};

export { create, findOne, findAll, update, deleteGroup };
