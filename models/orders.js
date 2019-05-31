module.exports = (sequelize, DataTypes) => {
  const orders = sequelize.define(
    "orders",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      due: {
        type: DataTypes.STRING,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      preferParcel: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      referenceUrl: {
        type: DataTypes.STRING,
        allowNull: true
      },
      buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
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

  orders.associate = function(models) {
    orders.belongsTo(models.users, {
      foreignKey: "buyer_id",
      targetKey: "_id"
    });
    orders.belongsTo(models.parcels, {
      foreignKey: "parcel_id",
      targetKey: "_id"
    });
    orders.hasMany(models.reviews, {
      foreignKey: "order_id",
      sourceKey: "_id"
    });
    orders.hasMany(models.notifications, {
      foreignKey: "order_id",
      sourceKey: "_id"
    });
    orders.hasMany(models.applies, {
      foreignKey: "order_id",
      sourceKey: "_id"
    });
    orders.hasMany(models.productimgs, {
      foreignKey: "order_id",
      sourceKey: "_id"
    });
  };

  return orders;
};
