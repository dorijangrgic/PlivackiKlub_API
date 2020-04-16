const Group = (sequelize, Sequelize, club) => {
  const groupModel = sequelize.define("swimminggroups", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  groupModel.belongsTo(club);
  return groupModel;
};

export default Group;
