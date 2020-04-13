import bcrpyt from "bcrypt";

const User = (sequelize, Sequelize, role, group) => {
  const userModel = sequelize.define(
    "user",
    {
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
            msg: "Email is not correct"
          }
        }
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      date_of_birth: {
        type: Sequelize.DATE,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isGreaterThanEight(value) {
            if (length(value) < 8) {
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
    },
    {
      instanceMethods: {
        generateHash: password =>
          bcrpyt.hashSync(password, bcrpyt.genSaltSync(8), null),
        validPassword: password => bcrpyt.compareSync(password, this.password)
      }
    }
  );
  userModel.belongsTo(role);
  userModel.belongsTo(group);
  return userModel;
};

export default User;
