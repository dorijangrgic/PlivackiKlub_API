const Role = (sequelize, Sequelize) => {
  return sequelize.define("role", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};

export default Role;
