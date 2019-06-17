module.exports = (sequelize, DataTypes) => {
  const firebase = sequelize.define(
    "firebase",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );

  firebase.associate = function(models) {
    firebase.belongsTo(models.users, {
      foreignKey: "user_id",
      targetKey: "_id",
      onDelete: "cascade"
    });
  };

  return firebase;
};
