const Task = (sequelize, Sequelize) => {
  return sequelize.define("task", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    intensity: {
      type: Sequelize.ENUM,
      values: ['1', '2', '3', '4', '5'],
      allowNull: false
    },
    duration: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    note: {
      type: Sequelize.TEXT("tiny"),
      allowNull: true
    }
  });
};

export default Task;
