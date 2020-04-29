import db from "../models";
const Club = db.Club;

const create = (req, res) => {
  Club.create(req.body)
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: err.message
      })
    );
};

const findAll = (req, res) => {
  Club.findAll(req.filterAndPagination)
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: err.message
      })
    );
};

const findOne = (req, res) => {
  const id = req.params.id;

  Club.findByPk(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Notification with id=${id} could not be found`
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

  const club = await Club.findByPk(id);
  if(!club){
    res.status(404).send({message: "Club does not exist"});
    return;
  }

  club
    .update(req.body)
    .then(data => 
      res.status(200).send({message: "Club updated successfully"}))
    .catch(err => res.status(500).send({message: err.message}))
};

const deleteClub = async (req, res) => {
  const id = req.params.id;

  const club = await Club.findByPk(id);
  if(!club){
    res.status(404).send({message: "Club does not exist"});
    return;
  }

  club
    .destroy()
    .then(data => 
      res.status(200).send({message: "Club deleted successfully"}))
    .catch(err => res.status(500).send({message: err.message}))
};

export { create, findAll, findOne, update, deleteClub };
