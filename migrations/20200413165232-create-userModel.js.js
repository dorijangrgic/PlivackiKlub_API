"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable(
      "Users",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        first_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        last_name: {
          type: Sequelize.STRING,
          allowNull: false
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: {
              msg: "Email is not in correct format"
            }
          }
        },
        username: {
          type: Sequelize.STRING,
          allowNull: true,
          unique: true
        },
        date_of_birth: {
          type: Sequelize.DATE,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: true,
          validate: {
            isGreaterThanEight(value) {
              if (length(value) < 8) {
                throw new Error("Password must be greater than 8 characters");
              }
            }
          }
        },
        verified: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false
        },
        groupId: {
          type: Sequelize.INTEGER,
          references: {
            model: "SwimmingGroups",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          allowNull: false
        },
        roleId: {
          type: Sequelize.INTEGER,
          references: {
            model: "Roles",
            key: "id"
          },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users");
  }
};
