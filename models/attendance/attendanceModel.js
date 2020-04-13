const Attendance = (sequelize, Sequelize, user, training) => {
  const attendanceModel = sequelize.define("attendance", {
    finished: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
  attendanceModel.belongsTo(user);
  attendanceModel.belongsTo(training);
  return attendanceModel;
};

export default Attendance;
