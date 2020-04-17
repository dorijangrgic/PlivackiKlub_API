const Role = (sequelize, Sequelize) => {
  return sequelize.define("roles", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};

export default Role;
