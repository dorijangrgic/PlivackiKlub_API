const Notification = (sequelize, Sequelize, author) => {
  const notifModel = sequelize.define("notifications", {
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false
    }
  });
  notifModel.belongsTo(author);
};

export default Notification;
