import { dbConfig } from "../config/dbConfig";
import Sequelize from "sequelize";
import Role from "./role/userRoleModel";
import Club from "./club/clubModel";
import Task from "./task/taskModel";
import User from "./user/userModel";
import Notification from "./notification/notificationModel";
import Group from "./group/groupModel";
import Training from "./training/trainingModel";
import Attendance from "./attendance/attendanceModel";
import TaskTraining from "./training/taskTrainingModel";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: console.log,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/* 
This is where we define our models
*/

db.Role = Role(sequelize, Sequelize);
db.Task = Task(sequelize, Sequelize);
db.Club = Club(sequelize, Sequelize);

db.Group = Group(sequelize, Sequelize, db.Club);
db.User = User(sequelize, Sequelize, db.Role, db.Group);
db.Notification = Notification(sequelize, Sequelize, db.User);
db.Training = Training(sequelize, Sequelize, db.Group, db.Task);
db.Attendance = Attendance(sequelize, Sequelize, db.User, db.Training);
db.TaskTraining = TaskTraining(sequelize, Sequelize);

export default db;
