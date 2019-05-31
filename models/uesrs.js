module.exports = function(sequelize, DataTypes) {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER(11),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      socialID: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      password: {
        type: DataTypes.STRING(45),
        allowNull: true
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      provider: {
        type: DataTypes.STRING(45),
        allowNull: false
      },
      image: {
        type: DataTypes.STRING(45),
        allowNull: true
      }
    },
    {
      timestamps: true
    }
  );

  //   users.associate = function(models) {
  //     users.hasMany(models.orders);
  //   };

  return users;
};
