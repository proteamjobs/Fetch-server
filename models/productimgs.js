module.exports = (sequelize, DataTypes) => {
  const productimgs = sequelize.define(
    "productimgs",
    {
      _id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      order_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      timestamps: true
    }
  );

  productimgs.associate = function(models) {
    productimgs.belongsTo(models.orders, {
      foreignKey: "order_id",
      targetKey: "_id"
    });
  };

  return productimgs;
};
