module.exports = (sequelize, DataTypes) => {
  const parcels = sequelize.define(
    "parcels",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      t_code: {
        type: DataTypes.STRING,
        allowNull: false
      },
      t_invoice: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fetcher_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );

  parcels.associate = function(models) {
    parcels.belongsTo(models.users, {
      foreignKey: "fetcher_id",
      targetKey: "_id"
    });
    parcels.belongsTo(models.users, {
      foreignKey: "buyer_id",
      targetKey: "_id"
    });
    parcels.hasOne(models.orders, {
      foreignKey: "parcel_id",
      sourceKey: "_id"
    });
    parcels.hasMany(models.notifications, {
      foreignKey: "parcel_id",
      sourceKey: "_id"
    });
  };

  return parcels;
};
