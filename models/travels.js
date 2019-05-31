module.exports = (sequelize, DataTypes) => {
  const travels = sequelize.define(
    "travels",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      departureDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      arrivalDate: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      traveler_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );

  travels.associate = function(models) {
    travels.belongsTo(models.users, {
      foreignKey: "traveler_id",
      targetKey: "_id"
    });
  };

  return travels;
};
