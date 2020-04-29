import db from "../models";
const Attendance = db.Attendance;
const User = db.User;
const Training = db.Training;

const create = (req, res) => {
  const trainingId = req.body.trainingId;
  const userIds = req.body.userIds;

  userIds.forEach(async element => {
    await Attendance.create({
      trainingId: trainingId,
      userId: element.id,
      finished: element.finished
    });
  });
  res.status(200).send({ message: "Attendances created successfully" });
};

const findAll = (req, res) => {
  const filterAndPagination = req.filterAndPagination;
  filterAndPagination["include"] = [User, Training];

  Attendance.findAll(filterAndPagination)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(500).send({ message: err.message }));
};

const findOne = (req, res) => {
  const id = req.params.id;

  Attendance.findByPk(id, { include: [User, Training] })
    .then(data => {
      if (!data) {
        res.status(404).send({ message: "Attendance does not exist" });
      } else res.status(200).send(data);
    })
    .catch(err => res.status(500).send({ message: err.message }));
};

const update = async (req, res) => {
  const id = req.params.id;
  const attendance = await Attendance.findByPk(id);

  if (!attendance) {
    return res.status(404).send({ message: "Attendance does not exist" });
  }

  attendance
    .update(req.body)
    .then(data =>
      res.status(200).send({ message: "Attendance updated successfully" })
    )
    .catch(err => res.status(500).send({ message: err.message }));
};

const deleteAttendance = async (req, res) => {
  const id = req.params.id;
  const attendance = await Attendance.findByPk(id);

  if (!attendance) {
    return res.status(404).send({ message: "Attendance does not exist" });
  }

  attendance
    .destroy()
    .then(data =>
      res.status(200).send({ message: "Attendance deleted successfully" })
    )
    .catch(err => res.status(500).send({ message: err.message }));
};

export { create, findAll, findOne, update, deleteAttendance };
