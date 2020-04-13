const Club = (sequelize, Sequelize) => {
  return sequelize.define("club", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false
    },
    postCode: {
      type: Sequelize.STRING,
      allowNull: false
    },
    oib: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};

export default Club;
