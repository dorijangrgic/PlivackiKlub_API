"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Users", "groupId", {
      type: Sequelize.INTEGER,
      references: {
        model: "SwimmingGroups",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: true
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Users", "groupId", {
      type: Sequelize.INTEGER,
      references: {
        model: "SwimmingGroups",
        key: "id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      allowNull: false
    });
  }
};
