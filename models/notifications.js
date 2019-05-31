module.exports = (sequelize, DataTypes) => {
  const notifications = sequelize.define(
    "notifications",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      to_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      from_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      notice_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      parcel_id: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      timestamps: true
    }
  );

  notifications.associate = function(models) {
    notifications.belongsTo(models.users, {
      foreignKey: "to_id",
      targetKey: "_id"
    });
    notifications.belongsTo(models.users, {
      foreignKey: "from_id",
      targetKey: "_id"
    });
    notifications.belongsTo(models.orders, {
      foreignKey: "order_id",
      targetKey: "_id"
    });
    notifications.belongsTo(models.notices, {
      foreignKey: "notice_id",
      targetKey: "_id"
    });
    notifications.belongsTo(models.parcels, {
      foreignKey: "parcel_id",
      targetKey: "_id"
    });
  };

  return notifications;
};
