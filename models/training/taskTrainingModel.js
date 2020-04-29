const TaskTraining = (sequelize, Sequelize) => {
  return sequelize.define("taskTrainings", {
    taskId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Tasks",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false
    },
    trainingId: {
      type: Sequelize.INTEGER,
      references: {
        model: "Trainings",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false
    }
  });
};

export default TaskTraining;
