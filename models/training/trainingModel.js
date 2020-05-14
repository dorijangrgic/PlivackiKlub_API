const Training = (sequelize, Sequelize, group, task) => {
  const trainingModel = sequelize.define("trainings", {
    finished: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    note: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  });
  trainingModel.belongsTo(group, {
    as: "group",
    foreignKey: {
      name: "groupId",
      defaultValue: 0
    }
  });
  trainingModel.belongsToMany(task, { through: "taskTrainings" });
  return trainingModel;
};

export default Training;
