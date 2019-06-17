module.exports = (sequelize, DataTypes) => {
  const applies = sequelize.define(
    "applies",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      traveler_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isPicked: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      }
    },
    {
      timestamps: true
    }
  );

  applies.associate = function(models) {
    applies.belongsTo(models.users, {
      foreignKey: "traveler_id",
      targetKey: "_id",
      onDelete: "cascade"
    });
    applies.belongsTo(models.orders, {
      foreignKey: "order_id",
      targetKey: "_id"
    });
  };

  return applies;
};
