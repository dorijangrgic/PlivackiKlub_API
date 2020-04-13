const Training = (sequelize, Sequelize, group, task) => {
  const trainingModel = sequelize.define("training", {
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
  trainingModel.belongsTo(group);
  trainingModel.belongsToMany(task, { through: "trainings_tasks" });
  return trainingModel;
};

export default Training;
