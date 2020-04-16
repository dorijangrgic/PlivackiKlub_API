const User = (sequelize, Sequelize, role, group) => {
  const userModel = sequelize.define("users", {
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
          if (value === null) return;
          if (value.length < 8) {
            throw new Error("Password must be greater than 8 chars");
          }
        }
      }
    },
    verified: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  userModel.belongsTo(role, {
    foreignKey: {
      name: "roleId"
    }
  });
  userModel.belongsTo(group, {
    foreignKey: {
      name: "groupId",
      allowNull: true
    }
  });
  return userModel;
};

export default User;
