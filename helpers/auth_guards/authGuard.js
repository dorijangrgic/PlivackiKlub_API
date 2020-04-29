import db from "../../models/";
const Notification = db.Notification;

const checkAdminRole = (req, res, next) => {
  if (req.user.roleId === 1) next();
  else return res.sendStatus(403);
};

const checkCoachRole = (req, res, next) => {
  if (req.user.roleId === 2) next();
  else return res.sendStatus(403);
};

const checkSwimmerRole = (req, res, next) => {
  if (req.user.roleId === 3) next();
  else return res.sendStatus(403);
};

const checkCoachAndNotifAuthor = async (req, res, next) => {
  const notifId = req.params.id;
  const userRoleId = req.user.roleId;
  const userId = req.user.id;

  const notif = await Notification.findByPk(notifId);
  if (!notif) return res.status(404).send({ message: "Notification does not exist" });

  if (userRoleId === 2 && notif.authorId === userId) next();
  else return res.sendStatus(403);
};

export {
  checkAdminRole,
  checkCoachRole,
  checkSwimmerRole,
  checkCoachAndNotifAuthor
};
