import db from "../models";
const Notification = db.Notification;
const User = db.User;

const create = (req, res) => {
  req.body["authorId"] = req.user.id;

  Notification.create(req.body)
    .then(data => res.send(data))
    .catch(err =>
      res.status(500).send({
        message: err.message
      })
    );
};

const findAll = (req, res) => {
  const filterAndPagination = req.filterAndPagination;
  filterAndPagination["include"] = [User];

  Notification.findAll(filterAndPagination)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

const findOne = (req, res) => {
  const id = req.params.id;

  Notification.findByPk(id, {include: [User]})
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Notification with id=${id} could not be found`
        });
      } else {
        res.send(data);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });
};

const update = async (req, res) => {
  const id = req.params.id;
  const notif = await Notification.findByPk(id);

  if (!notif) {
    return res.status(404).send({ message: "Notification does not exist" });
  }

  notif
    .update(req.body)
    .then(data =>
      res.status(200).send({ message: "Notification successfully updated" })
    )
    .catch(err => res.status(500).send({ message: err.message }));
};

const deleteNotification = async (req, res) => {
  const id = req.params.id;
  const notif = await Notification.findByPk(id);

  if (!notif) {
    return res.status(404).send({ message: "Notification does not exist" });
  }

  notif
    .destroy()
    .then(data =>
      res.status(200).send({ message: "Notification successfully deleted" })
    )
    .catch(err => res.status(500).send({ message: err.message }));
};

export { create, findAll, findOne, update, deleteNotification };
