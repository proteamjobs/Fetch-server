module.exports = (sequelize, DataTypes) => {
  const reviews = sequelize.define(
    "reviews",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      buyer_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      fetcher_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      star: {
        type: DataTypes.STRING,
        allowNull: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );

  reviews.associate = function(models) {
    reviews.belongsTo(models.users, {
      foreignKey: "buyer_id",
      targetKey: "_id"
    });
    reviews.belongsTo(models.users, {
      foreignKey: "fetcher_id",
      targetKey: "_id"
    });
    reviews.belongsTo(models.orders, {
      foreignKey: "order_id",
      targetKey: "_id"
    });
  };

  return reviews;
};
